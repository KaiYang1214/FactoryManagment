import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import {
  MessageOutlined
 } from "@ant-design/icons";
import * as Style from "./style";

const DetailModal = ({ modal, handleOK }) => {

  console.log('DetailModal', modal);

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
          <Style.Block>Send an alert message !! <MessageOutlined style={{marginLeft: 30, fontSize: 20, color: '#7BA23F'}} /></Style.Block>

        </>
      }
    </Modal>
  );
};

DetailModal.propTypes = {
  modal: PropTypes.shape({
    visible: PropTypes.bool,
    closeModal: PropTypes.func,
    modalData: PropTypes.shape({
      name: PropTypes.string,
      columns: PropTypes.arrayOf(PropTypes.object),
    }),
  }).isRequired,
};

DetailModal.defaultProps = {};

export default DetailModal;
