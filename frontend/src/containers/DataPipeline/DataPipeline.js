
import React, { Suspense, lazy, useState } from "react";
import { withRouter, Route, Switch } from 'react-router-dom';
import PATH from "@/utils/path";
import TopBar from "@/components/compos/TopBar";
import { Body } from "./style.js";

const CreatePipeline = lazy(() => import("@/containers/DataPipeline/CreatePipeline/Main.js" /* webpackChunkName:"Main" */));
const TablePermission = lazy(() => import("@/containers/DataPipeline/TablePermission/TablePermission.js"/* webpackChunkName:"TablePermission" */));
const Workspace = lazy(() => import("@/containers/DataPipeline/Workspace/"/* webpackChunkName:"Workspace" */));

const DataPipeline = () => {
  return (
    <>
      <Body>
        <TopBar path="/app/pipeline" />
        <Suspense fallback={<div>Module loading....</div>}>
          <Switch>
            <Route path={`${PATH.DataPipelinePage.CreatePipeline}`} component={CreatePipeline} />
            <Route path={`${PATH.DataPipelinePage.TablePermission}`} component={TablePermission} />
            <Route path={`${PATH.DataPipelinePage.Workspace}`} component={Workspace} />
          </Switch>
        </Suspense>
      </Body>
    </>
  );
};

export default withRouter(DataPipeline);
