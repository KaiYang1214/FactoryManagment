import styled from "styled-components";
import { Menu, Button } from "antd";

export const Container = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
  display: flex;
  align-items: center;
  background-color: #fff;
  opacity: 1;
  padding: 0 16px;
`;

export const Logo = styled.img`
  width: 126px;
  margin-right: 16px;
`;

export const TopMenu = styled(Menu)`
  &.ant-menu {
    display: flex;
    border: none;
  }
  &.ant-menu-horizontal > .ant-menu-submenu-active {
    color: #323232 !important;
    background: #e9f6f9;
    border-bottom: none !important;
  }
  &.ant-menu-horizontal > .ant-menu-submenu-selected {
    color: #323232; 
    border-bottom: none;
}
`;

export const TopSubMenu = styled(Menu.SubMenu)`
  color: #323232;
  &.ant-menu-submenu-active,
  &.ant-menu-submenu-open {
    color: #323232 !important;
    background: #e9f6f9;
    border-bottom: none !important;
  }
`;

export const TopMenuLi = styled(Menu.Item)`
  img {
    margin-right: 6px;
  }
  &.ant-menu-item-selected {
    background-color: #e9f6f9;
    :hover {
      background-color: #e9f6f9;
    }
  }
  &.ant-menu-item-selected::after {
    border: none;
  }
`;

export const TopBarRight = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

export const IconBox = styled(Button)`
  &.ant-btn {
    width: 40px;
    height: 40px;
    background-color: #4d4d4d;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
  }
  &.ant-btn:hover {
    background-color: rgba(255, 255, 255, 0.07);
    border: none;
  }

  & .ant-btn:active {
    background-color: rgba(255, 255, 255, 0.07);
    border: none;
  }
`;

export const MenuIcon = styled.div`
display: flex;
align-items: center;
font-size: 15px;
`;

export const TopBell = styled.div`
  .bell-btn{
      background:#ffffff;
  }
  .bell-btn:hover{
      background:#ffffff;
      color: #1A85A0;
  }
.bell-markread{
  display: flex;
  justify-content: space-between;
  color: #c5c5c5;
  font-size: 13px;
  align-items: center;
  margin: 5px;
  .mark-btn{
    color: #c5c5c5;
    font-size: 13px;
    background:#ffffff;
    width: 39%;
  }
  .mark-btn:hover{
    color: #1A85A0;
    background:#ffffff;
  }
}
.bell-msg-date{
  color: #828282;
  margin-right: 5px;
}
.bell-msg-title{
  color: #323232;
}
.bell-msg-description{
  color: #828282;
}
.read-circle-btn{
  height: 16px;
  font-size: 12px;
  border-radius: 50%;
  text-align: center;
  float: right;
  margin-left: 5px;
}
.read-circle-btn:hover{
  cursor: pointer;
}
`;
