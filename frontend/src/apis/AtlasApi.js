import { ATLAS_QUERY } from './url';

export const getEntityListFromAtlas = {
  url: ATLAS_QUERY.GET_ENTITY_LIST_FROM_ATLAS,
  method: 'get',
  payload: {},
  data: {
    data: [],
    pagination: { total: 0 },
  },
  config: {},
};

export const getTermList = {
  url: ATLAS_QUERY.GET_TERM,
  method: 'get',
  payload: {},
  data: {
    data: [],
    pagination: { total: 0 },
  },
  config: {},
};

export const saveSelectETL = {
  url: ATLAS_QUERY.SAVE_SELECT_ETL,
  method: 'post',
  payload: {},
  data: {
    data: [],
    pagination: { total: 0 },
  },
  config: {},
};

export const getUserSelectTable = {
  url: ATLAS_QUERY.GET_USER_SELECT_TABLE,
  method: 'get',
  payload: {},
  data: {
    tables: [],
    groupId: undefined,
  },
  config: {},
};
