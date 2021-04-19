import styled from 'styled-components';
import { DatePicker } from 'antd';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleBlock = styled.div`
  display: flex;
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

export const DateContainer = styled.div`
  width: 100%;
  position: relative;
  height: 38px;
`;

export const Picker = styled(DatePicker)`
  width: 100%;
  height: 38px;
  &.ant-picker {
    background-color: #EFEFF4;
    border-color: #EFEFF4;
    border-radius: 4px;
    border: none;

    :hover {
      background: #DADAE0;
    }
  }

  .ant-picker-separator {
    color: #333333
  }

  .ant-picker-focused.ant-picker-separator {
    color: #333333
  }

  .ant-picker-input > input {
    color: #333333
  }

  .ant-picker-input > span {
    margin-top: -5px;
  }

  .ant-picker-input > .ant-picker-clear {
    background: #DADAE0;
    margin-top: 0px;
  }

  .ant-picker-input svg {
    color: #000
  }

  .ant-picker-clear {
    color: #333333;
    background: #EFEFF4;
  }
  .anticon-close-circle {
    color: #333333
  }

  .ant-picker-active-bar {
    background: #333333;
  }

  .ant-picker-cell-inner {
    color: #333333;
    background: #EFEFF4;
  }
`;
