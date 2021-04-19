/* eslint-disable react/prop-types */
/* eslint-disable no-irregular-whitespace */
import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import logo from "@/static/images/login/wisdom_logo.png";
import { QuestionCircleFilled, BellFilled } from '@ant-design/icons';
import PATH from "@/utils/path";
import { logoutAAD, getstoreUserInfo } from "@/utils/common";
import { TOPBAR_MENU } from "@/utils/const";
import { AppContext } from "@/store/appStore";
import { TAB_KEY } from "@/constants/index";
import AppConfig from '@/config/';
import { NotifyApi } from '@/apis/';
import { useQuery } from '@/hooks/';
import { Menu } from "antd";
import BellMenu from "./BellMenu";
import "antd/dist/antd.css";
import * as Style from "./style";

const TopBar = ({ path, history }) => {
  const appStore = useContext(AppContext);
  const { currTab, setCurrTab } = appStore;
  const fileUrl = `${AppConfig.operationUrl}?d=${new Date().valueOf()}`;
  const [bellClick, setBellClick] = useState(false); // show count
  const [count, setCount] = useState(0);
  const [bellBarClick, setBellBarClick] = useState(false);
  const { t } = useTranslation();
  const [selected, setSelected] = useState('');
  const userData = getstoreUserInfo();
  const getUnreadCountQuery = useQuery(NotifyApi.getUnreadCount);

  const logOut = async () => {
    logoutAAD();
  };

  const select = (e) => {
    if (e.key !== 'downloadOpt') {
      history.push(`${e.key}`);
    }
    setSelected(e.key);
  };

  const getUnreadCount = async () => {
    const result = await getUnreadCountQuery.exec();
    if (result.result !== false && result.result !== true) setCount(result.result);
  };

  useEffect(() => {
    getUnreadCount();
  }, []);

  const handleBellClick = () => {
    setBellBarClick(true);
  };

  return (
    <Style.Container>
      <Style.Logo src={logo} onClick={() => history.push(`${TOPBAR_MENU.CreatePipeline}`)} />
      <Style.TopMenu
        onClick={select}
        selectedKeys={[selected]}
        mode="horizontal"
      >
        <Style.TopSubMenu key={TOPBAR_MENU.DataPipeline} title={<span>{t("MENU.DATA_PIPELINE")}</span>}>
          <Style.TopMenuLi key={TOPBAR_MENU.CreatePipeline} onClick={() => setCurrTab(TAB_KEY.FIND_DATA)}>
            {t("MENU.CREATE_PIPELINE")}
          </Style.TopMenuLi>
          <Style.TopMenuLi key={TOPBAR_MENU.TablePermission}>
            {t("MENU.TABLE_PERMISSION")}
          </Style.TopMenuLi>
          <Style.TopMenuLi key={TOPBAR_MENU.Workspace}>
            {t("MENU.WORKSPACE")}
          </Style.TopMenuLi>
        </Style.TopSubMenu>

        <Style.TopSubMenu key={TOPBAR_MENU.Group} title={<span>{t("MENU.GROUP")}</span>}>
          <Style.TopMenuLi key={TOPBAR_MENU.Management}>
            {t("MENU.MANAGEMENT")}
          </Style.TopMenuLi>
          <Style.TopMenuLi key={TOPBAR_MENU.Permission}>
            {t("MENU.PERMISSION")}
          </Style.TopMenuLi>
        </Style.TopSubMenu>
      </Style.TopMenu>

      <Style.TopBarRight>
        <Style.TopMenu
          onClick={select}
          selectedKeys={[selected]}
          mode="horizontal"
        >
          <Style.TopSubMenu key={TOPBAR_MENU.Settings} title={<span>{t("MENU.SETTINGS")}</span>}>
            <Menu.ItemGroup title={t("MENU.SECURITY")}>
              <Menu.Item key={TOPBAR_MENU.ListUsers}>
                {t("MENU.LIST_USERS")}
              </Menu.Item>
              <Menu.Item key={TOPBAR_MENU.Logout} onClick={logOut}>{t("MENU.LOGOUT")}</Menu.Item>
            </Menu.ItemGroup>
          </Style.TopSubMenu>
          <Style.TopSubMenu key={TOPBAR_MENU.Download} title={<QuestionCircleFilled style={{ fontSize: 20 }} />}>
            <Style.TopMenuLi key="downloadOpt"><a href={fileUrl}>{t("MENU.MANUAL_DOWNLOAD")}</a></Style.TopMenuLi>
          </Style.TopSubMenu>
          <Style.TopSubMenu
            key={TOPBAR_MENU.Bell}
            id="user-menu-dropwn"
            title={
              <>
                {count !== 0 && bellClick === false ? (
                  <span className="fa-stack" data-count={count}>
                    <i className="fa fa-bell fa-stack" />
                    <BellFilled style={{ fontSize: 20 }} />
                  </span>
                )
                  : (
                    <BellFilled style={{ fontSize: 20 }} />
                  )}
              </>
            }
            onClick={() => handleBellClick()}
          >
            <BellMenu
              bellClick={bellClick}
              setBellClick={setBellClick}
              count={count}
              setCount={setCount}
              bellBarClick={bellBarClick}
              setBellBarClick={setBellBarClick}
            />
          </Style.TopSubMenu>
        </Style.TopMenu>

      </Style.TopBarRight>
    </Style.Container>
  );
};

export default withRouter(TopBar);

TopBar.propTypes = {
  path: PropTypes.string,
};

TopBar.defaultProps = {
  path: PATH.EE,
};
