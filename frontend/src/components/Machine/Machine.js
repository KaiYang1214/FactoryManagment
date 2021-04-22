/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Menu, Button, Dropdown, Tabs } from 'antd';
import {
  DesktopOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
 } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import DetailModal from "../compos/DetailModal/DetailModal.js"
import { useModal } from '../../hooks';
import * as Style from "./style";

const Machine = ({ data }) => {
  const { t } = useTranslation();
  const detailModal = useModal();
  return (
    <>
      <Style.Block>
        <DesktopOutlined
          onClick={data.status ? () => {} : () => detailModal.openModal(data)}
          style={{
        fontSize: 40,
        margin: 10
      }}
      />
        <div style={{
        display: 'flex',
        alignItems: 'center'
      }}> <div>{data.name}</div>
          {
         data.status ? <CheckCircleOutlined style={{color: '#90B44B', marginLeft: 5}} /> :
         <CloseCircleOutlined style={{color: '#D0104C', marginLeft: 5}} />
       }
          {/* <CloseCircleOutlined style={{color: '#D0104C', marginLeft: 5}} /> */}
        </div>
      </Style.Block>
      <DetailModal
        modal={detailModal}
        // handleOK={handleOK}
      />
    </>
  );
};

export default Machine;
