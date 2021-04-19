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
    opacity: 0.4;
   
  }

  &.ant-btn:hover {
    background: #449AFC;
    border: 1px solid #449AFC;
  }


  &.ant-btn:active  {
    background-color: #417ADB;
    color: #FFF;
    border: 1px solid #417ADB;
  }
`;
