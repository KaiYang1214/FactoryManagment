import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form, Space, Input, Alert, Radio, message } from 'antd';
import { TableApi } from '@/apis/';
import { useQuery } from '@/hooks/';
import { INPUT_RULES } from '@/constants/index';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const DetailModal = ({ modal, onFinish }) => {
  const [error, setError] = useState(false);
  const [form] = Form.useForm();

  const grantPermissionQuery = useQuery(TableApi.grantPermission);

  useEffect(() => {
    if (modal.visible) {
      form.setFieldsValue({ ...modal.modalData, allowed: 1, rejectReason: '' });
    }
  }, [modal.visible]);

  const handleBeforeLeave = () => {
    setError(false);
    form.resetFields();
    modal.closeModal();
  };

  const handleChange = async data => {
    try {
      const req = {
        uuid: modal.modalData.uuid,
        ...data,
      };
      await grantPermissionQuery.exec(req);
      message.success(
        `This table has been ${
          data.allowed ? 'approved' : 'rejected'
        } successfully!`,
      );
      handleBeforeLeave();
      onFinish();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      title={`Grant Permission(${
        modal.modalData && modal.modalData.tableName
      })`}
      visible={modal.visible}
      onCancel={handleBeforeLeave}
      width={600}
      footer={
        <Space align="end">
          <Button
            disabled={grantPermissionQuery.isLoading}
            onClick={handleBeforeLeave}
          >
            Cancel
          </Button>
          <Button
            loading={grantPermissionQuery.isLoading}
            type="primary"
            onClick={form.submit}
          >
            Confirm
          </Button>
        </Space>
      }
      destroyOnClose
      closable={!grantPermissionQuery.isLoading}
      maskClosable={!grantPermissionQuery.isLoading}
    >
      {error ? (
        <div style={{ marginBottom: 24 }}>
          <Alert message={error} type="Error" showIcon />
        </div>
      ) : null}
      <Form
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...formItemLayout}
        form={form}
        name="auth"
        onFinish={handleChange}
        scrollToFirstError
      >
        {() => (
          <>
            <Form.Item label="Table Name">
              {modal.modalData.tableName}
            </Form.Item>
            <Form.Item label="Group Name">
              {modal.modalData.groupName}
            </Form.Item>
            <Form.Item label="User Name">
              {modal.modalData.applyUserName}
            </Form.Item>
            <Form.Item label="User Id">{modal.modalData.userId}</Form.Item>
            <Form.Item label="Department Name">
              {modal.modalData.dept}
            </Form.Item>
            <Form.Item label="Project">{modal.modalData.project}</Form.Item>
            <Form.Item label="Reason">{modal.modalData.reason}</Form.Item>
            <Form.Item
              label="Status"
              name="allowed"
              rules={[{ required: true }]}
            >
              <Radio.Group
                options={[
                  {
                    label: 'Approve',
                    value: 1,
                  },
                  {
                    label: 'Reject',
                    value: 0,
                  },
                ]}
              />
            </Form.Item>
            {!form.getFieldValue('allowed') ? (
              <Form.Item
                label="Reject Reason"
                name="rejectReason"
                rules={[
                  { required: true, message: 'Please input reject reason!' },
                ]}
                shouldUpdate
              >
                <Input.TextArea rows={4} maxLength={INPUT_RULES.REASON.value} />
              </Form.Item>
            ) : null}
          </>
        )}
      </Form>
    </Modal>
  );
};

DetailModal.propTypes = {
  modal: PropTypes.shape({
    visible: PropTypes.bool,
    closeModal: PropTypes.func,
    modalData: PropTypes.shape({
      name: PropTypes.string,
      children: PropTypes.arrayOf(PropTypes.object),
    }),
  }).isRequired,
};

DetailModal.defaultProps = {};

export default DetailModal;
