import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Modal, Button, Table } from 'antd';
import { PreviewApi } from '@/apis/';

const PreviewModal = ({ modal, groupId }) => {
  const [columns, setColumns] = useState([]);
  const [previewData, setPreviewData] = useState([]);
  const [previewLoading, setPreviewLoading] = useState(false);

  const getPreviewTable = async (tableName, systemType) => {
    setPreviewLoading(true);
    try {
      const result = await PreviewApi.getPreviewTable(
        tableName,
        systemType,
        groupId,
      );
      setPreviewData(result);
    } catch (e) {
      console.log(e);
    } finally {
      setPreviewLoading(false);
    }
  };

  useEffect(() => {
    if (modal.visible && modal.modalData && modal.modalData.columns) {
      const colList = modal.modalData.columns.map(col => ({
        title: col.name,
        dataIndex: col.name.toLowerCase(),
        render: value =>
          value !== undefined && value !== null && value.toString
            ? value.toString()
            : value,
      }));
      setColumns(colList);
      getPreviewTable(
        modal.modalData.previewName || modal.modalData.name,
        modal.modalData.systemType,
      );
    }
  }, [modal.visible, modal.modalData]);

  const getWidth = () => {
    const minWidth = 850;
    return minWidth + columns.length * 120;
  };

  const handleBeforeLeave = () => {
    setColumns([]);
    setPreviewData([]);
    modal.closeModal();
  };

  return (
    <Modal
      title={`Preview(${modal.modalData && modal.modalData.name})`}
      visible={modal.visible}
      bodyStyle={{
        maxHeight: '70vh',
        overflow: 'auto',
      }} // 高度自動,超過螢幕的70％就scroll
      onCancel={handleBeforeLeave}
      footer={
        <Button
          type="primary"
          onClick={handleBeforeLeave}
          disabled={previewLoading}
        >
          Ok
        </Button>
      }
      width={900}
      destroyOnClose
      closable={!previewLoading}
      maskClosable={!previewLoading}
    >
      <Table
        columns={columns}
        dataSource={previewData} 
        scroll={{ y: 500, x: getWidth() }}
        pagination={false}
        rowKey="guid"
        loading={previewLoading}
      />
    </Modal>
  );
};

PreviewModal.propTypes = {
  modal: PropTypes.shape({
    visible: PropTypes.bool,
    closeModal: PropTypes.func,
    modalData: PropTypes.shape({
      name: PropTypes.string,
      columns: PropTypes.arrayOf(PropTypes.object),
    }),
  }).isRequired,
};

PreviewModal.defaultProps = {};

export default PreviewModal;
