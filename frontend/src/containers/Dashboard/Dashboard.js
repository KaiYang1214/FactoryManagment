/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Menu, Button, Dropdown, Tabs } from 'antd';
import {
  SearchOutlined,
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
  TeamOutlined
 } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import Plant from "../../components/Plant"
import { FactoryData1, FactoryData2 } from "./fackData"
import * as Style from "./style";

const { TabPane } = Tabs;

const Dashboard = ({ history }) => {
  const { t } = useTranslation();
  const [tabKey, setTabKey] = useState("1");

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="2" icon={<SettingOutlined />}>
        Setting
      </Menu.Item>
    </Menu>
  );

  const onChangeTab = (activeKey) => {
    setTabKey(activeKey);
  };


  return (
    <Style.Container>
      <Style.MenuContainer>
        <div style={{
          fontSize: '20px',
          padding: '10px',
          color: 'white',
          background: '#787878',
        }}>Factory Managment
        </div>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Setting
          </Menu.Item>
        </Menu>
      </Style.MenuContainer>
      <Style.Content>
        <Style.TopBar>
          <Dropdown overlay={menu}>
            <TeamOutlined style={{fontSize: 25, color: "white", marginRight: 15}} />
          </Dropdown>
        </Style.TopBar>
        <Style.Block>
          <Tabs activeKey={tabKey} type="card" size="large" onChange={onChangeTab}>
            <TabPane tab="Factory 1st" key="1" />
            <TabPane tab="Factory 2nd" key="2" />
          </Tabs>
          {
            tabKey === "1" ?
              <>
                {
              FactoryData1.map(factory => <Plant plantData={factory} />)
            }
              </>
            : null
          }
          {
            tabKey === "2" ?
              <>
                {
              FactoryData2.map(factory => <Plant plantData={factory} />)
            }
              </> : null
          }
        </Style.Block>
      </Style.Content>
    </Style.Container>
  );
};

export default Dashboard;
