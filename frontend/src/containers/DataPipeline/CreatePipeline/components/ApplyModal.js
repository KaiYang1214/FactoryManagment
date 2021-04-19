/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Modal, Button, Form, Space, Input, Alert, message } from 'antd';
import { TableApi } from '@/apis/';
import { useQuery } from '@/hooks/';
import { INPUT_RULES } from '@/constants/index';

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

const ApplyModal = ({ modal, user, onFinish, selectedGroup, refresh }) => {
  const [error, setError] = useState(false);
  const [form] = Form.useForm();

  const tableApplyQuery = useQuery(TableApi.tableApply);

  const handleBeforeLeave = () => {
    setError(false);
    form.resetFields();
    modal.closeModal();
  };

  const handleApply = async data => {
    try {
      const req = {
        dept: data.dept,
        project: data.project,
        reason: data.reason,
        tableName: modal.modalData.name,
        type: modal.modalData.systemType,
        groupId: selectedGroup,
      };
      await tableApplyQuery.exec(req);
      message.success('Your application form has been submitted successfully.');
      handleBeforeLeave();
      refresh();
      onFinish(modal.modalData);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      title="Table Permission Application"
      visible={modal.visible}
      bodyStyle={{
        maxHeight: '70vh',
        overflow: 'auto',
      }} // 高度自動,超過螢幕的70％就scroll
      onCancel={handleBeforeLeave}
      width={600}
      footer={
        <Space align="end">
          <Button
            disabled={tableApplyQuery.isLoading}
            onClick={handleBeforeLeave}
          >
            Cancel
          </Button>
          <Button
            loading={tableApplyQuery.isLoading}
            type="primary"
            onClick={form.submit}
          >
            Confirm
          </Button>
        </Space>
      }
      destroyOnClose
      closable={!tableApplyQuery.isLoading}
      maskClosable={!tableApplyQuery.isLoading}
    >
      {error ? (
        <div style={{ marginBottom: 24 }}>
          <Alert message={error} type="Error" showIcon />
        </div>
      ) : null}
      <Form
        {...formItemLayout}
        form={form}
        name="auth"
        onFinish={handleApply}
        scrollToFirstError
        initialValues={{ ...modal.modalData, ...user }}
      >
        <Form.Item label="Table Name">
          {modal.modalData && modal.modalData.name}
        </Form.Item>
        <Form.Item label="User Name">{user.lastName}</Form.Item>
        <Form.Item label="User Id">{user.emplId}</Form.Item>
        <Form.Item label="Email">{user.email}</Form.Item>
        <Form.Item
          label="Department Name"
          name="dept"
          rules={[{ required: true, message: 'Please input Department Name!' }]}
        >
          <Input maxLength={INPUT_RULES.DEPARTMENT_NAME.value} />
        </Form.Item>
        <Form.Item label="Project" name="project">
          <Input maxLength={INPUT_RULES.PROJECT_NAME.value} />
        </Form.Item>
        <Form.Item
          label="Reason"
          name="reason"
          rules={[{ required: true, message: 'Please input Reason!' }]}
        >
          <Input.TextArea rows={4} maxLength={INPUT_RULES.REASON.value} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

ApplyModal.propTypes = {
  modal: PropTypes.shape({
    visible: PropTypes.bool,
    closeModal: PropTypes.func,
    modalData: PropTypes.shape({
      name: PropTypes.string,
      children: PropTypes.arrayOf(PropTypes.object),
    }),
  }).isRequired,
  selectedGroup: PropTypes.string.isRequired,
  refresh: PropTypes.func,
};

ApplyModal.defaultProps = {
  refresh: () => null,
};

export default ApplyModal;
