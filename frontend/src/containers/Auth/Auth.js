import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import LoadingGif from '@/static/images/loading.gif';
import { UserApi } from '@/apis';
import { useQuery } from '@/hooks';
import PATH from "@/utils/path";
import { getParameterByName, storeUserInfo } from '@/utils/common';
import { useUserStore } from '@/store/userStroe';
import { useAppStore } from '@/store/appStore';
import * as Style from './style';

const Auth = ({ history }) => {
  const { setUserData } = useUserStore();
  const { setUserInfo, userInfo } = useAppStore();
  const getTokenDirectly = useQuery(UserApi.getTokenDirectly);

  const getJWT = async (token) => {

    try {
      const {result} = await getTokenDirectly.exec({ accessToken: token});
      const userData = storeUserInfo(result);
      setUserData(userData);
      setUserInfo({
        emplId: userData.emplId,
        username: userData.surname,
        firstName: userData.surname.split(' ')[0],
        lastName: userData.surname.split(' ')[1],
        email: userData.mail,
        access_token: token,
        roles: [...userInfo.roles, userData.role],
      })
      const keepUrl = localStorage.getItem('keepUrl');
      if (keepUrl) {
        history.push(keepUrl);
      } else {
        history.push(PATH.DataPipelinePage.CreatePipeline);
      }
    } catch (e) {
      console.log(e);
    } finally {
      console.log('finally');
    }
  };

  useEffect(() => {
    const token = getParameterByName('token');
    if (token) { getJWT(token); }
  }, []);

  return (
    <Style.LoadingPage>
      <img src={LoadingGif} alt="loading" />
    </Style.LoadingPage>
  );
};

Auth.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    replace: PropTypes.func,
  })
};

Auth.defaultProps = {
  history: {}
};

export default Auth;
