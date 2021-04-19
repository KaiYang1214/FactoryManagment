/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { lazy, Suspense, useEffect, useState, useContext } from "react";
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getstoreUserInfo, cookieSync } from "@/utils/common";
import PATH from "@/utils/path";
import { useAppStore } from "@/store/appStore";
import LoadingMask from "@/components/compos/LoadingMask";
import { Container, Body } from "./style";
import "./style.css";

// project list page
const Demo = lazy(() => import("@/containers/ContainersDemo/Demo" /* webpackChunkName:"Demo" */));
const RoleChange = lazy(() => import("@/containers/RoleChange/" /* webpackChunkName:"RoleChange" */));// 未使用
const ListUser = lazy(() => import("@/containers/ListUser" /* webpackChunkName:"ListUser" */));

const DataPipeline = lazy(() => import("@/containers/DataPipeline" /* webpackChunkName:"DataPipeline123" */));
const Group = lazy(() => import("@/containers/Group/" /* webpackChunkName:"Group123" */));

const App = ({ history }) => {
  const { setUserInfo, userInfo } = useAppStore();
  // Initialize
  const init = async () => {
    if (userInfo.access_token === '' && sessionStorage.getItem('access_token')) {
      const userData = getstoreUserInfo();
      setUserInfo({
        emplId: userData.emplId,
        username: userData.surname,
        firstName: userData.surname.split(' ')[0],
        lastName: userData.surname.split(' ')[1],
        email: userData.mail,
        access_token: userData.access_token,
        roles: [...userInfo.roles, userData.role],
      })
    }
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <Container>
      <Suspense fallback={<div>Module loading....</div>}>
        <Switch>
          <Route default path={PATH.Demo} component={Demo} />
          <Route path={PATH.RoleChange} component={RoleChange} />
          <Route path={PATH.ListUser} component={ListUser} />
          <Route path={PATH.DataPipeline} component={DataPipeline} />
          <Route path={PATH.Group} component={Group} />
        </Switch>
      </Suspense>
    </Container>
  );
};

export default App;

App.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
    }),
  }),
};

App.defaultProps = {
  history: {},
};
