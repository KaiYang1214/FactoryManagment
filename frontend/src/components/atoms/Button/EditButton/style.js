import styled from 'styled-components';
import Button from '../Button';

export const SearchButton = styled(Button)`
  &.ant-btn {
    height: 17px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFF !important;
    border: none !important;
    color: #3177D8 !important;
    border-radius: 4px;
    font-size: 16px;
    font-family: Arial;
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
    background-color: #FFF !important;
    border: none !important;
    color: #3177D8 !important;
  }

  &.ant-btn:focus {
    background-color: #FFF !important;
    border: none !important;
    color: #3177D8 !important;
  }

  &.ant-btn:active  {
    background-color: #FFF !important;
    border: none !important;
    color: #3177D8 !important;
  }
`;
