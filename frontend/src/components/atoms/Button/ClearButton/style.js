import styled from 'styled-components';
import Button from '../Button';

export const ClearButton = styled(Button)`
  padding: 5px 12px;
  margin-right: 14px;
  min-width: 104px;
  color: #417ADB;

  &.ant-btn {
    padding: 5px 16px;
    background-color: #fff;
    width: 116px;
    height: 38px;
    border-radius: 4px;
    color: #3177D8;
    border: 1px solid #3177D8;
  }

  &.ant-btn:hover {
    color: #449AFC !important;
    border: 1px solid #449AFC !important;
  }
`;
