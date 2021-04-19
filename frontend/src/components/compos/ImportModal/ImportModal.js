/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  Button,
  Form,
  Input,
  Upload,
  Select,
  Space,
  message,
  Table,
} from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { getParameterByName, storeUserInfo } from "@/utils/common";
import { useUserStore } from "@/store/userStroe";
import { useAppStore } from "@/store/appStore";
import AppConfig from "@/config";
import { UserApi, MetadataApi } from "@/apis/";
import { useQuery } from "@/hooks/";
import { ROLE_TYPE, TABLE_NAME_RULES, INPUT_RULES } from "@/constants/index";
import "./ImportModalStyle.less";

const FILE_SIZE = 10; // MB

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

const copyUrl = () => {
  const el = document.createElement("textarea");
  el.value = AppConfig.serverUrl + UserApi.tableAddFile.url;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  message.success("Copy successfully!");
};

const copyGetItem = () => {
  const el = document.createElement("textarea");
  el.value = `Bearer ${sessionStorage.getItem("access_token")}`;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  message.success("Copy successfully!");
};

const ImportModal = ({ modal, onUploadExist }) => {
  const { setUserData } = useUserStore();
  const { userInfo } = useAppStore();
  const [columnTypes, setColumnTypes] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [fileloading, setFileloading] = useState(false);
  const [schemaFileList, setSchemaFileList] = useState([]);
  const [schemaFileloading, setSchemaFileloading] = useState(false); // finish=>true
  const [fileColumn, setFileColumn] = useState([]); // 實際顯示的欄位
  const [dataFileColumn, setDataFileColumn] = useState([]); // datafile的欄位
  const [schemaFileColumn, setSchemaFileColumn] = useState([]); // schema的欄位
  const [compareError, setCompareError] = useState(false);
  const [form] = Form.useForm();
  const getColumnTypeQuery = useQuery(MetadataApi.getColumnType);
  const tableAddFileQuery = useQuery(UserApi.tableAddFile);

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
    setFileList([]);
    setSchemaFileList([]);
    setDataFileColumn([]);
    setSchemaFileColumn([]);
    setFileColumn([]);
    setCompareError(false);
    setFileloading(false);
    setSchemaFileloading(false);
    form.resetFields();
    modal.closeModal();
  };

  useEffect(() => {
    if (dataFileColumn.length !== 0 && schemaFileColumn.length !== 0) {
      const data = dataFileColumn.map((e) => e.name);
      const schema = schemaFileColumn.map((e) => e.name);
      data.sort();
      schema.sort();
      const bolCompare =
        data.length === schema.length &&
        data.every((value, index) => value === schema[index]); // true=the same
      setCompareError(!bolCompare);
    } else {
      setCompareError(false);
    }
  }, [dataFileColumn, schemaFileColumn]);

  const handleChange = (info) => {
    let flist = [...info.fileList];
    let nextList = [];
    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    flist = flist.slice(-1);
    if (flist.every((f) => f.isLimit)) {
      nextList = [].concat(flist);
    }

    setFileList(nextList);
    setFileloading([]);

    if (info.file.status !== "uploading") {
      setFileloading(false);
    }
    if (info.file.status === "done") {
      setFileloading(true);
    } else if (info.file.status === "error") {
      setFileloading(false);
    }
  };

  const handleFinish = async (data) => {
    const tableInfo = {
      name: data.name,
      comment: data.comment,
      columns: data.columns,
    };
    delete tableInfo.dataFile;
    const tableStr = JSON.stringify(tableInfo);

    try {
      const fd = new FormData();
      if (fileList[0]) {
        fd.append("file", fileList[0].originFileObj);
      }
      fd.append("tableStr", tableStr);
      const result = await tableAddFileQuery.execForFormData(fd);
      if (result.code === 1) message.success(result.msg);
      handleBeforeLeave();
    } catch (e) {
      console.log(e);
    }
  };

  const fileExtraProps = {};
  if (!form.getFieldError("dataFile").length) {
    fileExtraProps.help = "File types supported: json, csv, xls, xlsx";
  }

  const handleBeforeUpload = (file) => {
    // 限制大小為10MB
    const isLimit = file.size / 1024 / 1024 < FILE_SIZE;
    if (!isLimit) {
      message.error(`The file size upload limit is ${FILE_SIZE} MB`);
    }
    // eslint-disable-next-line no-param-reassign
    file.isLimit = isLimit;
    return isLimit;
  };

  const handleBeforeUploadSchema = (file) => {
    // 限制大小為10MB
    const isLimit = file.size / 1024 / 1024 < FILE_SIZE;
    if (!isLimit) {
      message.error(`The file size upload limit is ${FILE_SIZE} MB`);
    }
    // eslint-disable-next-line no-param-reassign
    file.isLimit = isLimit;
    return isLimit;
  };

  const handleUploadExist = () => {
    handleBeforeLeave();
    onUploadExist();
  };

  const ColumnRemove = () => {
    if (fileColumn !== "" && fileloading === true) {
      const values = form.getFieldsValue();
      form.setFieldsValue({ ...values, columns: [] });
    }
  };

  const parameterData = [
    {
      key: "1",
      name: "file",
      formate: "file",
      description: "file",
    },
    {
      key: "2",
      name: "tableStr",
      formate: "string",
      description: "table str,table and column json str",
    },
  ];

  const parameterCol = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Formate",
      dataIndex: "formate",
      key: "formate",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  //   // for schema file
  const handleSchemaChange = (info) => {
    let flist = [...info.fileList];
    let nextList = [];
    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    flist = flist.slice(-1);
    if (flist.every((f) => f.isLimit)) {
      nextList = [].concat(flist);
    }

    setSchemaFileList(nextList);

    if (info.file.status !== "uploading") {
      setSchemaFileloading(false);
    }
    if (info.file.status === "done") {
      setSchemaFileloading(true);
    } else if (info.file.status === "error") {
      setSchemaFileloading(false);
    }

    if (info.fileList.length === 0) {
      setSchemaFileColumn([]);
      setFileColumn(dataFileColumn);
      form.setFieldsValue({ columns: dataFileColumn });
    }
  };

  return (
    <Modal
      title="Import Data"
      visible={modal.visible}
      bodyStyle={{
        maxHeight: "75vh",
        overflow: "auto",
      }} // 高度自動,超過螢幕的75％就scroll
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
            loading={tableAddFileQuery.isLoading}
            type="primary"
            onClick={form.submit}
          >
            {userInfo && userInfo.roles.includes(ROLE_TYPE.MASTER)
              ? "Ok"
              : "Apply"}
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
      >
        {() => (
          <>
            <Form.Item
              name="dataFile"
              label="Data File"
              rules={[
                {
                  required: true,
                  message: "Please select a file",
                },
              ]}
              {...fileExtraProps}
              shouldUpdate
            >
              <Upload
                name="file"
                beforeUpload={handleBeforeUpload}
                onChange={handleChange}
                multiple={false}
                fileList={fileList}
                showUploadList={{
                  showDownloadIcon: false,
                  showRemoveIcon: fileloading,
                  showPreviewIcon: false,
                }}
                customRequest={({ file, onSuccess, onError }) => {
                  const config = {
                    onUploadProgress: (progressEvent) => {
                      Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                      );
                    },
                  };
                  UserApi.ColumnByFileVerify(file, config).then(
                    (result) => {
                      const list = result.map((item) => ({
                        name: item,
                        dataType: "string",
                      }));
                      setDataFileColumn(list);
                      setFileColumn(list);
                      if (schemaFileloading === false) {
                        setFileColumn(list);
                      } else if (fileColumn.length === 0) {
                        setFileColumn([]);
                      } else {
                        setFileColumn(fileColumn);
                      }
                      onSuccess(result, file);
                    },
                    (e) => {
                      onError(e);
                    }
                  );
                }}
                accept=".json, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              >
                <Button>
                  <UploadOutlined /> Click to Upload
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="schemaFile"
              label="Schema File"
              rules={[
                {
                  required: false,
                  message: "Please select a schemafile",
                },
              ]}
              shouldUpdate
              extra="Only json File types supported"
              validateStatus={compareError === true ? "error" : null}
              help={
                compareError === true
                  ? "Compare Data File & Schema File error, please check length and content!"
                  : null
              }
            >
              <Upload
                name="schemafile"
                beforeUpload={handleBeforeUploadSchema}
                onChange={handleSchemaChange}
                multiple={false}
                fileList={schemaFileList}
                showUploadList={{
                  showDownloadIcon: false,
                  showRemoveIcon: schemaFileloading,
                  showPreviewIcon: false,
                }}
                customRequest={({ file, onSuccess, onError }) => {
                  const config = {
                    onUploadProgress: (progressEvent) => {
                      Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                      );
                    },
                  };
                  UserApi.ColumnBySchemaFileVerify(file, config).then(
                    (result) => {
                      const list = result.map((item) => ({
                        name: item.columnName,
                        dataType: item.columnType,
                        comment: item.columnDesc,
                      }));
                      setSchemaFileColumn(list);
                      setFileColumn(list); // schema有就覆蓋
                      onSuccess(result, file);
                      form.setFieldsValue({ columns: list });
                    },
                    (e) => {
                      onError(e);
                    }
                  );
                }}
                accept=".json"
              >
                <Button>
                  <UploadOutlined /> Click to Upload
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item label="Table Name">
              <Form.Item
                name="name"
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
                  style={{ width: "80%" }}
                  maxLength={INPUT_RULES.TABLE_NAME.value}
                />
              </Form.Item>
              <Button
                className="linkbutton"
                type="link"
                onClick={handleUploadExist}
              >
                Upload Exist
              </Button>
            </Form.Item>
            <Form.Item name="comment" label="Table Description">
              <Input maxLength={INPUT_RULES.TABLE_DESCRIPTION.value} />
            </Form.Item>
            <Form.Item name="tableAndFile" label="Url">
              <Input.TextArea
                style={{ cursor: "default", color: "#000000bf" }}
                disabled
                defaultValue={AppConfig.serverUrl + UserApi.tableAddFile.url}
                autoSize={{ minRows: 1, maxRows: 2 }}
              />
              <Button className="copyBtn" onClick={copyUrl}>
                <CopyOutlined /> Copy
              </Button>
            </Form.Item>
            <Form.Item name="getItem" label="Authorization">
              <Input.TextArea
                style={{ cursor: "default", color: "#000000bf" }}
                disabled
                defaultValue={`Bearer ${sessionStorage.getItem(
                  "access_token"
                )}`}
                autoSize={{ minRows: 4, maxRows: 6 }}
              />
              <Button className="copyBtn" onClick={copyGetItem}>
                <CopyOutlined /> Copy
              </Button>
            </Form.Item>
            <Form.Item name="parameters" label="Parameters">
              <Table
                columns={parameterCol}
                dataSource={parameterData}
                scroll={{ x: "max-content" }}
                pagination={false}
                size="small"
              />
            </Form.Item>
            <Form.Item
              name="columns"
              label="Columns"
              rules={[
                {
                  required: true,
                  message: "Please add a column",
                },
              ]}
            >
              <Form.List name="columns">
                {(fields, { add, remove }) => {
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
                              <Input
                                placeholder="Column Name"
                                maxLength={INPUT_RULES.COLUMN_NAME.value}
                              />
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
                              <Select style={{ width: 150 }}>
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
                                placeholder="Column Description"
                                style={{ minWidth: 100, maxWidth: 500 }}
                                maxLength={INPUT_RULES.COLUMN_DESCRIPTION.value}
                              />
                            </Form.Item>
                            <Form.Item {...field}>
                              <MinusCircleOutlined
                                onClick={() => {
                                  remove(field.name);
                                }}
                              />
                            </Form.Item>
                          </Space>
                        ))}
                        <Button
                          type="dashed"
                          onClick={() => {
                            add({
                              dataType: columnTypes.length
                                ? columnTypes[0].type
                                : undefined,
                            });
                          }}
                          block
                        >
                          <PlusOutlined />
                        </Button>
                        {ColumnRemove()}
                        {fileColumn !== "" && fileloading === true
                          ? fileColumn.forEach((item) => {
                              setFileloading(false);
                              add(item);
                            })
                          : null}
                      </div>
                    </>
                  );
                }}
              </Form.List>
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
};

ImportModal.propTypes = {
  modal: PropTypes.shape({
    visible: PropTypes.bool,
    closeModal: PropTypes.func,
    modalData: PropTypes.shape({
      name: PropTypes.string,
      children: PropTypes.arrayOf(PropTypes.object),
    }),
  }).isRequired,
  onUploadExist: PropTypes.func,
};

ImportModal.defaultProps = {
  onUploadExist: () => null,
};

export default ImportModal;
