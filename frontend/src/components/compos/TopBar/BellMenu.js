/*
 for Bell menual
 */
import React, { useState, useEffect } from 'react';
import { Button, List, message } from 'antd';
import { NotifyApi } from '@/apis/';
import { useQuery } from '@/hooks/';
import './BellMenuStyle.less';
import * as Style from "./style";

const CLICK_TYPE = {
  read: 'read',
  unread: 'unread',
};

// 時間轉換-只給日期
const timestampToTime = timestamp => {
  if (timestamp !== '' && timestamp !== null) {
    const date = new Date(timestamp); // 10位需*1000,13位不用
    const M = `${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }/`;
    const D = `${date.getDate()} `;
    return M + D;
  }
  return null;
};

const BellMenu = ({
    bellClick,
    setBellClick,
    count,
    setCount,
    bellBarClick,
    setBellBarClick,
}) => {
  const [clickType, setClickType] = useState(CLICK_TYPE.unread); // 預設unread
  const [loading, setLoading] = useState(false);
  const [unreadMessage, setUnreadMessage] = useState([]);
  const [readMessage, setReadMessage] = useState([]);
  let saveDate = ''; // for compare
  const getUnreadCountQuery = useQuery(NotifyApi.getUnreadCount);
  const getUnreadMsg = useQuery(NotifyApi.getMessage);
  const changeMsgStatus = useQuery(NotifyApi.changeMessageStatus);
  const setReadAll = useQuery(NotifyApi.setReadAll);

  const getCount = async () => {
    const result = await getUnreadCountQuery.exec();
    if (result.result !== false && result.result !== true) setCount(result.result);
  };

  const getUnreadMessage = async () => {
    try {
      const req = {
        status: 0,
      };
      const result = await getUnreadMsg.exec(req);
      setUnreadMessage(result.results);
    } catch (e) {
      console.log(e);
    }
  };

  const getReadMessage = async () => {
    try {
      const req = {
        status: 1,
      };
      const result = await getUnreadMsg.exec(req);
      setReadMessage(result.results);
    } catch (e) {
      console.log(e);
    }
  };

  const updateList = () => {
    setLoading(true);
    getUnreadMessage();
    getReadMessage();
    setLoading(false);
  };

  const markAllAsRead = async () => {
    const result = await setReadAll.exec();
    // update Count
    if (result.result !== false && result.result !== true) {
      setCount(result.result);
      message.success('Mark all as read successfully!');
      updateList();
    }
  };

  useEffect(() => {
    getCount();
    setBellBarClick(true);
    if (bellClick === false) {
        setBellClick(true);
        updateList();
        setBellBarClick(false);
    }
  }, []);

  const changeStatus = async data => {
    try {
      const req = {
        seqId: data.seqId,
        status: data.isReaded === 0 ? 1 : 0,
      };
      const result = await changeMsgStatus.exec(req);
      // update Count
      if (result.result !== false && result.result !== true) {
        setCount(result.result);
        setBellClick(false);
      }
      updateList();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (bellBarClick === true && bellClick === false) {
      setBellClick(true);
      updateList();
      setBellBarClick(false);
    }
  }, [bellBarClick])

  const handleUnread = () => {
    setClickType(CLICK_TYPE.unread);
  };

  const handleRead = () => {
    setClickType(CLICK_TYPE.read);
  };

  const handleMark = (row, e) => {
    changeStatus(row);
    e.stopPropagation();
  };

  const handleMarkAll = () => {
    if (count !== 0) {
      markAllAsRead();
    } else {
      message.warning('There is no data to mark!');
    }
  };

  const compareDate = nowDate => {
    if (saveDate === '' || saveDate !== nowDate) {
      saveDate = nowDate;
      return nowDate;
    }
    return <div style={{ margin: '18px' }} />;
  };

  return (
    <Style.TopBell>
      <div style={{ fontSize: "20px", margin: '20px' }}>Notifications</div>
      <div style={{ display: 'flex', width: '300px', margin: '5px' }}>
        <Button
          type="text"
          onClick={() => handleUnread()}
          className="bell-btn"
          style={
            clickType === CLICK_TYPE.unread
              ? {border: '0px', color: '#1A85A0', borderBottom: '2.5px solid #1A85A0' }
              : {border: '0px'}
          }
        >
          UnRead
        </Button>
        <Button
          type="text"
          onClick={() => handleRead()}
          className="bell-btn"
          style={
            clickType === CLICK_TYPE.read
              ? { border: '0px', color: '#1A85A0', borderBottom: '2.5px solid #1A85A0' }
              : {border: '0px'}
          }
        >
          Read
        </Button>
      </div>
      <div style={{ margin: '10px' }}>
        <div className="bell-markread">
          <div>Date</div>
          {clickType === CLICK_TYPE.unread ? (
            <Button
              className="mark-btn"
              style={{border: '0px'}}
              type="text"
              onClick={() => handleMarkAll()}
            >
              Mark all as read
            </Button>
          ) : null}
        </div>
        <div
          style={{
            maxHeight: '60vh',
            overflow: 'auto',
          }} // 高度自動,超過螢幕的60％就scroll
        >
          <List
            loading={loading}
            itemLayout="vertical"
            dataSource={
              clickType === CLICK_TYPE.unread ? unreadMessage : readMessage
            }
            renderItem={item => (
              <List.Item style={{ display: 'flex', alignContent: 'center' }}>
                <div style={{ display: 'flex', alignContent: 'center' }}>
                  <div className="bell-msg-date">
                    {compareDate(timestampToTime(item.createAt))}
                  </div>
                  <div className="bell-msg-title">{item.message}</div>
                </div>
                <Button
                  size="small"
                  title={
                    item.isReaded === 0 ? 'mark as read' : 'mark as unread'
                  }
                  className="read-circle-btn"
                  style={{
                    borderRadius: '50%',
                    height: '16px',
                    background: item.isReaded === 0 ? '#3e86a0' : '#e6e6e6', // 未讀：藍色點點
                  }}
                  onClick={e => handleMark(item, e)}
                >
                  {' '}
                </Button>
              </List.Item>
            )}
          />
        </div>
      </div>
    </Style.TopBell>
  );
};

BellMenu.propTypes = {};

BellMenu.defaultProps = {};

export default BellMenu;
