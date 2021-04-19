import React, { Suspense, lazy } from "react";
import { withRouter, Route, Switch } from 'react-router-dom';
import PATH from "@/utils/path";
import TopBar from "@/components/compos/TopBar";
import * as Style from "./style";

const Management = lazy(() => import("@/containers/Group/Management" /* webpackChunkName:"Management789" */));
const Permission = lazy(() => import("@/containers/Group/Permission" /* webpackChunkName:"Permission789" */));

const Group = () => {
  return (
    <>
      <Style.Body>
        <TopBar path="/app/group" />
        <Suspense fallback={<div>Module loading....</div>}>
          <Switch>
            <Route path={`${PATH.GroupPage.Management}`} component={Management} />
            <Route path={`${PATH.GroupPage.Permission}`} component={Permission} />
          </Switch>
        </Suspense>
      </Style.Body>
    </>
  )
}

export default withRouter(Group);
