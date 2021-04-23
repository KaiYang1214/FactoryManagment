/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Menu, Button, Dropdown, Tabs } from 'antd';
import {
  FundProjectionScreenOutlined
 } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import Machine from "../Machine";
import * as Style from "./style";

const { SubMenu } = Menu;

const { TabPane } = Tabs;

const Plant = ({ plantData }) => {
  const { t } = useTranslation();

  return (
    <Style.Block>
      <Style.Plant>
        <FundProjectionScreenOutlined style={{
          fontSize: '25px',
          marginBottom: '10px'
        }} />
        <p>{plantData.plant}</p>
      </Style.Plant>
      <div style={{display: 'flex'}}>
        {
          plantData.stationList.map((station) => (<Machine plant={plantData.plant} data={station} />))
        }
      </div>
    </Style.Block>
  );
};

export default Plant;
