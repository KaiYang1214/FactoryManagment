/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Menu } from "antd";
import { Sider } from "@/components/Layout";
import { CATEGORY, MENU_CATEGORY, REQUEST_STATUS } from "@/utils/const";

import bulbAct from "@/static/images/SideMenu/SummaryReport_act.svg";
import bulb from "@/static/images/SideMenu/SummaryReport.svg";
import infoAct from "@/static/images/SideMenu/ProjectInfo_act.svg";
import info from "@/static/images/SideMenu/ProjectInfo.svg";
import penAct from "@/static/images/SideMenu/pen_act.svg";
import pen from "@/static/images/SideMenu/pen.svg";
import itemAct from "@/static/images/SideMenu/Testitem_act.svg";
import item from "@/static/images/SideMenu/Testitem.svg";

import MenuGroup from "./menu.json";
import * as Style from "./style";

const SideMenu = (props) => {
  const { t } = useTranslation();
  const {
    history,
    match,
    path,
    status,
    pcbNo,
    pcbVersion,
    projectCode,
    showRfSkuBox,
    showProjectCodeBox,
    rfSku,
  } = props;
  const [selected, setSelected] = useState(MENU_CATEGORY.Summary);
  const [showMenuType, sethowMenuType] = useState(MenuGroup.type2);

  const defaultSelected = () => {
    let tempSelect = MENU_CATEGORY.Summary;
    tempSelect = history.location.pathname.indexOf(MENU_CATEGORY.Summary) !== -1 ? MENU_CATEGORY.Summary : tempSelect;
    tempSelect = history.location.pathname.indexOf(MENU_CATEGORY.ProjectInfo) !== -1 ? MENU_CATEGORY.ProjectInfo : tempSelect;
    tempSelect = history.location.pathname.indexOf(MENU_CATEGORY.ProjectInfoCreate) !== -1 ? MENU_CATEGORY.RequestForm : tempSelect;
    tempSelect = history.location.pathname.indexOf(MENU_CATEGORY.TestItem) !== -1 ? MENU_CATEGORY.TestItem : tempSelect;
    setSelected(tempSelect);
  };

  const handleMenuType = () => {
    if (status === REQUEST_STATUS.Open) {
      sethowMenuType(MenuGroup.type1);
    } else if (!status || status === REQUEST_STATUS.WaitApprove) {
      sethowMenuType(MenuGroup.type2);
    } else {
      sethowMenuType(MenuGroup.type3);
    }
  };

  useEffect(() => {
    handleMenuType();
  }, [status]);

  useEffect(() => {
    defaultSelected();
  }, []);

  const select = (e) => {
    history.push(`${path}/${e.key}/${match.params.uuid}`);
    setSelected(e.key);
  };

  const renderIcon = (iconName) => {
    switch (iconName) {
      case CATEGORY.RequestForm:
        return <img src={bulbAct} alt="icon" />;
      case CATEGORY.Summary:
        return selected === MENU_CATEGORY.Summary
          ? <img src={infoAct} alt="icon" />
          : <img src={info} alt="icon" />;
      case CATEGORY.ProjectInfo:
        return selected === MENU_CATEGORY.ProjectInfo
          ? <img src={penAct} alt="icon" />
          : <img src={pen} alt="icon" />;
      case CATEGORY.TestItem:
        return selected === MENU_CATEGORY.TestItem
          ? <img src={itemAct} alt="icon" />
          : <img src={item} alt="icon" />;
      default:
        return null;
    }
  };

  const renderMenuItem = showMenuType.map((i) => (
    <Style.SideMenuLi key={i.key} style={{ backgroundColor: "#333333" }}>
      {renderIcon(i.icon)}
      <span>{i.name}</span>
    </Style.SideMenuLi>
  ));

  return (
    <Sider
      width={240}
    >
      <Style.PCBNoBox>
        <div>
          <span>PCB No. {pcbNo}</span>
          <br />
          <span>Version. {pcbVersion}</span>
        </div>
      </Style.PCBNoBox>

      {showProjectCodeBox ? (
        <Style.PCBNoBox>
          <div>
            <span
              style={{ fontSize: "14px", opacity: "0.65" }}
            >
              Project Code
            </span>
            <br />
            <span>
              {projectCode}
            </span>
          </div>
        </Style.PCBNoBox>
      ) : null}

      {showRfSkuBox ? (
        <Style.PCBNoBox>
          <div>
            <span
              style={{ fontSize: "14px", opacity: "0.65" }}
            >
              RF SKU
            </span>
            <br />
            <span>
              {rfSku}
            </span>
          </div>
        </Style.PCBNoBox>
      ) : null}

      <Style.MenuContainer>
        <Menu
          mode="inline"
          selectedKeys={[selected]}
          style={{ color: "#FFF" }}
          onClick={select}
        >
          {renderMenuItem}
        </Menu>
      </Style.MenuContainer>
    </Sider>
  );
};

SideMenu.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  showProjectCodeBox: PropTypes.bool,
  showRfSkuBox: PropTypes.bool,
  projectCode: PropTypes.string,
  pcbNo: PropTypes.string,
  pcbVersion: PropTypes.string,
  rfSku: PropTypes.string,
};

SideMenu.defaultProps = {
  showProjectCodeBox: false,
  showRfSkuBox: false,
  projectCode: "",
  pcbNo: "",
  pcbVersion: "",
  rfSku: "",
};

export default withRouter(SideMenu);
