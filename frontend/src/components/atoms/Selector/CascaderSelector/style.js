import styled from 'styled-components';
import { Cascader } from 'antd';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-family: Arial;
  font-weight: bold;
  letter-spacing: 0px;
`;

export const Asterisk = styled(Title)`
  color: #FF475F;
`;

export const ErrorCascader = styled(Cascader)`
  &.ant-cascader-picker {
    width: 417px;
    height: 38px;
    background-color: #efeff4;
    border-radius: 4px;
    display: flex;
    align-items: center;
  }
  input {
    font-size: 16px;
    color: #333333;
  }
  svg{
    color: #333333;
  }
`;
