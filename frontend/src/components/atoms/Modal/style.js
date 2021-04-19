import styled from "styled-components";
import { Modal } from "antd";

export const ModalComp = styled(Modal)`
  z-index: 1040;
  border-radius: 4px 4px 0px 0px;
  .ant-modal-header {
    height: 48px;
    background-color: #3e4042;
    display: flex;
    align-items: center;
  }
  .ant-modal-title {
    color: #fff;
  }
  .ant-modal-close-x {
    width: 16px;
    height: 16px;
    color: #fff;
    display: flex;
    align-items: center;
    position: absolute;
    top: 16px;
    right: 22px;
  }
  .ant-modal-body {
    padding: 0;
  }
  .ant-modal-footer {
    box-shadow: 0px -2px 5px 2px #8080801a;
  }
  .ant-btn {
    width: 116px;
    height: 38px;
    color: #3177d8;
    border: 1px solid #3177d8;
    border-radius: 4px;

    :hover {
      border: 1px solid #449AFC;
      color: #449AFC;
    }
  }
  .ant-btn-primary {
    min-width: 104px;
    background-color: #417adb;
    color: #ffffff;

    :hover {
      background-color: #449AFC;
      color: #ffffff;
    }
  }
`;
