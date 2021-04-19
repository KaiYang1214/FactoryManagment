/* eslint-disable prefer-destructuring */
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import useAxios from "@/hooks/useAxios";
import env from "@/utils/env";
import { logoutAAD } from '@/utils/common';
import logo from '@/static/images/login/wisdom_logo.png';
import azure from '@/static/images/azure.png';

// msal
import * as Msal from 'msal';
import * as Style from "./style";

// msal config
const msalConfig = {
  auth: {
    clientId: env.AAD_CLIENT_ID,
    authority: "https://login.microsoftonline.com/47cd140f-79c2-4a12-8719-dc3952880628",
    redirectUri: window.location.host.includes('localhost') ? env.LOCOAL_REDIRECT_URI : `https://${window.location.host}/#/azure/callback`,
    navigateToLoginRequestUrl: false
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true
  }
};

const myMSALObj = new Msal.UserAgentApplication(msalConfig);

// msal setting
const LoginRequest = {
  scopes: ["openid", "profile", "User.Read", "email", "Mail.Read"]
};

const accessTokenRequest = {
  scopes: ["User.Read", "Mail.Read"]
};

const Login = ({ history }) => {
  const { t } = useTranslation();
  const [versionClick, setVersionClick] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [loginErrorModalVisible, setloginErrorModalVisible] = useState(false);

  const query = useAxios({ result: [] });

  const handleVersionClick = () => setVersionClick(true);

  const onModalCancel = async () => {
    const config = {
      url: "/azure/logout",
      method: "get",
    };
    await query.exec(config);
    logoutAAD();
  };
  const handleLogin = () => {
    myMSALObj.loginRedirect(LoginRequest);
  }

  useEffect(() => {
    myMSALObj.handleRedirectCallback(() => {
      myMSALObj.acquireTokenSilent(accessTokenRequest).then(async (accessTokenResponse) => {
        const { accessToken } = accessTokenResponse;
        console.log(accessToken);
      }).catch((error) => {
        console.log(error);
      })
    })
  }, [])

  return (
    !mounted
      ? (
        <Style.LoginBody>
          <Style.LoginContainer>
            <Style.LoginHeaderContainer>
              <Style.LoginTitle alt="Wisdom" src={logo} />
            </Style.LoginHeaderContainer>
            <Style.LoginTextContainer>
              <Style.LoginText>{t('COMMON.LOGIN')}</Style.LoginText>
              <Style.LoginButton onClick={handleLogin} src={azure} />
            </Style.LoginTextContainer>
          </Style.LoginContainer>
          <Style.LoginNotice>
            <div>
              {t('COMMON.BROWSER_VERSION')}
            </div>
            <div>
              Copyright © 2020 Wistron Corporation. All Rights Reserved.
            </div>
          </Style.LoginNotice>
          <Style.GitVersion onClick={handleVersionClick} actived={versionClick}>
            <div>Version: {VERSION}</div>
            <div>CommitId: {COMMITHASH}</div>
            <div>Branch: {BRANCH}</div>
          </Style.GitVersion>
        </Style.LoginBody>
      )
      : null
  );
};

export default Login;
