import AppConfig from '@/config';
import * as DIAGRAM from './diagram';

export { DIAGRAM };

export const SET_MATOMO = {
  URL_BASE: AppConfig.MATOMO_URL_BASE,
  SITE_ID: AppConfig.MATOMO_SITE_ID,
};

export const TAB_KEY = {
  FIND_DATA: 'FIND_DATA',
  EXPLORE: 'EXPLORE',
  DATAFLOW: 'DATAFLOW',
};

export const FLOW_NAME_RULES = {
  pattern: new RegExp(/^[A-Za-z0-9_-\s/()]*$/i),
};

export const TABLE_NAME_RULES = {
  pattern: new RegExp(/^[A-Za-z]+[A-Za-z0-9_]*$/i),
};

export const PROJECT_NAME_RULES = {
    pattern: new RegExp(/^[A-Za-z0-9-\s/()]*$/i),
  };

export const INPUT_RULES = {
  TABLE_NAME: { value: 400 },
  TABLE_DESCRIPTION: { value: 500 },
  COLUMN_NAME: { value: 255 },
  COLUMN_DESCRIPTION: { value: 500 },
  HOST: { value: 100 },
  PORT: { value: 100 },
  DB_NAME: { value: 100 },
  USER_NAME: { value: 100 },
  USER_PW: { value: 100 },
  GROUP_NAME: { value: 255 },
  REASON: { value: 1000 },
  PROJECT_NAME: { value: 100 },
  ENTITY_NAME: { value: 400 },
  ENTITY_DESCRIPTION: { value: 500 },
  NICKNAME: { value: 100 },
  DEPARTMENT_NAME: { value: 20 },
  EMAIL: { value: 200 },
  CONSUME_SCOPE: { value: 15 },
  CONSUME_VALUE: { value: 15 },
};

export const SYSTEM_TYPE = {
  props: {
    WisDOM: {
      key: 'WisDOM',
      name: 'WisDOM',
      color: '#fb8435',
    },
    WDC: {
      key: 'WDC',
      name: 'WisDOM Deliver (Cloud)',
      color: '#b77cae',
    },
  },
  getOptionList: () => Object.values(SYSTEM_TYPE.props),
};

export const DB_TYPE = {
  props: {
    postgres: { value: 'postgres' },
    mssql: { value: 'mssql' },
    mysql: { value: 'mysql' },
    oracle: { value: 'oracle' },
  },
  getOptionList: () => Object.values(DB_TYPE.props),
};

export const PREVIEW_STATUS = {
  NOT_ALLOWED: {
    value: 0,
    name: 'Not Allowed',
  },
  ALLOWED: {
    value: 1,
    name: 'Allowed',
  },
  APPLYING: {
    value: 2,
    name: 'Applying',
  },
  REJECT: {
    value: 3,
    name: 'Reject',
  },
};

export const CONSUME_STATUS = {
  NOT_CONSUMEABLE: 0,
  CONSUMEABLE: 1,
};

export const DATE_TYPE = {
  DATE: 'YYYY/MM/DD',
  DATE_TIME: 'YYYY/MM/DD HH:mm',
  DATE_TIME_WITH_SEC: 'YYYY/MM/DD HH:mm:ss',
};

export const ROLE_TYPE = {
  MASTER: 'MASTER',
};

export const ACTION_TYPE = {
  append: {
    value: 'append',
    name: 'Append',
  },
  overwrite: {
    value: 'overwrite',
    name: 'Overwrite',
  },
  upsert: {
    value: 'upsert',
    name: 'Update and Append',
  },
};

export const BLOCKCHAIN_STATUS = {
  LEDGER_INPUT_OK: 'LEDGER_INPUT_OK',
  VERIFY_OK: 'VERIFY_OK',
};

export const GROUP_TYPE = {
  DEFAULT: 1,
  CUSTOMIZED: 0,
};

export const OUTPUT_TYPE = {
  props: {
    CDM: {
      key: 'outputCDM',
      value: 'CDM',
      showName: 'CDM',
    },
    DB: {
      key: 'outputDB',
      value: 'DB',
      showName: 'DataBase'
    },
    CUSTOM: {
      key: 'outputCustom',
      value: 'CUSTOM',
      showName: 'Customized DB',
      dbInfo: {
        host: undefined,
        port: undefined,
        database: undefined,
        dbType: undefined, // DB_TYPE props value
        userName: undefined,
        password: undefined,
      },
    },
  },
  getOptionList: () => Object.values(OUTPUT_TYPE.props),
};

export const DATAFLOW_TYPE = {
  DATASET: {
    key: 'dataset',
    value: 'Dataset',
  },
  TRANSFORM: {
    key: 'transform',
    props: {
      SELECTFIELDS: {
        key: 'selectfields',
        value: 'SelectFields',
      },
      CUSTOMIZE: {
        key: 'customize',
        value: 'Customize',
      },
      JOIN: {
        key: 'join',
        value: 'Join',
      },
    },
    getList: () => Object.values(DATAFLOW_TYPE.TRANSFORM.props),
  },
  TARGET: {
    key: 'target',
    PROPERTIES: {
      key: 'properties',
    },
    OUTPUTDATA: {
      key: 'output-data',
    },
  },
  NEWNODE: {
    key: 'new node',
  },
};

// forIcons
export const InnerJoinIcon = {};
