import styled from 'styled-components';
import Button from '../Button';

export const SearchButton = styled(Button)`
  &.ant-btn {
    padding: 5px 12px;
    background-color: #417ADB;
    min-width: 104px;
    height: 38px;
    border-radius: 4px;
    color: #FFF;
    border: 1px solid #417ADB;
  }

  &.ant-btn:disabled {
    background: #F5F5F5;
    color: rgba(0,0,0,0.25);
    border: 1px solid #D9D9D9;
    :hover {
      background: #F5F5F5;
      color: rgba(0,0,0,0.25);
      border: 1px solid #D9D9D9;
    }
  }

  &.ant-btn:hover {
    background-color: #449AFC;
    color: #FFF;
    border: 1px solid #449AFC;
  }

  &.ant-btn:focus {
    background-color: #417ADB;
    color: #FFF;
    border: 1px solid #417ADB;
  }

  &.ant-btn:active  {
    background-color: #417ADB;
    color: #FFF;
    border: 1px solid #417ADB;
  }
`;
