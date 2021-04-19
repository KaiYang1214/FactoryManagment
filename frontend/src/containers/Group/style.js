import styled from 'styled-components';
import { Modal } from 'antd';

export const Body = styled.div`
  background-color: #EBEBEB;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: hidden;
`;

export const groupManagement = styled.div`
  height: 100%;
  overflow: auto;
  .ant-pagination-item {
    a {
      color: rgb(32, 167, 201);
    }
  }
`;

export const toolBar = styled.div`
  text-align: right;
`;

export const styleModal = styled(Modal)`
  .ant-modal-footer {
    .ant-btn-primary {
      background: #20a7c9;
      border-color: #20a7c9;
    }
  }
`;

export const MainTitle = styled.div`
  font-size: 35px;
  font-weight: bold;
  color: #333333;
  padding: 10px;
`;
