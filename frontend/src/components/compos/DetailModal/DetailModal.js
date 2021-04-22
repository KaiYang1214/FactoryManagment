import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Modal } from 'antd';
import {
  MessageOutlined
 } from "@ant-design/icons";
import { LineApi } from '../../../apis';
import * as Style from "./style";

const DetailModal = ({ modal, handleOK }) => {

  console.log('DetailModal', modal);

  const postLineMsg = async (data) => {
    const message = `${data.name} have problem, ${data.reason}`
    try {
      const result = await LineApi.postNotify(message);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      title="Station Detail"
      visible={modal.visible}
      onOk={handleOK}
      onCancel={() => modal.closeModal()}
      footer={null}
    >
      {
        modal.modalData &&
        <>
          <Style.Block>Station: {modal.modalData.name}</Style.Block>
          <Style.Block>Event Time: {modal.modalData.time}</Style.Block>
          <Style.Block>Reason: {modal.modalData.reason}</Style.Block>
          <Style.Block>Send an alert message !! <MessageOutlined style={{marginLeft: 30, fontSize: 20, color: '#7BA23F'}} onClick={() => postLineMsg(modal.modalData)} /></Style.Block>

        </>
      }
    </Modal>
  );
};

export default DetailModal;
