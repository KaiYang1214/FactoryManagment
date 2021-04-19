import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, message } from 'antd';
import { TableApi } from '@/apis/';
import { useQuery } from '@/hooks/';

const DeleteTableModal = ({ modal, refresh }) => {
  const tableDeleteQuery = useQuery(TableApi.tableDelete);
  const [saveLoading, setSaveLoading] = useState(false);

  const handleBeforeLeave = () => {
    modal.closeModal();
  };

  const handleDelete = async () => {
    setSaveLoading(true);
    try {
      const req = {
        tableName: modal.modalData.name,
      };
      await tableDeleteQuery.exec(req);
      message.success('Delete table successfully.');
      setSaveLoading(false);
      refresh();
      handleBeforeLeave();
    } catch (e) {
      message.success('Delete table Fail.');
      setSaveLoading(false);
      console.log(e);
    }
  };

  return (
    <Modal
      title="Confirm Table Deletion"
      visible={modal.visible}
      onOk={handleDelete}
      onCancel={handleBeforeLeave}
      maskClosable={!saveLoading}
      confirmLoading={saveLoading}
      closable={!saveLoading}
      cancelButtonProps={{ disabled: saveLoading }}
    >
      <p>
        Are you sure you want to delete{' '}
        {modal.modalData && modal.modalData.name}?
      </p>
    </Modal>
  );
};

DeleteTableModal.propTypes = {
  modal: PropTypes.shape({
    visible: PropTypes.bool,
    closeModal: PropTypes.func,
    modalData: PropTypes.shape({
      name: PropTypes.string,
      children: PropTypes.arrayOf(PropTypes.object),
    }),
  }).isRequired,
  refresh: PropTypes.func,
};

DeleteTableModal.defaultProps = {
  refresh: () => null,
};

export default DeleteTableModal;
