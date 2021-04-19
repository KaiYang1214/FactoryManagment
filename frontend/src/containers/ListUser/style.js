import styled from 'styled-components';
import { Table, Input, Pagination } from "antd";
import { Button } from "@/components/atoms";

export const Body = styled.div`
  background-color: #EBEBEB;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: hidden;
`;

export const Icon = styled.div`
  margin: 0px;
  width: 20px;
  height: 20px;
  cursor: ${(props) => (!props.disable ? "pointer" : "")};
`;

export const Container = styled.div`
  width: 100%;
  padding: 0 10px;
  background: #ebebeb;
  height: 100vh;
  overflow: auto;
`;

export const TableContent = styled(Table)`
  .ant-table-thead {
    tr > th {
      background: #fff;
      color: #333333;
      font-size: 14px;
      font-family: Arial;
      font-weight: normal;
      border-right: 0;
      padding: 6px 20px 6px 25px;
      line-height: initial;
      opacity: 0.85;
    }
  }

  .ant-table-tbody {
    background-color: #ffffff;
    border-right: 0;
    font-size: 16px;
    padding-left: 25px;
    font-family: Arial;
  }

  .ant-table-tbody > tr > th {
    font-size: 16px;
    padding-left: 25px;
    font-family: Arial;
  }

  & td.ant-table-column-sort {
    background: none;
  }

  & .ant-table-column-sorters {
    padding: 0px;
  }
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AddButton = styled(Button)`
  color: 417adb;
  font-size: 16px;
  border-radius: 4px;
  background: #ffffff;
  color:#417adb;
  border:1px solid #417adb;
  display: flex;
  align-items: center;
  justify-content: center;

  &.ant-btn:hover {
    color: #449AFC;
    border:1px solid #449AFC;
  }

  &.ant-btn:focus {
    color: #417adb;
    border:1px solid #417adb;
  }
`;


export const PJSearch = styled(Input.Search)`
  border: 1px solid #b9b9b9;
  border-radius: 4px;
  line-height: 21px;
  input::placeholder {
    color: #333333;
    opacity: 0.45;
    font-size: 16px;
  }

  .ant-input {
    background-color: #efeff4;
    color: #333333;
    text-align: left;
    font-size: 16px;
    font-family: Arial;
    letter-spacing: 0px;

    :hover {
      background: #DADAE0
    }
  }

  &.ant-input-search {
    background-color: #efeff4;
    width: 33%;
    min-width: 300px;
    max-width: 410px;
    height: 38px;

    :hover {
      background-color: #DADAE0;

      .ant-input {
        background-color: #DADAE0;
      }
    }
  }

  .ant-input-search-icon {
    color: #000;
    font-size: 16px;
  }

  .ant-input-search-icon::before {
    border-left: none;
  }

  &.ant-input-affix-wrapper.ant-input-affix-wrapper {
    border: none;
  }

  &.ant-input-affix-wrapper.ant-input-affix-wrapper-focused {
    background-color: #fff;
    outline: none !important;
    border-color: #449AFC;
    -webkit-box-shadow: 0 0 0 2px #449AFC;
    box-shadow: 0 0 0 2px #449AFC;

    .anticon {
      color: #449AFC !important;
    }

    .ant-input {
      background-color: #fff;
    }
  }

  .ant-input-search-icon {
    display: none;
  }
`;

export const SearchContainer = styled.div`
  width: 100%;
  padding: 25px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const TablePagination = styled(Pagination)`
  display: flex;
  justify-content: flex-end;
  &.ant-pagination {
    margin: 10px;
  }
`;

export const LoadingContainer = styled.div`
  background: ${(props) => props.background};
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20000;
  display: flex;
  align-items: ${(props) => props.position};
  justify-content: center;
  user-select: none;
`;

export const MainTitle = styled.div`
  font-size: 35px;
  font-weight: bold;
  color: #333333;
  padding: 10px;
`;
