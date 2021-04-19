import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select, message, Spin } from 'antd';
import CustomCronModal from '@/components/compos/CronModal/CustomCronModal';
import { tableDataformat } from '../SqlKedro/actions/KedroData';
import { useQuery, useModal } from '~~hooks/';
import { DataFlowApi } from '~~apis/';
import { INPUT_RULES, FLOW_NAME_RULES } from '~~constants/index';
import './ExploreDataFlow.less';
import SqlKedro from '../SqlKedro/SqlKedro';

const { Option } = Select;

const ExploreDataFlow = ({
  selectGroupObject,
  selectedColumns,
  setSelectedColumns,
  selectedGroup,
  groupList,
}) => {
  const [form] = Form.useForm();
  const [getDiagram, setDiagram] = useState([]);
  const [getSeqId, setSeqId] = useState('');
  const [saveOrRunLoading, setSaveOrRunLoading] = useState(false);
  const [dataFlowChangedGroupId, setDataFlowGroupId] = useState(
    selectGroupObject.groupId,
  );
  const cronPopupModal = useModal();
  const [cronLoading, setCronLoading] = useState(false);
  const [cronValue, setCronValue] = useState(''); // for UI to Cron
  const [getUIValue, setGetUIValue] = useState(''); // for Cron to UI
  const [resetShowData, setResetShowData] = useState(false);
  const [changeGroupStatus, setChangeGroup] = useState(false);
  const saveDataFlow = useQuery(DataFlowApi.saveDataFlow);

  useEffect(() => {
    if (selectedGroup !== selectGroupObject.groupId) {
      setDataFlowGroupId(
        groupList &&
          groupList.filter(group => {
            return group.groupId === selectedGroup;
          })[0].groupId,
      );
    }
  }, []);

  const recordSelectedGroupId = value => {
    setDataFlowGroupId(value);
    setChangeGroup(true);
    setSelectedColumns([]);
  };

  const OpenCornModel = () => {
    cronPopupModal.openModal();
  };

  const checkSchedule = () => {
    // 判斷是否有publish,如果有publish就跳出更新時段的彈跳視窗
    if (getDiagram.nodes.length !== 0) {
      const check = getDiagram.nodes.filter(
        e => e.args.publish !== undefined && e.args.publish,
      );
      if (check.length !== 0) {
        return true;
      }
      return false;
    }
    return false;
  };

  const checkBeforeSave = data => {
    const transformList =
      data.diagram.nodes.length !== 0
        ? data.diagram.nodes.filter(item => {
            return item.type === 'Transform';
          })
        : [];

    const saveStatus = transformList.map(item => {
      if (item.args.classification === 'SelectFields') {
        return (
          item.args.fields === undefined ||
          (item.args.fields !== undefined && item.args.fields.length === 0)
        );
      }
      if (item.args.classification === 'Customize') {
        return (
          item.args.sql === undefined ||
          (item.args.sql !== undefined && item.args.sql === '')
        );
      }
      if (item.args.classification === 'Join') {
        return true;
      }
      return '';
    });

    return saveStatus.includes(true);
  };

  const handleSaveApi = async cronjobValue => {
    let data = {
      projectName: form.getFieldValue().projectName,
      groupId: dataFlowChangedGroupId,
      diagram: getDiagram,
      schedule: cronjobValue,
    };

    if (getSeqId) {
      data = {
        ...data,
        seqId: getSeqId,
      };
    }

    setSaveOrRunLoading(true);
    try {
      if (!checkBeforeSave(data)) {
        const seqId = await saveDataFlow.exec(data); // save之後拿到 seqId 之後才能執行run按鈕

        if (seqId) {
          setSeqId(seqId);
          message.success('This Dataflow save successfully');
        }
      } else {
        message.error('You need to set transform condition!');
      }
      cronPopupModal.closeModal();
    } catch (e) {
      message.error(e.message);
    } finally {
      setCronLoading(false);
      setSaveOrRunLoading(false);
    }
  };

  const handleSave = () => {
    if (checkSchedule() === true) {
      OpenCornModel();
    } else {
      handleSaveApi('');
    }
  };

  const handleFinish = () => {
    if (cronValue === '' || cronValue === undefined) {
      message.error('Check your select !');
    } else {
      setCronLoading(true);
      handleSaveApi(cronValue);
    }
  };

  const handleRunMethod = async () => {
    setSaveOrRunLoading(true);
    try {
      const response = await DataFlowApi.runDataFlow(getSeqId);
      if (response) {
        message.success('This Dataflow run successfully!');
      }
    } catch (e) {
      message.error(e.message);
    } finally {
      setSaveOrRunLoading(false);
    }
  };

  const handleValidate = () => {
    form
      .validateFields()
      .then()
      .catch(info => {
        if (info.values.projectName !== undefined) {
          form.setFieldsValue({ projectName: '' });
        }
      });
  };

  return (
    <>
      <Spin spinning={saveOrRunLoading}>
        <div className="dataflow-exploreContainer">
          <div className="dataflowListContainer">
            <div className="title">Data Flow</div>
            <hr style={{ margin: 0 }} />
            <div className="subTitle">Information</div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Form
                form={form}
                className="explore-information"
                initialValues={{
                  groupName: selectGroupObject && selectGroupObject.groupName,
                }}
                onFinish={handleSave}
              >
                <Form.Item
                  label="Project Name"
                  name="projectName"
                  rules={[
                    { required: true, message: 'Please input project name!' },
                    {
                      pattern: FLOW_NAME_RULES.pattern,
                      message:
                        'Only letters(A-Z,a-z), numbers(0-9) and underline(_,-)',
                    },
                  ]}
                >
                  <Input
                    className="folderName"
                    placeholder="Project Name"
                    maxLength={INPUT_RULES.PROJECT_NAME.value}
                    onBlur={() => handleValidate()}
                  />
                </Form.Item>

                <Form.Item
                  label="Group Name"
                  name="groupName"
                  style={{ marginLeft: '10px' }}
                >
                  <Select
                    onChange={recordSelectedGroupId}
                    disabled={getSeqId !== ''}
                  >
                    {groupList &&
                      groupList.map(item => (
                        <Option key={item.groupId} value={item.groupId}>
                          {item.groupName}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Form>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: '20px' }}
                  disabled={getSeqId === ''}
                  onClick={handleRunMethod} // form.submit
                >
                  Run
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={form.submit} // form.submit
                >
                  Save
                </Button>
              </Form.Item>
            </div>
          </div>
          <div className="dataflowContainer">
            <SqlKedro
              oEntity={tableDataformat(selectedColumns)}
              dataFlowChangedGroupId={dataFlowChangedGroupId}
              edit
              setDiagram={setDiagram}
              sqlID={getSeqId}
              setResetShowData={setResetShowData}
              resetShowData={resetShowData}
              changeGroupStatus={changeGroupStatus}
              setChangeGroup={setChangeGroup}
              historyMode={false}
            />
          </div>
        </div>
      </Spin>
      {/* cronjob轉碼用的彈跳視窗 */}
      <CustomCronModal
        modal={cronPopupModal}
        setCronValue={setCronValue}
        getUIValue={getUIValue}
        setGetUIValue={setGetUIValue}
        handleOK={handleFinish}
        loading={cronLoading}
      />
    </>
  );
};

ExploreDataFlow.propTypes = {
  selectedColumns: PropTypes.arrayOf(PropTypes.shape({})),
  setSelectedColumns: PropTypes.func,
};

ExploreDataFlow.defaultProps = {
  selectedColumns: [],
  setSelectedColumns: () => null,
};

export default ExploreDataFlow;
