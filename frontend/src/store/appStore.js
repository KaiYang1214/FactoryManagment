import React, { useState, createContext, useContext } from 'react';

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
  const [currTab, setCurrTab] = useState('');
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
