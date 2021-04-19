import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Divider, Table } from 'antd';
import { useQuery, useModal } from '@/hooks';
import { UserApi } from '@/apis';
import { DATE_TYPE, PREVIEW_STATUS } from '@/constants/index';
import DetailModal from './DetailModal';

const columns = [
  {
    title: 'Group Name',
    dataIndex: 'groupName',
  },
  {
    title: 'User Name',
    dataIndex: 'owner',
  },
  {
    title: 'Reason',
    dataIndex: 'reason',
  },
  {
    title: 'Update Time',
    dataIndex: 'createdAt',
    render: updateTime => moment(updateTime).format(DATE_TYPE.DATE_TIME),
  },
];

const MasterTableList = ({ hideData = [], showDetail = true }) => {
  const detailModal = useModal();
  const getAllGroupsQuery = useQuery(UserApi.getAllGroups);

  const getAllGroups = async page => {
    try {
      await getAllGroupsQuery.execForList(page, {
        status: PREVIEW_STATUS.APPLYING.value,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllGroups();
  }, []);

  useEffect(() => {
    getAllGroups();
  }, [getAllGroupsQuery.pagination.page]);

  return (
    <>
      {getAllGroupsQuery.data.groupListData && (
        <Table
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...getAllGroupsQuery.tableProps}
          columns={columns.filter(item => !hideData.includes(item.dataIndex))}
          scroll={{ x: 'max-content' }}
          style={{margin: '0 10px'}}
          pagination={{ position: 'bottom', defaultPageSize: 10, total: getAllGroupsQuery.pagination.total, defaultCurrent: 1 }}
          rowKey="groupId"
          dataSource={getAllGroupsQuery.data.groupListData}
          onRow={record => ({
            onClick: () => (showDetail ? detailModal.openModal(record) : null),
            style: { cursor: showDetail ? 'pointer' : 'auto' },
          })}
        />
      )}
      <DetailModal modal={detailModal} onFinish={getAllGroups} />
    </>
  );
};

export default MasterTableList;
