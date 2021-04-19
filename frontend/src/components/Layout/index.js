import React from 'react';
import PropTypes from 'prop-types';
import { Layout as AntdLayout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import R360Logo from '@/static/images/logo.png';

const {
  Footer: AntdFooter,
  Header: AntdHeader,
  Content: AntdContent,
  Sider: AntdSider,
} = AntdLayout;

const FooterStyle = styled(AntdFooter)`
  &&&{
    font-size: 12px;
    color: rgba(0,0,0,0.55);
    height: 50px;
    padding: 0;
    text-align: center;
    line-height: 50px;
  }
`;

const HeaderStyle = styled(AntdHeader)`
  &&&{
    height: 64px;
    color: white;
    display: flex;
    padding: 0;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: calc(100vw - ${(props) => (props.collapsed === 'true' ? '80px' : '200px')});
    z-index: 100;
  }
`;

const ContentStyle = styled(AntdContent)`
  &&&{
    min-height: calc(100vh - 114px);
  }
`;

const SiderStyle = styled(AntdSider)`
  &&&{
    background-color: rgba(51, 51, 51, 1);
    overflow: auto;
    height: calc(100vh - 62px);
    position: absolute;
    left: 0;
  }
`;

const LayoutStyle = styled(AntdLayout)`

`;

const FoldIcon = styled(MenuFoldOutlined)`
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover{
    color: #ccc;
  }
`;

const FoldIconUn = styled(MenuUnfoldOutlined)`
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover{
    color: #ccc;
  }
`;

const HeaderImg = styled.img`
  height: 30px;
`;

export const Footer = () => (
  <FooterStyle style={{ padding: 0 }}>
    Copyright © 2019 Wistron All rights reserved
  </FooterStyle>
);

export const ProjectHeader = ({ showIcon, collapsed, toggleCollapse }) => (
  <HeaderStyle collapsed={collapsed.toString()}>
    {
      // eslint-disable-next-line no-nested-ternary
      showIcon
        ? (
          collapsed ? <FoldIconUn onClick={toggleCollapse} /> : <FoldIcon onClick={toggleCollapse} />
        )
        : (
          <HeaderImg src={R360Logo} alt="logo" />
        )
    }
  </HeaderStyle>
);

ProjectHeader.propTypes = {
  showIcon: PropTypes.bool,
  collapsed: PropTypes.bool,
  toggleCollapse: PropTypes.func,
};

ProjectHeader.defaultProps = {
  showIcon: true,
  collapsed: false,
  toggleCollapse: () => { },
};

export const Header = HeaderStyle;

export const Content = ContentStyle;

export const Sider = SiderStyle;

export const Layout = LayoutStyle;
