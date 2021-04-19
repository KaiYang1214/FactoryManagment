import '@babel/polyfill';
import 'url-search-params-polyfill';
import React, { lazy, Suspense } from "react";
import * as Sentry from '@sentry/browser';
import { render } from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { UserContextProvider } from "@/store/userStroe";
import { AppContextProvider } from "@/store/appStore";
import { getParameterByToken } from '@/utils/common';
import PATH from '@/utils/path';
import "@/theme/theme.less";
import "./locales/i18n";
import './index.css';


if (process.env.SENTRY_FRONTEND_DSN) {
  Sentry.init({ dsn: process.env.SENTRY_FRONTEND_DSN });
}

const App = lazy(() => import("@/containers/App" /* webpackChunkName:"App" */));
const Login = lazy(() => import("@/containers/Login" /* webpackChunkName:"Login" */));
const Auth = lazy(() => import("@/containers/Auth" /* webpackChunkName:"Auth" */));

const Main = () => {
  const isNeedRedirect = () => {
    if (window.location.href.includes(PATH.downloadcircuitanalyzer)) {
      return false;
    }
    return true;
  };

  React.useEffect(() => {

    const token = getParameterByToken('id_token');

    if (token) {
      let url = '';
      if (window.location.host.includes('localhost')) {
        url = `http://localhost:8080/#/azure/callback?token=${token}`;
      } else {
        url = `https://${window.location.host}/#/azure/callback?token=${token}`;
      }
      window.location.href = url;
    }

    const cookieArr = window.document.cookie.split(';').map((str) => str.trim().split('='));
    const cookieObj = {};
    cookieArr.forEach((item) => {
      const [key, val] = item;
      cookieObj[key] = val;
    });

    if (cookieObj && cookieObj.authorization) {
      localStorage.setItem("isEverLogin", "true");
    }
  }, []);

  return (
    <Router>
      <UserContextProvider>
        <AppContextProvider>
          <Suspense fallback={<div>Module loading....</div>}>
            <Switch>
              <Route path="/app" component={App} />
              <Route path="/" exact component={Login} />
              <Route path="/azure/callback" component={Auth} />
            </Switch>
          </Suspense>
        </AppContextProvider>
      </UserContextProvider>
    </Router>
  );
};

render(<Main />, document.getElementById("app"));

console.log("%cWelcome to SSOT", "background: rgba(252,234,187,1);background: -moz-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%,rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -webkit-gradient(left top, right top, color-stop(0%, rgba(252,234,187,1)), color-stop(12%, rgba(175,250,77,1)), color-stop(28%, rgba(0,247,49,1)), color-stop(39%, rgba(0,210,247,1)), color-stop(51%, rgba(0,189,247,1)), color-stop(64%, rgba(133,108,217,1)), color-stop(78%, rgba(177,0,247,1)), color-stop(87%, rgba(247,0,189,1)), color-stop(100%, rgba(245,22,52,1)));background: -webkit-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -o-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -ms-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: linear-gradient(to right, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fceabb', endColorstr='#f51634', GradientType=1 );font-size:5em; color: white;");
