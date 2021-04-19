import styled from 'styled-components';
import { Input } from 'antd';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Block = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
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

export const PJSearch = styled(Input.Search)`
  border: 1px solid #b9b9b9;
  border-radius: 4px;
  width:100%;
  height:40px;
  line-height:21px;
  input::placeholder {
    color: #333333;
    opacity: 0.45;
    font-size:16px;
  }

  .ant-input{
    background-color:#EFEFF4;
    color:#333333;
    text-align: left;
    font-size: 16px;
    font-family: Arial;
    letter-spacing: 0px;

    :hover {
      background: #DADAE0
    }
  }

  &.ant-input-search{
    background-color:#EFEFF4;

    :hover {
      background-color: #DADAE0;

      .ant-input {
        background-color: #DADAE0;
      }
    }
  }

  .ant-input-search-icon{
    color:#000;
    font-size:16px;
  }

  .ant-input-search-icon::before{
    border-left:none;
  }

  &.ant-input-affix-wrapper.ant-input-affix-wrapper {
    border: none;
  }

  .ant-input-search-icon{
    display: none;
  }
`;

export const PJSearchContainer = styled.div`
  padding:3px 0;
  background-color:#EFEFF4;
  border-radius: 4px;
  width: 100%;
`;
