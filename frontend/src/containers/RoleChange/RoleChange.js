import React, { useState } from "react";
import PropTypes from "prop-types";
import { getstoreUserInfo, cookieSync } from '@/utils/common';
import { useUserStore } from '@/store/userStroe';
import maskGroup from '@/static/images/login/test_login_tms_index.png';
import group from '@/static/images/login/logo.png';
import { message, Tabs } from 'antd';
import useAxios from "@/hooks/useAxios.js";
import { GlobalStyle, Body, LoginTitle, Container,
  Content, PixelInput, PixelBtn, LoginNotice, TempContainer,
  TempFunctionBlock, TempButton
} from "./style";

const RoleChange = ({ history }) => {
  const { TabPane } = Tabs;
  const { setUserData } = useUserStore();
  const [emplid, setEmplid] = useState('');
  const [passwd, setPasswd] = useState('');
  const axios = useAxios();

  const handleChangeID = (e) => {
    setEmplid(e.target.value);
  };

  const handleChangePWD = (e) => {
    setPasswd(e.target.value);
  };

  const loginFunction = async (id, pwd) => {
    const config = {
      url: `/admin/backdoor`,
      method: "post",
      data: { emplid: id, passwd: pwd},
    };
    await axios.exec(config);

    // Cookie to SessionStorage
    const userData = cookieSync();
    if (userData === false) {
      message.error('Login Failed');
      return;
    }

    const storeUserData = getstoreUserInfo();
    setUserData(storeUserData);
    if (storeUserData.functionTeam && storeUserData.functionTeam !== '') {
      if (storeUserData.functionTeam === 'EE') history.push(`/app/${storeUserData.functionTeam}/RequestForm`)
      else history.push(`/app/${storeUserData.functionTeam}/AllProject`);
    } else {
      message.error('No Function Team');
    }
  };

  const getNewJWTData = async () => {
    try {
      document.cookie = 'authorization=null';
      if (!emplid && !passwd) return;
      // Call API and get JWT Token
      await loginFunction(emplid, passwd);
    } catch (error) {
      console.error(error);
    }
  };

  const loginByUserRole = async (pid) => {
    try {
      document.cookie = 'authorization=null';
      // Call API and get JWT Token
      await loginFunction(pid, "tms@2021");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Body bgImg={maskGroup}>
        <GlobalStyle />
        <LoginTitle alt="" src={group} />
        <Container>
          <h1>Welcome Sign, Backdoor login only for develpoer.</h1>
          <Tabs defaultActiveKey="1" type="card" size="small" style={{height: 350, width: 500}}>
            <TabPane tab="Login By ID" key="1">
              <Content>Version: {VERSION}</Content>
              <Content>CommitId: {COMMITHASH}</Content>
              <Content>Branch: {BRANCH}</Content>
              <PixelInput placeholder="Employee ID" size="large" onChange={handleChangeID} />
              <PixelInput type="password" placeholder="Employee PWD" size="large" onChange={handleChangePWD} />
              <PixelBtn onClick={getNewJWTData}>Login</PixelBtn>
            </TabPane>
            <TabPane tab="Role Change" key="2">
              <TempContainer>
                <TempFunctionBlock>
                  <TempButton onClick={() => loginByUserRole('ee_user')}>EE</TempButton>
                  <TempButton onClick={() => loginByUserRole('siv_admin')}>Siv Admin</TempButton>
                  <TempButton onClick={() => loginByUserRole('siv_owner')}>Siv Owner</TempButton>
                  <TempButton onClick={() => loginByUserRole('siv_pic')}>Siv Pic</TempButton>
                </TempFunctionBlock>
                <TempFunctionBlock>
                  <TempButton onClick={() => loginByUserRole('power_admin')}>Power Admin</TempButton>
                  <TempButton onClick={() => loginByUserRole('power_owner')}>Power Owner</TempButton>
                  <TempButton onClick={() => loginByUserRole('power_pic')}>Power Pic</TempButton>
                </TempFunctionBlock>
                <TempFunctionBlock>
                  <TempButton onClick={() => loginByUserRole('emc_admin')}>EMC Admin</TempButton>
                  <TempButton onClick={() => loginByUserRole('emc_owner')}>EMC Owner</TempButton>
                  <TempButton onClick={() => loginByUserRole('emc_pic')}>EMC Pic</TempButton>
                </TempFunctionBlock>
                <TempFunctionBlock>
                  <TempButton onClick={() => loginByUserRole('rf_admin')}>RF Admin</TempButton>
                  <TempButton onClick={() => loginByUserRole('rf_owner')}>RF Owner</TempButton>
                  <TempButton onClick={() => loginByUserRole('rf_pic')}>RF Pic</TempButton>
                </TempFunctionBlock>
              </TempContainer>
            </TabPane>
          </Tabs>
        </Container>
        <LoginNotice>
          <div>
            Copyright © 2020 Wistron Corporation. All Rights Reserved.
          </div>
        </LoginNotice>
      </Body>
    </>
  );
};

RoleChange.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    replace: PropTypes.func,
  })
};

RoleChange.defaultProps = {
  history: {}
};

export default RoleChange;
