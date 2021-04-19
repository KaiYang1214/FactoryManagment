import styled from 'styled-components';
import { Select } from 'antd';

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

export const AdvancedSearch = styled(Select)`
  width: 100%;
  min-height: 38px;
  background-color: #EFEFF4;
  border-radius: 4px;

  &.ant-select-multiple .ant-select-selection-item {
    border: 1px solid #707070;
    border-radius: 4px;
    background: #FFF;
    font-size: 14px;
    font-family: Helvetica Neue;
    color: #707070;
  }

  &.ant-select-item-option-selected:not(.ant-select-item-option-disabled){
    background-color: #449AFC;
  }

  .ant-select-dropdown-menu-item-group-title {
    font-size: 30px;
  }

  .ant-select-selection-placeholder {
    color: #333333;
    font-size:16px;
    line-height:21px;
    opacity: 0.45;
    margin-left:5px;
  }

  &.ant-select-multiple .ant-select-selector {
    border: none;
    border-radius: 4px;
    background-color: #EFEFF4;
    min-height: 38px;
    padding: 6px;

    :hover {
      background-color: #DADAE0;
    }
  }

  .ant-input-search-icon {
    display: none;
  }

  .ant-select-item {
    font-size: 16px;
    color: #333333;
  }

  .ant-select-arrow {
    margin-right: 20px;
    font-size: 14px;
    color: #333333;
    display: flex;
    align-items: center;
  }
`;
