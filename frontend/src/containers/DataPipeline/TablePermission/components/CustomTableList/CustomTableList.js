import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Table, Divider, Space, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { getConstObject } from '@/utils/common';
import { useModal, useQuery } from '@/hooks/';
import { MetadataApi } from '@/apis/';
import { DATE_TYPE, PREVIEW_STATUS } from '@/constants/index';
import DetailModal from './DetailModal';

const CustomTableList = ({
  userId,
  allowed,
  showDetail = true,
  hideData = [],
  page,
  pageSize,
}) => {
  const detailModal = useModal();

  const getUserDefinedListQuery = useQuery(MetadataApi.getUserDefinedList);

  const [state, setState] = useState([]);
  let searchInput;

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = clearFilters => {
    clearFilters();
    setState({ searchText: '' });
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? '#d8800d' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: text =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Table Name',
      dataIndex: 'tableName',
      ...getColumnSearchProps('tableName'),
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
    },
    {
      title: 'User Id',
      dataIndex: 'uploadUserId',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Update Time',
      dataIndex: 'updateTime',
      render: updateTime =>
        moment(updateTime).isValid
          ? moment(updateTime).format(DATE_TYPE.DATE_TIME)
          : updateTime,
    },
  ];

  const getUserDefinedList = async () => {
    try {
      await getUserDefinedListQuery.exec({
        userId,
        status: allowed,
        page,
        pageSize,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserDefinedList();
  }, []);

  return (
    <>
      <Divider style={{ padding: '16px 0', margin: 0, background: 'white' }} orientation="left">User-Defined</Divider>
      <Table
        columns={columns.filter(c => !hideData.includes(c.dataIndex))}
        dataSource={getUserDefinedListQuery.data.results}
        scroll={{ x: 'max-content' }}
        pagination={{
          position: 'bottom',
          defaultPageSize: 10,
        }}
        rowKey="guid"
        loading={getUserDefinedListQuery.isLoading}
        onRow={record => ({
          onClick: () => (showDetail ? detailModal.openModal(record) : null),
          style: { cursor: showDetail ? 'pointer' : 'auto' },
        })}
      />
      <DetailModal modal={detailModal} onFinish={getUserDefinedList} />
    </>
  );
};

CustomTableList.propTypes = {};

CustomTableList.defaultProps = {};

export default CustomTableList;
