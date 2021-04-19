/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Spin } from 'antd'
import * as Style from "./style";

const CommonModal = ({ children, loadingData = false, ...props }) => (
  <Style.ModalComp maskClosable={false} {...props}>
    <Spin spinning={loadingData}>
      {children}
    </Spin>
  </Style.ModalComp>
);

export default CommonModal;
