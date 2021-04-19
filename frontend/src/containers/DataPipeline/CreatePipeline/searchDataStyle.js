import styled from "styled-components";
import {
  Input,
  Divider,
  Button,
  Tag,
  message,
  Card,
  Avatar,
  List,
  Select,
  Tooltip,
  Badge,
  Modal,
} from "antd";

export const Container = styled.div`
  background-color: white;
  padding: 0 10px 40px 10px;
`;

export const MainTitle = styled.div`
  font-size: 35px;
  font-weight: bold;
  color: #333333;
  padding: 10px;
`;

export const SearchDataInput = styled(Input.Search)`
  &.ant-input-group-wrapper {
    .ant-btn-primary {
      color: #fff;
      background: #20a7c9;
      border-color: #20a7c9;
      text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
      box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
      line-height: 10px;
    }
  }
`;

export const Toolbar = styled.div`
  margin: 10px 0px;
  display: flex;
  align-items: center;
  div {
    margin-right: 10px;
  }
`;

export const ListTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ListTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ListText = styled.div`
  height: 50px;
  font-size: 16px;
  color: #000000a6;
  overflow: overlay;
  text-overflow: ellipsis;
  word-break: break-all;
`;

export const Hr = styled.hr`
  border-top: 1px solid #cfd8dc;
  margin: 15px 0;
`;

export const FixIcon = styled.div`
  position: fixed;
  right: 32px;
  bottom: 102px;
  cursor: pointer;
  display: flex;
  .fixIcon2 {
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333333;
    border: solid 1px rgba(160, 161, 167, 0.2);
    box-shadow: 0px 0px 6px 6px rgb(160 161 167 / 15%);
  }
`;

export const BadgeCircle = styled.div`
  color: white;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  font-size: 12px;
  display: inline-block;
  text-align: center;
  background-color: #3e86a0;
  position: absolute;
  z-index: 99;
  top: -5px;
  right: -5px;
`;

export const ListCard = styled(Card)`
  transition: all 0.1s 0.1s ease-in;
  border-radius: 10px;
  box-shadow: 0px 0px 6px 6px rgb(160 161 167 / 15%);
`;

export const ContainerBlock = styled.div`
  background-color: #fff;
  padding: 10px;
`;
