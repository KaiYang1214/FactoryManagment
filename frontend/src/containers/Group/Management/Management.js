/* eslint-disable no-mixed-operators */
import React, { useState, useEffect, useContext } from 'react';
import { Table, Space, Button, Modal, message } from 'antd';
import { useModal, useQuery } from '@/hooks';
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { UserApi, RoleApi } from '@/apis';
import { AppContext } from "@/store/appStore";
import { getConstObject, getstoreUserInfo } from '@/utils/common';
import { PREVIEW_STATUS, GROUP_TYPE } from '@/constants/index';
import { GroupModal, TableModal } from './components';
import * as Style from '../style';

const columns = ({ deleteConfirmModal, groupModal, tableModal, userInfo }) => [
  {
    title: 'Group Name',
    dataIndex: 'groupName',
  },
  {
    title: 'Reason',
    dataIndex: 'reason',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: status => getConstObject(PREVIEW_STATUS, status).name,
  },
  {
    width: 112,
    title: () => (
      <Style.toolBar>
        <Button
          type="primary"
          shape="circle"
          style={{
            display: "flex", justifyContent: "center", alignItems: "center", background: "#20a7c9", borderColor: "#20a7c9"
          }}
          icon={<PlusOutlined />}
          onClick={() => groupModal.openModal()}
        />
      </Style.toolBar>
    ),
    render: (value, row) => (
      <Space>
        <Button
          type="text"
          shape="circle"
          style={{ border: 0 }}
          icon={<InfoCircleOutlined />}
          onClick={() => tableModal.openModal(row)}
        />
        <Button
          type="text"
          shape="circle"
          style={{ border: 0 }}
          icon={<EditOutlined />}
          onClick={() => groupModal.openModal(row)}
        />
        <Button
          type="text"
          shape="circle"
          style={{ border: 0 }}
          icon={<DeleteOutlined />}
          onClick={() => { deleteConfirmModal.openModal(row) }}
          disabled={
            row.owner.toLowerCase() !== userInfo.emplId.toLowerCase() ||
            row.groupType === GROUP_TYPE.DEFAULT
          }
        />
      </Space>
    ),
  },
];

const Management = () => {
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const userInfo = getstoreUserInfo();
  const groupModal = useModal();
  const tableModal = useModal();
  const deleteConfirmModal = useModal();
  const getGroupsQuery = useQuery(UserApi.getGroups);

  const getGroups = async () => {
    try {
      const result = await getGroupsQuery.execForList();
      setTotalPage(result.pageInfo.total);
      setGroupList(result.groupListData);
    } catch (e) {
      console.log(e);
    }
  };

  const getRoles = async () => {
    const res = await RoleApi.getRoles();
    setRoles(res);
  };

  useEffect(() => {
    getRoles();
    getGroups();
  }, []);

  useEffect(() => {
    getGroups();
  }, [getGroupsQuery.pagination.page]);

  const handleDelete = async () => {
    try {
      setDeleteIsLoading(true);
      await UserApi.deleteGroup(deleteConfirmModal.modalData.groupId);
      message.success('This group has been successfully deleted');
      getGroups();
      deleteConfirmModal.closeModal();
    } catch (e) {
      message.error(e.message);
    } finally {
      setDeleteIsLoading(false);
    }
  };

  return (
    <>
      <Style.MainTitle>Management</Style.MainTitle>
      <Style.groupManagement>
        <Table
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...getGroupsQuery.tableProps}
          columns={columns({ deleteConfirmModal, groupModal, tableModal, userInfo })}
          style={{margin: '0 10px'}}
          dataSource={groupList}
          scroll={{ x: 'max-content' }}
          pagination={{ position: 'bottom', defaultPageSize: 10, total: totalPage, defaultCurrent: 1 }}
          rowKey="groupId"
        />
        <Style.styleModal
          title="Confirm Deletion"
          visible={deleteConfirmModal.visible}
          onOk={handleDelete}
          onCancel={deleteConfirmModal.closeModal}
          maskClosable={!deleteIsLoading}
          confirmLoading={deleteIsLoading}
          closable={!deleteIsLoading}
          cancelButtonProps={{ disabled: deleteIsLoading }}
        >
          <p>
            Are you sure you want to delete{' '}
            {deleteConfirmModal.modalData && deleteConfirmModal.modalData.name}?
          </p>
        </Style.styleModal>
        <GroupModal
          modal={groupModal}
          roles={roles}
          refresh={getGroups}
          userInfo={userInfo}
          disabled={
            groupModal.modalData !== undefined ?
              (groupModal.modalData.status !== PREVIEW_STATUS.ALLOWED.value)
              ||
              groupModal.modalData.owner.toLowerCase() !==
              userInfo.emplId.toLowerCase()
              :
              null
          }
        />
        <TableModal modal={tableModal} />
      </Style.groupManagement>
    </>
  );
};

export default Management;
