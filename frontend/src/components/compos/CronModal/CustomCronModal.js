// 此為cron轉碼的彈跳視窗
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Space } from 'antd';
import CustomCron from './CustomCron';

const CustomCronModal = ({
  modal,
  setCronValue,
  getUIValue,
  setGetUIValue,
  handleOK, // call api可能不同
  loading,
}) => {
  const [okIsLoading, setOkIsLoading] = useState(false); // modal ok click
  const [submitIsLoading, setSubmitIsLoading] = useState(false); // cronjob form submit

  const handleBeforeLeave = () => {
    modal.closeModal();
  };

  const handleOkClick = () => {
    setOkIsLoading(true);
  };

  useEffect(() => {
    if (submitIsLoading === true) {
      handleOK();
      setOkIsLoading(false);
      setSubmitIsLoading(false);
    }
  }, [submitIsLoading]);

  return modal.visible ? (
    <Modal
      title="Update Frequency Setting"
      visible={modal.visible}
      le={{
        maxHeight: '50vh',
        overflow: 'auto',
      }} // 高度自動,超過螢幕的50％就scroll
      onCancel={handleBeforeLeave}
      footer={
        <Space align="end">
          <Button
            type="primary"
            onClick={() => handleOkClick()}
            loading={loading}
          >
            Ok
          </Button>
        </Space>
      }
      width={700}
      maskClosable={!loading}
      confirmLoading={loading}
      closable={!loading}
      cancelButtonProps={{ disabled: loading }}
    >
      <div>
        <CustomCron
          setUItoValue={setCronValue}
          getUIValue={getUIValue}
          setGetUIValue={setGetUIValue}
          okIsLoading={okIsLoading}
          setSubmitIsLoading={setSubmitIsLoading}
          setOkIsLoading={setOkIsLoading}
        />
      </div>
    </Modal>
  ) : null;
};

CustomCronModal.propTypes = {
  modal: PropTypes.shape({
    visible: PropTypes.bool,
    closeModal: PropTypes.func,
    modalData: PropTypes.shape({}),
  }).isRequired,
};

CustomCronModal.defaultProps = {};

export default CustomCronModal;
