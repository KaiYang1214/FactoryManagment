import React, { useState, createContext, useContext } from 'react';
import { TAB_KEY } from "@/constants/index";

export const AppContext = createContext();
export const useAppStore = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    emplId: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    access_token: '',
    roles: [], // user 登入資訊,塞入admin,master等等
  }); 
  const [currTab, setCurrTab] = useState(TAB_KEY.FIND_DATA);
  return (
    <AppContext.Provider
      value={{
        userInfo,
        setUserInfo,
        currTab,
        setCurrTab
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
