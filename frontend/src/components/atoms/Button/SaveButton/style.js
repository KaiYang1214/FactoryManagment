import styled from "styled-components";
import Button from "../Button";

export const SearchButton = styled(Button)`
  &.ant-btn {
    width: 80px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background-color: #417adb !important;
    border: 1px solid #417adb !important;
    color: #fff !important;
  }

  &.ant-btn:disabled {
    opacity: 0.4;
  }

  &.ant-btn:hover {
    background-color: #449afc !important;
    color: #fff !important;
    border: 1px solid #449afc !important;
  }

  &.ant-btn:focus {
    background-color: #417adb !important;
    color: #fff !important;
    border: 1px solid #417adb !important;
  }

  &.ant-btn:active {
    background-color: #417adb !important;
    color: #fff !important;
    border: 1px solid #417adb !important;
  }
`;
