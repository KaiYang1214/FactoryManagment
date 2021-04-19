import styled from "styled-components";
import Button from "../Button";

export const SearchButton = styled(Button)`
  &.ant-btn {
    padding: 5px 12px;
    background-color: #417adb;
    min-width: 104px;
    height: 38px;
    border-radius: 4px;
    color: #fff;
    border: 1px solid #417adb;
  }

  &.ant-btn:disabled {
    opacity: 0.4;
  }

  &.ant-btn:hover {
    background-color: #449afc;
    color: #fff;
    border: 1px solid #449afc;
  }

  &.ant-btn:active {
    background-color: #417adb;
    color: #fff;
    border: 1px solid #417adb;
  }
`;
