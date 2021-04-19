import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { getstoreUserInfo } from "@/utils/common";
import { Button } from "antd";
import { AppContext } from "@/store/appStore";
import { useModal } from "@/hooks/";
import { RoleApi } from "@/apis/";
import { TAB_KEY, ROLE_TYPE } from "@/constants/index";

import ImportModal from "@/components/compos/ImportModal/ImportModal";
import UploadModal from "@/components/compos/UploadModal/UploadModal";
import SyncDataModal from "@/components/compos/SyncDataModal/SyncDataModal";
import CreateSyncData from "@/components/compos/CreateSyncData/CreateSyncData";
import Explore from "./Explore";
import SearchData from "./SearchData";

import * as Style from "./mainStyle";

const Main = ({ history }) => {
  const appStore = useContext(AppContext);
  const { currTab, setCurrTab } = appStore;
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();
  const [selectGroupObject, setSelectedGroupObject] = useState({});
  const [groupList, setGroupList] = useState([]);

  const importModal = useModal();
  const uploadModal = useModal();
  const syncDataModal = useModal();
  const createSyncData = useModal();

  const [user, setUser] = useState(appStore.userInfo);

  const getRoles = async () => {
    const res = await RoleApi.getRoles();
    setRoles(res);
    let temp = appStore.userInfo;
    if (appStore.userInfo.emplId === "") {
      const storeUserData = getstoreUserInfo();
      temp = {
        emplId: storeUserData.emplId,
        username: storeUserData.surname,
        firstName: storeUserData.surname.split(" ")[0],
        lastName: storeUserData.surname.split(" ")[1],
        email: storeUserData.mail,
        access_token: storeUserData.access_token,
        roles: [storeUserData.role], // user 可能有多重角色
      };
    }
    temp.roles = [...appStore.userInfo.roles, ...res];
    appStore.setUserInfo(temp);
    setUser(temp);
  };

  const renderExploreOrDataView = () => {
    switch (currTab) {
      case TAB_KEY.FIND_DATA:
        return (
          <div
            key={TAB_KEY.FIND_DATA}
            style={{
              padding: "0 10px",
            }}
          >
            <SearchData
              history={history}
              next={setCurrTab}
              selectedColumns={selectedColumns}
              setSelectedColumns={setSelectedColumns}
              user={user}
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
              setSelectedGroupObject={setSelectedGroupObject}
              setGroupList={setGroupList}
            />
          </div>
        );
      case TAB_KEY.EXPLORE:
        return (
          <div
            key={TAB_KEY.EXPLORE}
            style={{
              padding: "0 10px",
              backgroundColor: "white",
            }}
          >
            <Explore
              currTab={currTab}
              back={() => setCurrTab(TAB_KEY.FIND_DATA)}
              selectedColumns={selectedColumns}
              setSelectedColumns={setSelectedColumns}
              selectGroupObject={selectGroupObject}
            />
          </div>
        );
      default:
        return (
          <div
            key={TAB_KEY.FIND_DATA}
            style={{
              padding: "0 10px",
            }}
          >
            <SearchData
              next={setCurrTab}
              selectedColumns={selectedColumns}
              setSelectedColumns={setSelectedColumns}
              user={user}
              setGroupList={setGroupList}
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
              setSelectedGroupObject={setSelectedGroupObject}
              bolMaster={roles.includes(ROLE_TYPE.MASTER)} // true/false
            />
          </div>
        );
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <Style.WisdomContainer>
      <Style.ButtonGroup>
        {currTab === TAB_KEY.FIND_DATA ? (
          <Style.MainTitle>Create Data Pipeline</Style.MainTitle>
        ) : null}
        {currTab === TAB_KEY.EXPLORE ? (
          <Style.MainTitle>Explore</Style.MainTitle>
        ) : null}

        <Button
          bsStyle="primary"
          bsSize="sm"
          onClick={uploadModal.openModal}
          style={
            currTab === TAB_KEY.DATAFLOW
              ? { display: "none", width: 120 }
              : { display: "block", width: 120 }
          }
        >
          Upload
        </Button>
      </Style.ButtonGroup>
      {renderExploreOrDataView()}
      
      <ImportModal modal={importModal} onUploadExist={uploadModal.openModal} />
      <UploadModal modal={uploadModal} onCreateNew={importModal.openModal} />
      <CreateSyncData
        modal={createSyncData}
        roles={roles}
        onUploadExist={syncDataModal.openModal}
      />
      <SyncDataModal
        modal={syncDataModal}
        onCreateNew={createSyncData.openModal}
      />
    </Style.WisdomContainer>
  );
};

export default Main;
