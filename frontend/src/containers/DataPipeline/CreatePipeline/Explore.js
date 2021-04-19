import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Form, message } from 'antd';
import { useQuery, useModal } from '@/hooks/';
import { ETLApi } from '@/apis/';
import { PROJECT_NAME_RULES, INPUT_RULES } from '@/constants/index';
import { AppContext } from "@/store/appStore";
import { isObject } from "@/utils/common";
import './MainStyle.less';
import './ExploreStyle.less';
import CustomCronModal from '@/components/compos/CronModal/CustomCronModal';
import SqlDiagram from '@/components/SqlDiagram/SqlDiagram';

const Explore = ({
  back,
  selectedColumns,
  setSelectedColumns,
  selectGroupObject,
}) => {

  const appStore = useContext(AppContext);
  const [cronLoading, setCronLoading] = useState(false);
  const [cronValue, setCronValue] = useState(''); // for UI to Cron
  const [getUIValue, setGetUIValue] = useState(''); // for Cron to UI
  const [model, setModel] = useState();

  const [form] = Form.useForm();
  const cronPopupModal = useModal();
  const saveETL = useQuery(ETLApi.saveETL);
  const getAllSqlQuery = useQuery(ETLApi.getAllSql);

  const clearAllData = () => {
    setSelectedColumns([]);
    form.resetFields();
    cronPopupModal.closeModal();
  };

  const checkSql = async serialize => {
    let error = [];
    try {
      const result = await getAllSqlQuery.exec(serialize);
      error = model
        .getNodes()
        .filter(
          node =>
            node.getOptions().type === 'OutputSettingNode' &&
            result[node.getID()] !== 'SELECT ' &&
            result[node.getID()] !== node.getModalData().sql,
        );
      error.forEach(node => {
        node.cleanNode();
        node.error(['Sql not equal to preview data']);
      });
    } catch (e) {
      console.log(e);
    }
    return error;
  };

  const handleOK = async () => {
    if (cronValue === '' || cronValue === undefined) {
      message.error('Check your select !');
    } else {
      // send cron
      setCronLoading(true);
      const serialize = model.serialize();
      const req = {
        // groupid
        diagramMap: {
          ...serialize,
          domain: form.getFieldValue('folderName'),
          folderName: form.getFieldValue('folderName'),
          permission: form.getFieldValue('permission'),
          schedule: cronValue,
        },
        groupId: selectGroupObject.groupId,
      };
      try {
        await saveETL.exec(req);
        message.success('your request has been submitted successfully!');
        clearAllData();
        back();
      } catch (e) {
        // 後端驗證entity name重複
        if (isObject(e.message)) {
          const error = JSON.parse(e.message);
          if (error.errorData.result) {
            Object.keys(error.errorData.result).forEach(nodeId => {
              model.getNode(nodeId).error(['Entity Name is duplicated']);
            });
            cronPopupModal.closeModal();
          }
        } else {
          console.log(e.message);
        }
      } finally {
        setCronLoading(false);
      }
    }
  };

  const OpenCornModel = () => {
    cronPopupModal.openModal();
  };

  const onSubmit = async () => {
    const errorMessages = model.getNodes().filter(node => {
      if (node.validate) {
        return node.validate() !== undefined;
      }
      return false;
    });

    if (errorMessages.length) {
      return;
    }

    const serialize = model.serialize();
    const error = await checkSql(serialize);
    if (error.length) {
      return;
    }
    OpenCornModel();
  };

  return (
    <>
      <div className="exploreContainer">
        <div className="tableListContainer">
          <Form
            name="basic"
            initialValues={{
              permission: appStore.userInfo.email,
              groupName: selectGroupObject.groupName,
            }}
            layout="vertical"
            onFinish={onSubmit}
            form={form}
          >
            <div className="subTitle">Information</div>
            <Form.Item
              label="Project Name"
              name="folderName"
              rules={[
                { required: true, message: 'Please input project name!' },
                {
                  pattern: PROJECT_NAME_RULES.pattern,
                  message:
                    'Only accept letters(A-Za-z), numbers(0-9) and underline(-)',
                },
              ]}
            >
              <Input
                className="folderName"
                placeholder="Project Name"
                maxLength={INPUT_RULES.PROJECT_NAME.value}
              />
            </Form.Item>

            <Form.Item
              label="Permission"
              name="permission"
              style={{display: 'none'}}
              rules={[
                { required: true, message: "Please input users' emails!" },
              ]}
            >
              {/* permission長度不限 */}
              <Input
                className="permission"
                placeholder="Please input users' emails split by ','"
              />
            </Form.Item>

            <Form.Item label="Group Name" name="groupName">
              <Input disabled />
            </Form.Item>
          </Form>
          <div>
            <Button
              style={{ backgroundColor: '#20a7c9', borderColor: '#20a7c9', color: '#fff', width: 120 }}
              htmlType="submit"
              onClick={form.submit} 
            >
              Submit
            </Button>
          </div>
        </div>
        <div className="sqlContainer">
          <SqlDiagram
            oEntity={selectedColumns}
            getModel={setModel}
            groupId={selectGroupObject.groupId}
          />
        </div>
      </div>
      <CustomCronModal
        modal={cronPopupModal}
        setCronValue={setCronValue}
        getUIValue={getUIValue}
        setGetUIValue={setGetUIValue}
        handleOK={handleOK}
        loading={cronLoading}
      />
    </>
  );
};

Explore.propTypes = {
  selectedColumns: PropTypes.arrayOf(PropTypes.shape({})),
  setSelectedColumns: PropTypes.func,
};

Explore.defaultProps = {
  selectedColumns: [],
  setSelectedColumns: () => null,
};

export default Explore;
