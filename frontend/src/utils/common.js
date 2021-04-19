import jwtDecode from "jwt-decode";
import { createInstance } from "@datapunt/matomo-tracker-react";
import PATH from "@/utils/path";
import env from "@/utils/env";
import moment from "moment";
import { USER_ROLE, ALL_FUNCTION_PATH } from "@/utils/const";

// ATTENTION: If you change any constants, make sure to also change constants.py

export const NULL_STRING = '<NULL>';

// moment time format strings
export const SHORT_DATE = 'MMM D, YYYY';
export const SHORT_TIME = 'h:m a';

export function getParamFromQuery(query, param) {
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i += 1) {
    const pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === param) {
      return decodeURIComponent(pair[1]);
    }
  }
  return null;
}


export function getParamsFromUrl() {
  const hash = window.location.search;
  const params = hash.split('?')[1].split('&');
  const newParams = {};
  params.forEach(p => {
    const value = p.split('=')[1].replace(/\+/g, ' ');
    const key = p.split('=')[0];
    newParams[key] = value;
  });
  return newParams;
}

export function optionLabel(opt) {
  if (opt === null) {
    return NULL_STRING;
  }
  if (opt === '') {
    return '<empty string>';
  }
  if (opt === true) {
    return '<true>';
  }
  if (opt === false) {
    return '<false>';
  }
  if (typeof opt !== 'string' && opt.toString) {
    return opt.toString();
  }
  return opt;
}

export function optionValue(opt) {
  if (opt === null) {
    return NULL_STRING;
  }
  return opt;
}

export function optionFromValue(opt) {
  // From a list of options, handles special values & labels
  return { value: optionValue(opt), label: optionLabel(opt) };
}

export function prepareCopyToClipboardTabularData(data) {
  let result = '';
  for (let i = 0; i < data.length; i += 1) {
    result += `${Object.values(data[i]).join('\t')}\n`;
  }
  return result;
}

export function applyFormattingToTabularData(data) {
  if (!data || data.length === 0 || !('__timestamp' in data[0])) {
    return data;
  }
  return data.map(row => ({
    ...row,
    /* eslint-disable no-underscore-dangle */
    __timestamp:
      row.__timestamp === 0 || row.__timestamp
        ? row.__timestamp
        : row.__timestamp,
    /* eslint-enable no-underscore-dangle */
  }));
}

/**
 * 取得對應的物件
 * @param {*} con 在const內定義的變數
 * @param {*} code 要取得i18n的代碼
 */
export const getConstObject = (con, code, defaultValue = {}) => {
  if (con) {
    const key = Object.keys(con).find(p => con[p].value === code);
    if (key) {
      return con[key];
    }
  }
  return defaultValue;
};

/**
 * 判斷字串是否可以轉物件
 * @param {string} string 任意字串
 */
export const isObject = string => {
  try {
    JSON.parse(string);
    return true;
  } catch (e) {
    return false;
  }
};

export const noOp = () => undefined;

export const getParameterByName = (name, url) => {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");

  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, ""));
};

export const getParameterByToken = (name, url) => {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");

  const regex = new RegExp(`${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, ""));
};

export const tmsRole2path = (tmsRole) => {
  if (!tmsRole) return;
  const tmpArr = tmsRole.name.split('_');
  if (ALL_FUNCTION_PATH.includes(tmpArr[0])) sessionStorage.setItem("functionTeam", tmpArr[0]);
  if (tmpArr.length >= 3) {
    switch (tmpArr[2]) {
      case USER_ROLE.admin.toUpperCase():
        sessionStorage.setItem("role", USER_ROLE.admin);
        break;
      case USER_ROLE.owner.toUpperCase():
        sessionStorage.setItem("role", USER_ROLE.owner);
        break;
      case USER_ROLE.contactWindow.toUpperCase():
        sessionStorage.setItem("role", USER_ROLE.contactWindow);
        break;
      default:
        break;
    }
  }
};

export const storeTempUserInfo = (data) => {
  try {
    sessionStorage.setItem("displayName", data.displayName);
    sessionStorage.setItem("exp", data.exp);
    sessionStorage.setItem("iss", data.iss);
    sessionStorage.setItem("jti", data.jti);
    sessionStorage.setItem("mail", data.mail);
    sessionStorage.setItem("mailNickname", data.mailNickname);
    sessionStorage.setItem("sub", data.sub);
    sessionStorage.setItem("surname", data.surname);
    sessionStorage.setItem("telephoneNumber", data.telephoneNumber);
    sessionStorage.setItem("userType", data.userType);
    sessionStorage.setItem("role", data.role);
    sessionStorage.setItem("deptId", data.deptId);
    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const storeUserInfo = (jwtToken) => {
  try {
    const data = jwtDecode(jwtToken);
    sessionStorage.setItem("sub", data.sub);
    sessionStorage.setItem("emplId", data.emplId);
    sessionStorage.setItem("role", data.role);
    sessionStorage.setItem("mail", data.mail);
    sessionStorage.setItem("access_token", jwtToken);
    sessionStorage.setItem("user_id", data.user_id);
    sessionStorage.setItem("displayName", data.displayName);
    sessionStorage.setItem("surname", data.surname);
    sessionStorage.setItem("iss", data.iss);
    sessionStorage.setItem("userType", data.userType);
    sessionStorage.setItem("jti", data.jti);
    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getstoreUserInfo = () => {
  localStorage.removeItem("logout");
  const userInfo = {
    sub: sessionStorage.getItem("sub"),
    emplId: sessionStorage.getItem("emplId"),
    role: sessionStorage.getItem("role"),
    mail: sessionStorage.getItem("mail"),
    access_token: sessionStorage.getItem("access_token"),
    user_id: sessionStorage.getItem("user_id"),
    displayName: sessionStorage.getItem("displayName"),
    surname: sessionStorage.getItem("surname"),
    iss: sessionStorage.getItem("iss"),
    userType: sessionStorage.getItem("userType"),
    jti: sessionStorage.getItem("jti"),
  };
  return userInfo;
};
  
export const cookieSync = () => {
  // 處理Cookie，並存入sessionStorage
  let result;
  const cookieArr = document.cookie.split(';');
  cookieArr.forEach((item) => {
    if (item.includes('authorization=')) {
      result = item.replace('authorization=', '');
    }
  });
  // Decode JWT
  const userData = storeUserInfo(result);
  return userData;
};


export const logout = () => {
  localStorage.setItem("logout", "logout");
  sessionStorage.clear();
  localStorage.removeItem("nowUrl");
  window.location.href = "https://login.microsoftonline.com/wistron.com/oauth2/logout";
};

export const logoutAAD = () => {
  localStorage.setItem("logout", "logout");
  sessionStorage.clear();
  localStorage.removeItem("isEverLogin");
  localStorage.removeItem("nowUrl");
  window.location.href = "https://login.microsoftonline.com/wistron.com/oauth2/logout";
};

export const storageEvent = (e) => {
  switch (e.key) {
    case "logout":
      // do logout
      logout();
      window.removeEventListener("storage", storageEvent);
      localStorage.removeItem("logout");
      localStorage.removeItem("getSessionStorage");
      break;
    case "getSessionStorage": {
      // send data to another page
      const text = JSON.stringify(sessionStorage.getItem("accessToken"));
      localStorage.setItem("sessionStorage", text);
      break;
    }
    case "sessionStorage": {
      if (e.newValue) {
        const data = JSON.parse(e.newValue);
        storeUserInfo(data);
        localStorage.removeItem("sessionStorage");
      }
      break;
    }
    default:
  }
};

export const pageSyncLogout = () => {
  console.log("401");
  window.removeEventListener("storage", storageEvent);
  localStorage.setItem("logout", "logout");
  const url = document.location.href;
  const matchIdx = url.indexOf("#");
  const keepUrl = url.slice(matchIdx + 1);
  localStorage.setItem("keepUrl", keepUrl);
  sessionStorage.clear();
  localStorage.removeItem("nowUrl");
  window.location.href = "/";
};

export const pageSync = (nowUrl) => new Promise((rs, rj) => {
  window.addEventListener("storage", storageEvent);
  localStorage.getSessionStorage = new Date();
  setTimeout(() => {
    if (!sessionStorage.getItem("accessToken")) {
      localStorage.nowUrl = nowUrl;
      pageSyncLogout();
      rj();
    } else {
      rs();
    }
  }, 500);
});

/**
 * 將 route PATH 中 :variabe 取代
 *
 * @param {string} path Route path
 * @param {string || string} args 要取代的數值/字串
 * resolvePath('/user/:id', 2) => '/user/2'
 */
export const resolvePath = (path, ...args) => {
  let replacedArgNum = 0;
  const pathArray = path.split("/").map((p) => {
    if (p.charAt(0) === ":") {
      const replacedArg = encodeURIComponent(args[replacedArgNum]);
      replacedArgNum += 1;
      return replacedArg;
    }
    return p;
  });
  return pathArray.join("/");
};

export const gotoPath = (history, type, ...args) => {
  let url = PATH[type];
  if (args) {
    url = resolvePath(url, ...args);
  }
  history.push(url);
};

export const initializeMatomo = (cookie) => {
  const cookieArr = cookie.split(";").map((str) => str.trim().split("="));

  const cookieObj = {};
  cookieArr.forEach((item) => {
    const [key, val] = item;
    cookieObj[key] = val;
  });

  if (cookieObj.authorization) {
    console.log("MATOMO_URL", process.env.MATOMO_URL);
    console.log("MATOMO_SITEID", process.env.MATOMO_SITEID);
    const decoded = jwtDecode(cookieObj.authorization);
    return createInstance({
      urlBase: process.env.MATOMO_URL,
      siteId: process.env.MATOMO_SITEID,
      userId: decoded.mailNickname,
    });
  }

  return null;
};

export const getFakeArray = (length) => Array.from({ length }, (i, k) => ({
  id: `id_${k}`,
  content: `item_${k}`,
}));

export const localeCompareSort = (a, b, key) => {
  if (a && b && a[key] && b[key]) {
    return a[key].localeCompare(b[key], undefined, {
      numeric: true,
      sensitivity: "base",
    });
  }
  return 1;
};

const chageModalScrollStatus = [];

export const chageModalScroll = (status) => {
  if (status) {
    chageModalScrollStatus.push(status);
  } else {
    chageModalScrollStatus.pop();
  }

  if (chageModalScrollStatus.length > 0) {
    document.querySelector(".ant-modal-body").style.overflowY = "hidden";
  } else {
    document.querySelector(".ant-modal-body").style.overflowY = "auto";
  }
};

export const timeStamp2Date = (timeStamp) => moment(timeStamp).format("YYYY/MM/DD hh:mm");

// Merge array cells
export const mergeTableData = (data, firstColumn, secondColumn) => data.reduce((result, item) => {
  // RF 需要Merge的table column有兩項，Key: firstColumn;secondColumn
  const mergeKey = `${item[firstColumn]};${item[secondColumn]}`;
  if (result.indexOf(mergeKey) < 0) {
    result.push(mergeKey);
  }
  return result;
}, []).reduce((result, name) => {
  // name: firstColumn;secondColumn
  const ckeckValue = name.split(';');
  // 處理 First Column Merge : firstColumn 需要對上
  const rowSpanName = `${firstColumn}RowSpan`;
  const mergeFirst = result.filter((item) => item[firstColumn] === ckeckValue[0]);
  mergeFirst.forEach((item, index) => {
    if (index === 0) item[rowSpanName] = mergeFirst.length;
    else item[rowSpanName] = 0;
  });

  // 處理 Second Column Merge : Key需要全對上
  const rowSpanName2 = `${secondColumn}RowSpan`;
  const mergeSecond = result.filter((item) => item[firstColumn] === ckeckValue[0] && item[secondColumn] === ckeckValue[1]);
  mergeSecond.forEach((item, index) => {
    if (index === 0) item[rowSpanName2] = mergeSecond.length;
    else item[rowSpanName2] = 0;
  });

  return result;
}, data);
