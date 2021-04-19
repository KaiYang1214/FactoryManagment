/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Modal,
  Table,
  Upload,
  Button,
  Space,
  Progress,
  Tooltip,
  message,
} from 'antd';
import { useQuery } from '@/hooks/';
import { UserApi, EvidenceApi } from '@/apis/';
import AppConfig from '@/config/';
import { DATE_TYPE, ACTION_TYPE, BLOCKCHAIN_STATUS } from '@/constants/index';

const FILE_SIZE = 10; // MB

const INIT_LOADING_ROW = { uuid: undefined, percent: 0 };

const HistoryModal = ({ modal }) => {
  const [historyList, setHistoryList] = useState([]);
  const [uploadingRow, setUploadingRow] = useState({ ...INIT_LOADING_ROW });
  const getUploadHistoryQuery = useQuery(UserApi.getUploadHistory);

  const columns = ({
    handleBeforeUpload,
    handleListChange,
    handleChange,
    // eslint-disable-next-line no-shadow
    uploadingRow,
    // eslint-disable-next-line no-shadow
    setUploadingRow,
  }) => [
    {
      title: 'Time',
      dataIndex: 'uploadTime',
      width: 180,
      render: uploadTime => moment(uploadTime).format(DATE_TYPE.DATE_TIME),
    },
    {
      title: 'File',
      dataIndex: 'originalName',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 110,
      render: action => action && ACTION_TYPE[action].name,
    },
    {
      title: 'verify',
      dataIndex: 'verifyStatus',
      align: 'center',
      render: (verifyStatus, row) =>
        (verifyStatus !== undefined || uploadingRow.uuid === row.uuid) && (
          <Progress
            type="circle"
            width={40}
            percent={verifyStatus === undefined ? uploadingRow.percent : 100}
            status={
              verifyStatus === undefined
                ? 'active'
                : verifyStatus
                ? 'success'
                : 'exception'
            }
          />
        ),
    },
  ];

  const getUploadHistory = async page => {
    try {
      const result = await getUploadHistoryQuery.execForList(page, {
        tableName: modal.modalData,
      });
      setHistoryList(result.histories);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (modal.visible && modal.modalData) {
      getUploadHistory();
    }
  }, [modal.visible, modal.modalData]);

  useEffect(() => {
    if (modal.visible && modal.modalData) {
      getUploadHistory();
    }
  }, [getUploadHistoryQuery.pagination.page]);

  const handleBeforeLeave = () => {
    modal.closeModal();
  };

  const handleBeforeUpload = file => {
    // 限制大小為10MB
    const isLimit = file.size / 1024 / 1024 < FILE_SIZE;
    if (!isLimit) {
      message.error(`The file size upload limit is ${FILE_SIZE} MB`);
    }
    // eslint-disable-next-line no-param-reassign
    file.isLimit = isLimit;
    return isLimit;
  };

  const handleListChange = (uuid, prop, value) => {
    const nextList = [].concat(historyList);
    const idx = nextList.findIndex(item => item.uuid === uuid);
    if (idx !== -1) {
      nextList[idx][prop] = value;
      setHistoryList(nextList);
    }
  };

  const handleChange = info => {
    if (info.file.status === 'done') {
      handleListChange(
        info.file.response.row.uuid,
        'verifyStatus',
        info.file.response.result,
      );
      setUploadingRow({ ...INIT_LOADING_ROW });
    } else if (info.file.status === 'error') {
      setUploadingRow({ ...INIT_LOADING_ROW });
    }
  };

  return (
    <Modal
      title={`Upload History(${modal.modalData})`}
      visible={modal.visible}
      bodyStyle={{
        maxHeight: '70vh',
        overflow: 'auto',
      }} // 高度自動,超過螢幕的70％就scroll
      onCancel={handleBeforeLeave}
      footer={
        <Space align="end">
          <Button type="primary" onClick={handleBeforeLeave}>
            Ok
          </Button>
        </Space>
      }
      width={1100}
      destroyOnClose
      closable={!getUploadHistoryQuery.isLoading}
      maskClosable={!getUploadHistoryQuery.isLoading}
    >
      <Table
        {...getUploadHistoryQuery.tableProps}
        columns={columns({
          handleBeforeUpload,
          handleListChange,
          handleChange,
          uploadingRow,
          setUploadingRow,
        })}
        dataSource={getUploadHistoryQuery.isLoading ? [] : historyList}
        rowKey="uuid"
        scroll={{ y: 500 }}
      />
    </Modal>
  );
};

HistoryModal.propTypes = {
  modal: PropTypes.shape({
    visible: PropTypes.bool,
    closeModal: PropTypes.func,
    modalData: PropTypes.string,
  }).isRequired,
};

HistoryModal.defaultProps = {};

export default HistoryModal;
