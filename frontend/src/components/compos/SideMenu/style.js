import styled from "styled-components";
import { Menu } from "antd";

export const PCBNoBox = styled.div`
  width: 240px;
  height: 76px;
  background-color: #292929;
  div {
    color: #fff;
    padding: 16px;
    font: normal normal bold 18px/24px Arial;
  }
`;

export const MenuContainer = styled.div`
  width: 240px;
`;

export const SideMenuLi = styled(Menu.Item)`
  &.ant-menu-item {
    line-height: 54px !important;
    border-left: 4px solid #333333;
    width: 240px;
    height: 54px !important;
    background-color: #333333;
    padding: 0;
    margin: 0 !important;
  }

  &.ant-menu-item-selected {
    border-left: 4px solid #f5c910;
  }

  span{
    margin-left: 4px;
  }
`;
