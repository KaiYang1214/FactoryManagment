import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Button, Table } from 'antd';
import { UserApi } from '@/apis';
import { useQuery } from '@/hooks';
import { SYSTEM_TYPE } from '@/constants/index';
import * as Style from '../../../style';

const columns = [
  {
    title: 'Table Name',
    dataIndex: 'name',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    render: type => (SYSTEM_TYPE.props[type] || {}).name || type,
  },
];

const TableModal = ({ modal }) => {
    const [tableList, setTableList] = useState([]);
    const [totalPage, setTotalPage] = useState();
    const [groupId, setGroupId] = useState();
    const getGroupTableQuery = useQuery(UserApi.getGroupTable);
  
    const getGroupTable = async page => {
      try {
        const result = await getGroupTableQuery.execForList(page, {
          groupId: modal.modalData.groupId,
        });
        setTotalPage(result.pageInfo.total);
        setTableList(result.groupTablesInfo);
        setGroupId(modal.modalData.groupId);
      } catch (e) {
        console.log(e);
      }
    };
  
    useEffect(() => {
      if (modal.visible && modal.modalData && modal.modalData.groupId) {
        getGroupTable();
      }
    }, [modal.visible, modal.modalData, getGroupTableQuery.pagination.page]);

    useEffect(() => {
      if (groupId) {
        getGroupTable(1);
      }
    }, [groupId]);
  
    const handleBeforeLeave = () => {
      setTableList([]);
      modal.closeModal();
    };
  
    return (
      <Style.styleModal
        title={`Table List(${modal.modalData && modal.modalData.groupName})`}
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
            disabled={getGroupTableQuery.isLoading}
          >
            Ok
          </Button>
        }
        width={900}
        destroyOnClose
        closable={!getGroupTableQuery.isLoading}
        maskClosable={!getGroupTableQuery.isLoading}
      >
        <Table
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...getGroupTableQuery.tableProps}
          columns={columns}
          dataSource={getGroupTableQuery.isLoading ? [] : tableList}
          pagination={{ defaultCurrent: 1, total: totalPage }}
          scroll={{ y: 500 }}
          rowKey="guid"
          loading={getGroupTableQuery.isLoading}
        />
      </Style.styleModal>
  );
};

TableModal.propTypes = { 
  modal: PropTypes.shape({
    visible: PropTypes.bool,
    closeModal: PropTypes.func,
    modalData: PropTypes.shape({
    name: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.object),
    }),
  }).isRequired,
};

TableModal.defaultProps = {};

export default TableModal;
