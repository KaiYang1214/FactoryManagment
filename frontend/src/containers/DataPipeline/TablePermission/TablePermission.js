import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { getstoreUserInfo } from "@/utils/common";
import { RoleApi } from '@/apis/';
import { PREVIEW_STATUS, ROLE_TYPE, SYSTEM_TYPE } from '@/constants/index';
import { TableList, CustomTableList, DeliverZoneList } from './components';
import './TablePermission.less';
import * as Style from "./style";

const TAB_KEY = {
  GRANT_PERMISSION: 'GRANT_PERMISSION',
  APPLICATION_RECORD: 'APPLICATION_RECORD',
};

const { TabPane } = Tabs;

const TablePermission = () => {
  const [currTab, setCurrTab] = useState(TAB_KEY.GRANT_PERMISSION);
  const [roles, setRoles] = useState([]);
  const userData = getstoreUserInfo();

  const getRoles = async () => {
    try {
      const result = await RoleApi.getRoles();
      setRoles(result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <>
      <div className="tablePermission">
        <Style.MainTitle>Table Permission</Style.MainTitle>
        <Tabs
          type="card"
          onChange={setCurrTab}
          activeKey={currTab}
          tabBarStyle={{ margin: 0 }}
        >
          <TabPane
            tab="Grant Permission"
            key={TAB_KEY.GRANT_PERMISSION}
            forceRender
          />
          <TabPane
            tab="Application Record"
            key={TAB_KEY.APPLICATION_RECORD}
            forceRender
          />

        </Tabs>
        {
          currTab === TAB_KEY.GRANT_PERMISSION ? (
            <div className="mainContainer">
              <TableList
                allowed={PREVIEW_STATUS.APPLYING.value}
                hideData={['allowed']}
                tableType={[SYSTEM_TYPE.props.WisDOM.key]}
                page="1"
                pageSize="9999"
              />
              {roles.includes(ROLE_TYPE.MASTER) ? (
                <CustomTableList
                  allowed={PREVIEW_STATUS.APPLYING.value}
                  hideData={['status']}
                  page="1"
                  pageSize="9999"
                />
              ) : null}
              <DeliverZoneList
                allowed={PREVIEW_STATUS.APPLYING.value}
                tableType={[SYSTEM_TYPE.props.WDC.key]}
                page="1"
                pageSize="9999"
              />
            </div>
          )
            : null
        }
        {
          currTab === TAB_KEY.APPLICATION_RECORD ? (
            <div className="mainContainer">
              <TableList
                userId={userData.emplId}
                showDetail={false}
                tableType={[SYSTEM_TYPE.props.WisDOM.key]}
                page="1"
                pageSize="9999"
              />
              {roles.includes(ROLE_TYPE.MASTER) ? (
                <CustomTableList
                  userId={userData.emplId}
                  showDetail={false}
                  page="1"
                  pageSize="9999"
                />
              ) : null}
              <DeliverZoneList
                userId={userData.emplId}
                showDetail={false} // record不可以按
                tableType={[SYSTEM_TYPE.props.WDC.key]}
                page="1"
                pageSize="9999"
              />
            </div>
          )
            : null
        }
      </div>
    </>
  );
};

export default TablePermission;
