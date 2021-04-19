import styled from "styled-components";
import Button from "../Button";

export const SearchButton = styled(Button)`
  &.ant-btn {
    width: 80px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff !important;
    border: none !important;
    color: #3177d8 !important;
    border-radius: 4px;
  }

  &.ant-btn:disabled {
    opacity: 0.4;
  }

  &.ant-btn:hover {
    background-color: #fff !important;
    border: none !important;
    color: #449afc !important;
  }

  &.ant-btn:active {
    background-color: #fff !important;
    border: none !important;
    color: #3177d8 !important;
  }
`;
