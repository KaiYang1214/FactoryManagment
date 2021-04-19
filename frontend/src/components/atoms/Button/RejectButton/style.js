import styled from "styled-components";
import Button from "../Button";

export const ButtonStyle = styled(Button)`
  &.ant-btn {
    padding: 5px 12px;
    background-color: #ff475f;
    min-width: 104px;
    height: 38px;
    border-radius: 4px;
    color: #fff;
    border: 1px solid #ff475f;
  }

  &.ant-btn:disabled {
    opacity: 0.4;
  }

  &.ant-btn:hover {
    background-color: #ff5d72;
    color: #fff;
    border: 1px solid #ff5d72;
  }

  &.ant-btn:active {
    background-color: #ff475f;
    color: #fff;
    border: 1px solid #ff475f;
  }
`;
export const Icon = styled.img`
  width: 28px;
  height: 28px;
`;
