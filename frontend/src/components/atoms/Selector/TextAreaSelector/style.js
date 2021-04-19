import styled from 'styled-components';
import { Input } from 'antd';

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
  justify-content: space-between;
`;

export const Asterisk = styled(Title)`
  color: #FF475F;
`;

export const PJSearch = styled(Input.TextArea)`
  border: 1px solid #b9b9b9;
  border-radius: 4px;
  width: 100%;
  height: 120px;
  line-height:21px;
  resize:none;

  input::placeholder {
    color: #333333;
    opacity: 0.45;
    font-size:16px;
  }

  &.ant-input{
    width: 100%;
    height: 120px;
    background-color:#EFEFF4;
    color:#333333;
    text-align: left;
    font-size: 16px;
    font-family: Arial;
    letter-spacing: 0px;
    border: none;

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
`;
