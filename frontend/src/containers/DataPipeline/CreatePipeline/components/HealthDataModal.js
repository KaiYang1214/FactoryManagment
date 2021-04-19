/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useContext } from "react";
import moment from 'moment';
import PropTypes from "prop-types";
import { Modal, Button, Form, List, Tag, Tooltip, Spin } from "antd";
import { TableOutlined, EditOutlined } from "@ant-design/icons";
import { TableApi } from "@/apis/";
import { useModal } from "@/hooks/";
import { SYSTEM_TYPE, ROLE_TYPE, DATE_TYPE } from "@/constants/index";
import { AppContext } from "@/store/appStore";
import "./MainStyle.less";
import EditDescriptModal from "./EditDescriptModal";

const INIT_VALUE = {
  table: {
    name: undefined,
    comment: undefined,
    frequency: undefined,
    lastUpdateTime: undefined,
    tags: [],
    systemType: undefined,
    columns: [],
    categories: [],
  },
  ownerEnName: undefined,
  owner: undefined,
  consumeType: undefined,
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const HealthDataModal = ({ modal }) => {
  const [form] = Form.useForm();
  const [healthResult, setHealthResult] = useState({ ...INIT_VALUE });
  const [resultIsLoading, setResultIsLoading] = useState(false);
  const editDescriptModal = useModal();
  const appStore = useContext(AppContext);

  const handleBeforeLeave = () => {
    modal.closeModal();
    form.resetFields();
    setHealthResult({ ...INIT_VALUE });
  };

  const getHealthData = async (id) => {
    setResultIsLoading(true);
    try {
      const result = await TableApi.getHealthTable(id);
      setHealthResult(result);
    } catch (e) {
      console.log(e);
    } finally {
      setResultIsLoading(false);
    }
  };

  const showReference = (_project) => {
    return (
      <Form.Item
        label="reference by"
        className="reference-table"
        style={{
          display: "block",
          boderRadius: "4px",
          maxWidth: "97%",
        }}
      >
        {_project.length !== 0 && (
          <List
            size="large"
            bordered
            className="refrence-by-list-container"
            dataSource={_project}
            renderItem={(item) => (
              <List.Item key={item} style={{ padding: "20px!important" }}>
                <Tooltip title={item}>
                  <div>{item}</div>
                </Tooltip>
              </List.Item>
            )}
          />
        )}
      </Form.Item>
    );
  };

  const showEditButton = (data) => {
    if (
      appStore.userInfo.length !== 0 &&
      data.consumeType !== "" &&
      data.consumeType.substring(0, 2) !== "IT"
    ) {
      if (
        appStore.userInfo.roles.includes(ROLE_TYPE.MASTER) ||
        // 不分大小寫
        data.owner.toLowerCase() === appStore.userInfo.emplId.toLowerCase()
      ) {
        return (
          <Button
            style={{ float: "right" }}
            type="link"
            onClick={() => editDescriptModal.openModal()}
          >
            <EditOutlined />
            <span style={{ fontSize: "10px" }}>Edit Description</span>
          </Button>
        );
      }
      return null;
    }
    return null;
  };

  useEffect(() => {
    if (modal.visible && modal.modalData && modal.modalData.guid) {
      getHealthData(modal.modalData.guid);
    }
  }, [modal.visible, modal.modalData]);

  return (
    <div>
      <Modal
        width={900}
        bodyStyle={{
          maxHeight: "75vh",
          overflow: "auto",
        }} // 高度自動,超過螢幕的75％就scroll
        title={
          <div style={{ fontSize: "20px" }}>
            Data Healthy-{healthResult.table.name}
          </div>
        }
        visible={modal.visible}
        destroyOnClose
        onCancel={handleBeforeLeave}
        footer={
          <Button type="primary" onClick={handleBeforeLeave}>
            Ok
          </Button>
        }
      >
        <Spin spinning={resultIsLoading}>
          <Form
            {...formItemLayout}
            form={form}
            name="healthData"
            scrollToFirstError
            destroyOnClose
          >
            <div style={{ width: "100%", display: "flex" }}>
              <div
                style={{ width: "45%" }}
                className="healthy-left-form-container"
              >
                <Form.Item label="Table Name">
                  {healthResult.table.name}
                </Form.Item>

                <Form.Item label="Description">
                  {healthResult.table.comment}
                </Form.Item>

                <Form.Item label="Frequency">
                  {healthResult.frequency}
                </Form.Item>

                <Form.Item label="Update Time">
                  {healthResult.lastUpdateTime && moment(healthResult.lastUpdateTime).format(DATE_TYPE.DATE_TIME_WITH_SEC)}
                </Form.Item>

                <Form.Item label="Owners">
                  {healthResult.ownerEnName && (
                    <div
                      className="health-owner"
                      style={{ backgroundColor: "#20a7c9" }}
                    >
                      {healthResult.ownerEnName.substring(0, 1)}
                    </div>
                  )}
                  {healthResult.ownerEnName !== ""
                    ? `${healthResult.ownerEnName} (${healthResult.owner})`
                    : ""}
                </Form.Item>

                {healthResult.table.systemType ===
                  SYSTEM_TYPE.props.WisDOM.key ||
                healthResult.table.systemType === SYSTEM_TYPE.props.WDC.key
                  ? showReference(healthResult.referenceProject)
                  : null}
              </div>

              <div style={{ width: "55%" }}>
                <p style={{ fontSize: "18px" }}>
                  <TableOutlined style={{ color: "#20a7c994" }} />
                  Column Information
                  {healthResult.table.systemType ===
                    SYSTEM_TYPE.props.WisDOM.key ||
                  healthResult.table.systemType === SYSTEM_TYPE.props.WDC.key
                    ? showEditButton(healthResult)
                    : null}
                </p>
                <List
                  className="health-list-container"
                  grid={{ gutter: 4, column: 1 }}
                  size="large"
                  dataSource={healthResult.table.columns}
                  pagination={false}
                  renderItem={(item) => (
                    <List.Item key={item.guid}>
                      <div className="healthlistWrapper">
                        <div>
                          <b style={{ fontSize: "16px", color: "#8d8d8d" }}>
                            {item.name}
                          </b>
                          <p style={{ fontSize: "14px", color: "#8d8d8d" }}>
                            {item.comment}
                          </p>
                        </div>
                        <div style={{ fontSize: "14px", color: "#8d8d8d" }}>
                          {item.type}
                        </div>
                      </div>
                      <hr />
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </Form>
        </Spin>
      </Modal>
      <EditDescriptModal
        modal={editDescriptModal}
        sourceData={healthResult}
        refresh={getHealthData}
      />
    </div>
  );
};

HealthDataModal.propTypes = {
  modal: PropTypes.shape({
    visible: PropTypes.bool,
    closeModal: PropTypes.func,
    modalData: PropTypes.shape({
      name: PropTypes.string,
      children: PropTypes.arrayOf(PropTypes.object),
    }),
  }).isRequired,
};

HealthDataModal.defaultProps = {};

export default HealthDataModal;
