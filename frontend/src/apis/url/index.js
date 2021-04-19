const ATLAS_QUERY = {
  GET_ENTITY_LIST_FROM_ATLAS: '/basic',
  GET_TERM: '/queryTerm',
  GET_USER_SELECT_TABLE: '/findData/getTemp',
  SAVE_SELECT_ETL: '/findData/saveTemp',
};

const ETL = {
  GET_ETL_LIST: '/etl/list',
  GET_SQL: '/etl/parsingDiagram',
  SAVE_ETL: '/etl/save',
  DELETE_ETL: '/etl/delete',
  UPDATE_ETL: '/etl/update',
  GET_DETAIL: '/etl',
  GET_SHARE_LIST: '/etl/share/list',
  SHARE_ETL: '/etl/share',
  GET_SHARE_DETAIL: '/etl/share/{id}',
  SET_ETL_EDIT: '/etl/edit',
  CANCEL_ETL_EDIT_STATUS: '/etl/edit/cancel',
};

const EVIDENCE = {
  VERIFY: '/evidence/verify',
};

const METADATA = {
  GET_USER_TABLE: '/metadata/getUserDefineTable',
  GET_USER_TABLE_SCHEMA: '/metadata/getUserDefineTableSchema',
  GET_COLUMN_TYPE: '/metadata/getColumnType',
  GET_USER_DEFINED_LIST: '/metadata/query',
  GRANT_USER_DEFINED_PERMISSION: '/metadata/chagneStatus',
};

const NIFI_DEPLOY = {
  CONSUME_TABLE: '/nifiDeploy/consume',
};

const PREVIEW = {
  PREVIEW_ETL: '/preview/etl',
  PREVIEW_TABLE: '/preview/table',
  PREVIEW_CHECK: '/preview/check',
  PREVIEW_CHECKS: '/preview/checkTables',
};

const ROLE = {
  GET_ROLES: '/getUserRoles',
};

const TABLE_AUTH = {
  TABLE_APPLY: '/table/apply',
  GET_APPROVE_LIST: '/table/queryUserAllowed',
  GRANT_PERMISSION: '/table/chagneAllowed',
  GET_USER_ALLOWED: '/table/getUserAllowedTable',
  TABLE_DELETE: '/table/delete',
  ALLOWED_TABLE: '/table/getUserAllowedTable',
};

const TABLE_INFO = {
  GET_HEALTH: '/tableInfo',
  EDIT_DESCRIPTION: '/tableInfo/alterComment',
  GET_TABLE_LINEAGE: '/tableInfo/lineage',
  GET_TABLE_COLUMNS: '/tableInfo/getByGroupId',
  GET_TABLE_COLUMNS_BY_NAME: '/tableInfo/getByName',
};

const TABLE_ON_CHAIN_STATUS = {
  GET_TABLE_INFO: '/tableOnChainStatusList',
};

const USER = {
  USER_SEARCH: '/user/search',
  USER_LIST_SEARCH: '/userList/search',
  USER_LIST_UPDATE: '/userList/update',
};

const USER_DEFINE = {
  USER_UPLOAD: '/userDefine/userUpload',
  METADATA_ADD_FILE: '/userDefine/metadataAndFile',
  METADATA: '/userDefine/metadata',
  GET_UPLOAD_HISTORY: '/userDefine/uploadHistory',
  TABLE_ADD_FILE: '/userDefine/tableAndFile',
  COLUMN_BY_FILE_ETL: '/userDefine/getColumnByFile',
  COLUMN_BY_SCHEMA_FILE_ETL: '/userDefine/getColumnSchemaByFile',
};

const USER_GROUP = {
  GET_GROUPS: '/group',
  GET_GROUP_TABLE: '/group/tables/{groupId}',
  GET_GROUP_MEMBER: '/group/member/{groupId}',
  UPDATE_MEMBER: '/group/user/{groupId}',
  GET_ALL_GROUPS: '/group/all',
  GET_NORMAL_GROUPS: '/group/byOwner/undefined',
  SET_GROUP_ALLOW: '/group/allow/{groupId}',
  SET_GROUP_REJECT: '/group/reject/{groupId}',
};

const USER_TAG = {
  GET_CATEGORY: '/category/list',
};

const FLOW = {
  SYNC_TABLE: '/flow/syncTable',
  TEST_CONN: '/flow/testConn',
  GET_SYNC_RECORD: '/flow/getSyncRecord',
  GET_LIST_SYNC_RECORD: '/flow/listSyncRecord',
};

const NOTIFY = {
  GET_UNREAD_COUNT: '/notify/getUnReadCount',
  GET_MESSAGE: '/notify/getMessage',
  CHANGE_MSG_STATUS: '/notify/changeMessageStatus',
  SET_READ_ALL: '/notify/setReadAll',
};

const DATAFLOW = {
  ETL_SAVE: '/dataflow/save',
  GET_DATAFLOW_LIST: '/dataflow/list',
  GET_DATAFLOW_DETAIL: '/dataflow',
  SET_DATAFLOW_STATUS: '/dataflow/edit',
  CHECK_DATAFLOW_LOCKED: '/dataflow/checklock',
  DELETE_DATAFLOW: '/dataflow/delete',
  RUN_DATAFLOW: '/dataflow/run',
  VALIDATE_DATAFLOW: '/dataflow/validate',
  CANCEL_DATAFLOW_EDIT_STATUS: '/dataflow/edit/cancel',
  ETL_PREVIEW: '/dataflow/preview',
  GET_TARGETNODE: '/dataflow/targetNode',
  GET_TARGET_SCHEMAS: '/dataflow/targetSchemas',
  GET_OUTPUT_SCHEMA: '/dataflow/outputSchema',
};

const WORKFLOW = {
  SAVE_WORK_FLOW: '/workflow/save',
  GET_WORKFLOW_LIST: '/workflow/list',
  GET_WORKFLOW_DETAIL: '/workflow',
  CHECK_WORKFLOW_LOCKED: '/workflow/checklock',
  WORKFLOW_EDIT_STATUS: '/workflow/edit',
  CANCEL_WORKFLOW_EDIT_STATUS: '/workflow/edit/cancel',
  DELETE_WORKFLOW: '/workflow/delete',
  ACTIVE_WORKFLOW: '/workflow/activate',
  DEACTIVE_WORKFLOW: '/workflow/deactivate',
  GET_DATAFLOW_BY_GROUP: '/workflow/dataflowByGroup',
  GET_TARGET_MAPPING: '/workflow/targetMapping',
  RUN_WORKFLOW: '/workflow/run',
  TEST_CONNECT: '/workflow/testConnection',
  GET_TARGET_SCHEMAS: '/dataflow/targetSchemas',
  TABLE_NAME_DUPLICATED: '/workflow/tableName/duplicated',
};

const LOGIN = {
  GET_TOKEN: '/token/callback',
  GET_TOKEN_DIRECTLY: '/token/callback/directly'
};

export {
  ATLAS_QUERY,
  ETL,
  EVIDENCE,
  METADATA,
  NIFI_DEPLOY,
  PREVIEW,
  ROLE,
  TABLE_AUTH,
  TABLE_INFO,
  TABLE_ON_CHAIN_STATUS,
  USER,
  USER_DEFINE,
  USER_GROUP,
  USER_TAG,
  FLOW,
  NOTIFY,
  DATAFLOW,
  WORKFLOW,
  LOGIN
};
