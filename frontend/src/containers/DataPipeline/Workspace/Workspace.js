import React, { useState, useEffect, useContext } from 'react';
import { Result } from 'antd';
import { DesktopOutlined } from '@ant-design/icons';
import { useQuery } from '@/hooks';
import { UserApi } from '@/apis';
import { PREVIEW_STATUS, GROUP_TYPE } from '@/constants/index';
import { getstoreUserInfo } from '@/utils/common';
import { AppContext } from "@/store/appStore";
import { 
  ETLList,
  ETLDetail,
  ETLShareDetail
} from './components';
import * as Style from '../style';

const Workspace = () => {
  const appStore = useContext(AppContext);
  const [curr, setCurr] = useState();
  const [shareCurr, setShareCurr] = useState();
  const [update, setUpdate] = useState(0);
  const [updateShare, setUpdateShare] = useState(0);
  const [groupList, setGroupList] = useState([]);
  const [selfGroupObject, setSelfGroupObject] = useState({});
  const getGroupsQuery = useQuery(UserApi.getGroups);
  const userInfo = getstoreUserInfo();

  const forceUpdate = () => {
    let nextUpdate = update;
    setUpdate((nextUpdate += 1));
  };

  const forceUpdateShare = () => {
    let nextUpdate = updateShare;
    setUpdateShare((nextUpdate += 1));
  };

  const updateCurr = newCurr => {
    setShareCurr();
    setCurr(newCurr);
  };

  const updateShareCurr = newShareCurr => {
    setCurr();
    setShareCurr(newShareCurr);
  };

  const getGroups = async () => {
    try {
      const result = await getGroupsQuery.exec({
        page: 1,
        pageSize: 9999,
        status: PREVIEW_STATUS.ALLOWED.value,
      });
      setGroupList(result);
      const selfDefaultGroup = result.groupListData.find(
        group =>
          group.groupType === GROUP_TYPE.DEFAULT &&
          group.owner.toLowerCase() === userInfo.emplId.toLowerCase(),
      );
      setSelfGroupObject(selfDefaultGroup);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <Style.workspaceContainer>
      <ETLList
        curr={curr}
        setCurr={updateCurr}
        setShareCurr={updateShareCurr}
        update={update}
        updateShare={updateShare}
      />
      {curr && (
        <ETLDetail
          curr={curr}
          setCurr={updateCurr}
          forceUpdate={forceUpdate}
          forceUpdateShare={forceUpdateShare}
          user={userInfo}
        />
      )}
      {shareCurr && (
        <ETLShareDetail
          curr={shareCurr}
          setCurr={updateShareCurr}
          forceUpdate={forceUpdate}
          user={userInfo}
          groupList={groupList}
          selfGroupObject={selfGroupObject}
        />
      )}
      {!curr && !shareCurr && (
        <Result
          style={{ flex: 1, paddingTop: 120 }}
          icon={<DesktopOutlined />}
          title="Welcome to Your Workspace!"
          subTitle="Choose a project to get started."
        />
      )}
    </Style.workspaceContainer>
  );
};

Workspace.propTypes = {};

Workspace.defaultProps = {};

export default Workspace;
