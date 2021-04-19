/* eslint-disable react/prop-types */
import React from 'react';
import styled from "styled-components";

export const ItemBlock = styled.div`
  background: #FFFFFF;
  border: 1px solid #B9B9B9;
  opacity: 1;
  padding: 24px;
`;

export const MainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MainTitle = styled.div`
  text-align: left;
  font-size: 24px;
  font-family: Arial;
  font-weight: bold;
  color: #333333;
  opacity: 1;
`;

export const Button = styled.button`
  padding: 5px 10px;
  background: transparent 0% 0% no-repeat padding-box;
  color: ${(props) => (props.theme === "dark" ? "#FFFFFF" : "#333333")};
  background-color: ${(props) => (props.theme === "dark" ? "#333333" : "#FFFFFF")};
  border: 1px solid;
  border-radius: 5px;
  font-size: 16px;
  font-family: Segoe UI;
  cursor: pointer;
`;

export const ContainerItem = styled.div`
  margin-top: ${(props) => (`${props.marginTop}px` || '0px')};
  padding: 12px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top: ${(props) => (props.noLightbar ? 'none' : '2px #F5C910 solid')};
  background-color: #FFF;
  position: relative;
`;

const SubtitleStyle = styled.div`
  display: flex;
  align-items: center;
  color: #333333;
  font-size: 14px;
  font-family: Arial;
  position: relative;
  opacity: ${(props) => (props.opacity || 1)};
`;

const Asterisk = styled(SubtitleStyle)`
  color: #FF475F;
  text-align: left;
  font-size: 24px;
  top: 4px;
  position: absolute;
  height: 24px;
`;

const ChildrenStyle = styled.div`
  padding-left: 14px;
`;

export const Subtitle = ({ children, required, style, opacity }) => (
  <SubtitleStyle opacity={opacity} style={style}>
    {required && <Asterisk>*</Asterisk>}
    {required ? <ChildrenStyle>{children}</ChildrenStyle> : children}
  </SubtitleStyle>
);

export const MediumTitle = styled.div`
  text-align: left;
  font-size: 20px;
  font-family: Arial;
  color: #333333;
`;

export const TextValue = styled.div`
  display: flex;
  text-align: left;
  font-size: 16px;
  font-family: Arial;
  color: ${(props) => (props.color === "blue" ? "#417ADB" : "#333333")};
  opacity: ${(props) => (props.opacity || 1)};
  font-weight: ${(props) => (props.fontWeight)}
`;

export const CaveatText = styled.div`
  text-align: left;
  font-size: 14px;
  font-family: Microsoft JhengHei;
  color: #FF475F;
`;

export const AllProjectContainer = styled.div`
  width: 100%;
  padding: 24px 32px;
  background: #ebebeb;
  /* min-height: 600px; */
  /* height: calc(100vh - 214px); */
  height: calc(100vh - 96px);
  overflow: auto;
`;

export const TabPaneTop = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 22px 0;
  padding: 24px;
  .dateBoxPicker {
    display: flex;
    align-items: center;
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: #449afc;
      border-color: #449afc;
    }
  }
  >span{
    margin-left: 100px;
  }
`;
