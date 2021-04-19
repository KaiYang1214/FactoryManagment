import AxiosApiClient from "./AxiosApiClient";
import { DATAFLOW } from "./url";

const apiClient = new AxiosApiClient();

export const saveDataFlow = {
  url: DATAFLOW.ETL_SAVE,
  method: "post",
  payload: {},
  data: {},
  config: {},
};

export const getDataFlowList = {
  url: DATAFLOW.GET_DATAFLOW_LIST,
  method: "get",
  payload: {
    page: 1,
    pageSize: 9999,
  },
  data: {},
  config: {},
};

export const getDataFlowDetail = async (seqId) => {
  const { data } = await apiClient
    .get({
      url: `${DATAFLOW.GET_DATAFLOW_DETAIL}/${seqId}`,
      payload: {},
      config: {},
    })
    .send();
  return data;
};

export const setEditStatus = async (seqId) => {
  const payload = { seqId };
  const config = {};
  const { data } = await apiClient
    .post({ url: `${DATAFLOW.SET_DATAFLOW_STATUS}`, payload, config })
    .send();
  return data;
};

export const cancelEditStatus = async (seqId) => {
  const payload = { seqId };
  const config = {};
  const { data } = await apiClient
    .post({ url: `${DATAFLOW.CANCEL_DATAFLOW_EDIT_STATUS}`, payload, config })
    .send();
  return data;
};

export const checkDataFlowLock = async (seqId) => {
  const { data } = await apiClient
    .get({
      url: `${DATAFLOW.CHECK_DATAFLOW_LOCKED}/${seqId}`,
      payload: {},
      config: {},
    })
    .send();
  return data;
};

export const deleteDataFlow = async (seqId) => {
  const payload = { seqId };
  const config = {};
  const { data } = await apiClient
    .post({ url: `${DATAFLOW.DELETE_DATAFLOW}`, payload, config })
    .send();
  return data;
};

export const runDataFlow = async (seqId) => {
  const payload = { seqId };
  const config = {};
  const { data } = await apiClient
    .post({ url: `${DATAFLOW.RUN_DATAFLOW}`, payload, config })
    .send();
  return data;
};

export const validateDataFlow = async (dataflow) => {
  const payload = dataflow;
  const config = {};
  const { data } = await apiClient
    .post({ url: `${DATAFLOW.VALIDATE_DATAFLOW}`, payload, config })
    .send();
  return data;
};

export const preview = {
  url: DATAFLOW.ETL_PREVIEW,
  method: "post",
  payload: {},
  data: {},
  config: {},
};

export const getTargetNode = async (seqId) => {
  const { data } = await apiClient
    .get({
      url: `${DATAFLOW.GET_TARGETNODE}/${seqId}`,
      payload: {},
      config: {},
    })
    .send();
  return data;
};

export const getTargetSchema = async (seqId) => {
  const { data } = await apiClient
    .get({
      url: `${DATAFLOW.GET_TARGET_SCHEMAS}/${seqId}`,
      payload: {},
      config: {},
    })
    .send();
  return data;
};

export const getOutputSchema = {
  url: DATAFLOW.GET_OUTPUT_SCHEMA,
  method: "post",
  payload: {},
  data: {},
  config: {},
};
