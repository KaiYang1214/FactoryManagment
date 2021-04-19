import { TABLE_AUTH, TABLE_INFO, TABLE_ON_CHAIN_STATUS } from "./url";
import AxiosApiClient from "./AxiosApiClient";

const apiClient = new AxiosApiClient();

export const tableApply = {
  url: TABLE_AUTH.TABLE_APPLY,
  method: "post",
  payload: {},
  data: {},
  config: {},
};

export const getApproveList = {
  url: TABLE_AUTH.GET_APPROVE_LIST,
  method: "post",
  payload: {},
  data: [],
  config: {},
};

export const grantPermission = {
  url: TABLE_AUTH.GRANT_PERMISSION,
  method: "post",
  payload: {},
  data: {},
  config: {},
};

export const getAllowed = async () => {
  const { data } = await apiClient
    .get({
      url: TABLE_AUTH.GET_USER_ALLOWED,
      payload: {},
      config: {},
    })
    .send();
  return data;
};

export const getHealthTable = async (tableid) => {
  const payload = {};
  const config = {};
  const { data } = await apiClient
    .get({ url: `${TABLE_INFO.GET_HEALTH}/${tableid}`, payload, config })
    .send();
  return data;
};

export const editDescription = {
  url: TABLE_INFO.EDIT_DESCRIPTION,
  method: "post",
  payload: {},
  data: {},
  config: {},
};

export const getTableOnChainStatusList = {
  url: TABLE_ON_CHAIN_STATUS.GET_TABLE_INFO,
  method: "get",
  payload: {},
  data: {
    infolist: [],
    pageInfo: {},
  },
  config: {},
};

export const getTableLineage = async (tableid) => {
  const payload = {};
  const config = {};
  const { data } = await apiClient
    .get({ url: `${TABLE_INFO.GET_TABLE_LINEAGE}/${tableid}`, payload, config })
    .send();
  return data;
};

export const tableDelete = {
  url: TABLE_AUTH.TABLE_DELETE,
  method: "post",
  payload: {},
  data: {},
  config: {},
};

export const getTableColumns = async (groupId) => {
  const payload = {};
  const config = {};
  const { data } = await apiClient
    .get({
      url: `${TABLE_INFO.GET_TABLE_COLUMNS}/${groupId}`,
      payload,
      config,
    })
    .send();
  return data;
};

export const getAllowedTable = async (groupId) => {
  const payload = { groupId, type: "WisDOM" };
  const config = {};
  const { data } = await apiClient
    .get({
      url: `${TABLE_AUTH.ALLOWED_TABLE}`,
      payload,
      config,
    })
    .send();
  return data;
};

export const getAllowedTableColumns = async (tableName) => {
  const payload = {};
  const config = {};
  const { data } = await apiClient
    .get({
      url: `${TABLE_INFO.GET_TABLE_COLUMNS_BY_NAME}/${tableName}`,
      payload,
      config,
    })
    .send();
  return data;
};
