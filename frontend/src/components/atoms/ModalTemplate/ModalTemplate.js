import { Modal } from 'antd';
import styled from 'styled-components';

const ModalTemplate = styled(Modal)`
  .ant-modal {
    padding: 0;
  }

  .ant-modal-content {
    border-radius: 10px;
    overflow: hidden;
    background-color: transparent;
  }

  .ant-modal-header {
    background: #333333;
    height: 57px;
    padding-top: 19px;
    padding-left: 16px;
  }

  .ant-modal-title {
    color: white;
    font-size: 16px;
    font-family: Segoe UI;
    font-weight: bold;
    text-align: left;
  }

  .ant-modal-body {
    height: ${(props) => (props.height ? props.height - 141 : 415)}px;
    background: #FFFFFF;
    overflow-y: auto;
  }

  .ant-modal-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 84px;
    padding: 24px;
    background: #FFFFFF;
    border-top: 0.5px solid #000000;
  }

  .anticon {
    color: white;
  }

  .ant-modal-close {
    top: 10px;
    right: 10px;
  }

  .ant-modal-close-x {
    width: 20px;
    height: 20px;
    font-size: 16px;
    line-height: 16px;
  }
`;

export default ModalTemplate;
