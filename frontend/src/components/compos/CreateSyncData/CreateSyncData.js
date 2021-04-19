/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form, Input, Select, Space, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { UserApi, FlowApi, MetadataApi } from "@/apis/";
import {
  DB_TYPE,
  ROLE_TYPE,
  TABLE_NAME_RULES,
  INPUT_RULES,
} from "@/constants/index";
import { useQuery } from "@/hooks/";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const CreateSyncData = ({ modal, roles, onUploadExist }) => {
  const [testLoading, setTestLoading] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);
  const [columnTypes, setColumnTypes] = useState([]);
  const [syncData, setSyncData] = useState([]);
  const [testConnClick, setTestConnClick] = useState(false); // change Edit or Test
  const [okClick, setOkClick] = useState(false); // change Edit or Test
  const [form] = Form.useForm();
  const getColumnTypeQuery = useQuery(MetadataApi.getColumnType);
  const tableAddFileQuery = useQuery(UserApi.tableAddFile);
  const syncTestConnQuery = useQuery(FlowApi.syncTestConn);
  const syncTableQuery = useQuery(FlowApi.syncTable);
  const dbOptions = DB_TYPE.getOptionList().map((type) => ({
    value: type.value,
  }));

  const getColumnType = async () => {
    const result = await getColumnTypeQuery.exec();
    setColumnTypes(result);
  };

  useEffect(() => {
    if (modal.visible) {
      getColumnType();
    }
  }, [modal.visible]);

  const handleBeforeLeave = () => {
    setTestLoading(false);
    setTestConnClick(false);
    setOkClick(false);
    form.resetFields();
    setSyncData([]);
    modal.closeModal();
  };

  const handleFinish = async (data) => {
    setOkClick(true);

    // apply
    if (syncData.length !== 0 && syncData.result === true) {
      setApplyLoading(true);
      try {
        const req = {
          database: data.database,
          host: data.host,
          name: data.userName,
          password: data.password,
          port: data.port,
          tableName: data.name,
          type: data.dbType,
          table: {
            columns: form.getFieldValue(["columns"]),
            name: data.tableName,
            comment: data.tableDesc,
          },
        };
        const result = await syncTableQuery.exec(req);
        if (result === true) message.success("Apply successfully");
        else message.success("Apply Connect fail");
      } catch (e) {
        console.log(e);
      } finally {
        setApplyLoading(false);
        handleBeforeLeave();
      }
    } else if (testConnClick === true && testLoading === false) {
      // Test Connect
      setTestLoading(true);
      try {
        const req = {
          database: data.database,
          host: data.host,
          name: data.userName,
          password: data.password,
          port: data.port,
          tableName: data.name,
          type: data.dbType,
        };
        const result = await syncTestConnQuery.exec(req);
        setSyncData(result);
        if (result.columns !== 0) {
          form.setFieldsValue({
            columns: result.columns.map((field) => ({
              name: field,
              dataType: columnTypes.length ? columnTypes[0].type : undefined,
            })),
          });
        }
        if (result.result === true) {
          message.success("Test Connect successfully.");
          setTestConnClick(false);
          setOkClick(false);
        } else message.error("Test Connect fail.");

        setTestLoading(false);
      } catch (e) {
        console.log(e);
      } finally {
        setTestLoading(false);
      }
    } else if (testLoading === true) {
      message.warn("Please Waiting for Test Connect");
    }
  };

  const fileExtraProps = {};
  if (!form.getFieldError("dataFile").length) {
    fileExtraProps.help = "File types supported: json, csv, xls, xlsx";
  }

  const handleCreateExist = () => {
    handleBeforeLeave();
    onUploadExist();
    setSyncData([]);
  };

  const handleTest = () => {
    setSyncData([]);
    setTestConnClick(true);
    form.submit();
  };
  const handleEdit = () => {
    setTestConnClick(false);
    setSyncData([]);
  };

  const formOnChange = () => {
    setTestConnClick(false);
  };

  return (
    <Modal
      title="Sync New Data"
      visible={modal.visible}
      bodyStyle={{
        maxHeight: "70vh",
        overflow: "auto",
      }} // 高度自動,超過螢幕的70％就scroll
      onCancel={handleBeforeLeave}
      footer={
        <Space align="end">
          <Button
            disabled={tableAddFileQuery.isLoading}
            onClick={handleBeforeLeave}
          >
            Cancel
          </Button>
          <Button
            loading={tableAddFileQuery.isLoading || applyLoading}
            type="primary"
            onClick={form.submit}
          >
            {roles.includes(ROLE_TYPE.MASTER) ? "Ok" : "Submit"}
          </Button>
        </Space>
      }
      width={900}
      destroyOnClose
      closable={!tableAddFileQuery.isLoading}
      maskClosable={!tableAddFileQuery.isLoading}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="import"
        onFinish={handleFinish}
        scrollToFirstError
        onChange={formOnChange}
      >
        {() => (
          <>
            <Form.Item label="Source Table Name">
              <Form.Item
                name="name" // in dbSetting
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Please input Table Name",
                  },
                  {
                    pattern: TABLE_NAME_RULES.pattern,
                    message:
                      "Start with alphabet and accept only letters(A-Za-z), numbers(0-9) and underline(_)",
                  },
                ]}
                normalize={(value) => (value || "").toLowerCase()}
              >
                <Input
                  placeholder="Input a Table Name"
                  style={{ width: "80%" }}
                  maxLength={INPUT_RULES.TABLE_NAME.value}
                  disabled={
                    (testConnClick && syncData.length !== 0) ||
                    testLoading ||
                    syncData.length !== 0
                  }
                />
              </Form.Item>
              <Button
                className="linkbutton"
                type="link"
                onClick={handleCreateExist}
              >
                Edit Exist
              </Button>
            </Form.Item>
            <Form.Item
              name="host"
              label="Host"
              rules={[{ required: true, message: "Please input a IP" }]}
            >
              <Input
                placeholder="10.10.1.5"
                style={{ width: "55%" }}
                disabled={
                  (testConnClick && syncData.length !== 0) ||
                  testLoading ||
                  syncData.length !== 0
                }
                maxLength={INPUT_RULES.HOST.value}
              />
            </Form.Item>
            <Form.Item
              name="port"
              label="Port"
              rules={[{ required: true, message: "Please input a number" }]}
            >
              <Input
                placeholder="Input a number"
                style={{ width: "55%" }}
                disabled={
                  (testConnClick && syncData.length !== 0) ||
                  testLoading ||
                  syncData.length !== 0
                }
                maxLength={INPUT_RULES.PORT.value}
              />
            </Form.Item>
            <Form.Item
              name="dbType"
              label="DB Type"
              rules={[{ required: true, message: "Please Select a type" }]}
            >
              <Select
                disabled={
                  (testConnClick && syncData.length !== 0) ||
                  testLoading ||
                  syncData.length !== 0
                }
                placeholder="Select a type"
                style={{ width: "55%" }}
                options={dbOptions}
              />
            </Form.Item>
            <Form.Item
              name="database"
              label="DB Source"
              rules={[{ required: true, message: "Please Enter a Source" }]}
            >
              <Input
                placeholder="Wisdom_ssot"
                maxLength={INPUT_RULES.DB_NAME.value}
                style={{ width: "55%" }}
                disabled={
                  (testConnClick && syncData.length !== 0) ||
                  testLoading ||
                  syncData.length !== 0
                }
              />
            </Form.Item>
            <Form.Item
              name="userName"
              label="User Name"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ float: "right" }} />}
                disabled={
                  (testConnClick && syncData.length !== 0) ||
                  testLoading ||
                  syncData.length !== 0
                }
                placeholder="Username"
                maxLength={INPUT_RULES.USER_NAME.value}
                style={{ width: "55%" }}
              />
            </Form.Item>
            <Form.Item label="Password">
              <Space align="center">
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input a password",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Input a password"
                    disabled={
                      (testConnClick && syncData.length !== 0) ||
                      testLoading ||
                      syncData.length !== 0
                    }
                    prefix={<LockOutlined style={{ float: "right" }} />}
                    maxLength={INPUT_RULES.USER_PW.value}
                  />
                </Form.Item>
                <Form.Item
                  name="testButton"
                  validateStatus={!testConnClick && okClick ? "error" : null}
                  help={
                    !testConnClick && okClick && syncData.length === 0
                      ? "Pleace Click Test Connect"
                      : null
                  }
                >
                  {syncData.length === 0 ? (
                    <Button
                      style={{ marginLeft: "10px" }}
                      onClick={() => handleTest()}
                      loading={testLoading}
                      danger={!testConnClick && okClick}
                    >
                      Test Connect
                    </Button>
                  ) : (
                    <>
                      <Button
                        style={{ marginLeft: "10px" }}
                        onClick={() => handleEdit()}
                      >
                        Edit
                      </Button>
                      {syncData.result ? (
                        <div style={{ color: "#20a7c9" }}>Connect Success</div>
                      ) : (
                        <div style={{ color: "#e04355" }}>Connect Fail</div>
                      )}
                    </>
                  )}
                </Form.Item>
              </Space>
            </Form.Item>
            <Form.Item
              name="tableName"
              label="Table Name"
              rules={[
                {
                  required: !!(
                    syncData.length !== 0 && syncData.columns.length !== 0
                  ),
                  message: "Please input a Table Name",
                },
                {
                  pattern: TABLE_NAME_RULES.pattern,
                  message:
                    "Start with alphabet and accept only letters(A-Za-z), numbers(0-9) and underline(_)",
                },
              ]}
            >
              {syncData.length !== 0 && syncData.columns.length !== 0 ? (
                <Input
                  placeholder="Input a Table Name"
                  style={{ width: "80%" }}
                  disabled={applyLoading}
                  maxLength={INPUT_RULES.TABLE_NAME.value}
                />
              ) : null}
            </Form.Item>
            <Form.Item name="tableDesc" label="Table Description">
              {syncData.length !== 0 && syncData.columns.length !== 0 ? (
                <Input
                  placeholder="Input a Description"
                  style={{ width: "80%" }}
                  disabled={applyLoading}
                  maxLength={INPUT_RULES.TABLE_DESCRIPTION.value}
                />
              ) : null}
            </Form.Item>
            <Form.Item name="tableSchema" label="Table Preview">
              {syncData.length !== 0 && syncData.columns.length !== 0 ? (
                <Form.Item
                  name="columns"
                  rules={[
                    {
                      required: true,
                      message: "Please add a column",
                    },
                  ]}
                >
                  <Form.List name="columns">
                    {(fields) => {
                      return (
                        <>
                          <div>
                            {fields.map((field) => (
                              <Space
                                key={field.key}
                                className="columnRow"
                                align="center"
                              >
                                <Form.Item
                                  {...field}
                                  name={[field.name, "name"]}
                                  fieldKey={[field.fieldKey, "name"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing column name",
                                    },
                                  ]}
                                >
                                  <Input disabled placeholder="Column Name" />
                                </Form.Item>
                                <Form.Item
                                  {...field}
                                  name={[field.name, "dataType"]}
                                  fieldKey={[field.fieldKey, "dataType"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing column type",
                                    },
                                  ]}
                                >
                                  <Select
                                    style={{ width: 150 }}
                                    disabled={applyLoading}
                                  >
                                    {columnTypes.map((c) => (
                                      <Select.Option key={c.seq} value={c.type}>
                                        {c.type}
                                      </Select.Option>
                                    ))}
                                  </Select>
                                </Form.Item>
                                <Form.Item
                                  {...field}
                                  name={[field.name, "comment"]}
                                  fieldKey={[field.fieldKey, "comment"]}
                                >
                                  <Input
                                    disabled={applyLoading}
                                    placeholder="Column Description"
                                    style={{ minWidth: 100, maxWidth: 500 }}
                                    maxLength={
                                      INPUT_RULES.COLUMN_DESCRIPTION.value
                                    }
                                  />
                                </Form.Item>
                              </Space>
                            ))}
                          </div>
                        </>
                      );
                    }}
                  </Form.List>
                </Form.Item>
              ) : null}
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
};

CreateSyncData.propTypes = {
  modal: PropTypes.shape({
    visible: PropTypes.bool,
    closeModal: PropTypes.func,
    modalData: PropTypes.shape({
      name: PropTypes.string,
      children: PropTypes.arrayOf(PropTypes.object),
    }),
  }).isRequired,
  roles: PropTypes.arrayOf(PropTypes.string),
  onUploadExist: PropTypes.func,
};

CreateSyncData.defaultProps = {
  roles: [],
  onUploadExist: () => null,
};

export default CreateSyncData;
