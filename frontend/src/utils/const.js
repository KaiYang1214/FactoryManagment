/* eslint-disable camelcase */
export const STAGES = ["Pilot Run", "MP", "RFQ", "Closed"];

export const ALL_FUNCTION_PATH = ["SIV", "POWER", "RF", "EMC", "EE"];

export const USER_ROLE = {
  ee: "ee",
  owner: "owner",
  contactWindow: "window",
  admin: "admin"
};

export const ELLIPSIS_STYLE = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
};

export const CATEGORY = {
  RequestForm: "RequestForm",
  Summary: "Summary",
  ProjectInfo: "ProjectInfo",
  TestItem: "TestItem",
};

export const MENU_CATEGORY = {
  Summary: "Summary",
  ProjectInfo: "ProjectInfo",
  TestItem: "TestItem",
  RequestForm: "RequestForm",
  ProjectInfoCreate: "ProjectInfoCreate",
};

export const TAB_CATEGORY = {
  OnGoing: "OnGoing",
  Closed: "Closed",
  New: "New",
};

export const REQUEST_TYPE = {
  stage: "C3/C4 Stage",
  source: "2nd Source",
};

export const LABORATORY_PHONE = [
  'WHC / 447361/447427',
  'WZS / 8560-3665',
  'WKS / 8568-5696'
];

export const BUTTON_SUBMIT = {
  Cancelled: 'Cancelled',
  Submit: 'Submit',
  Reject: 'Reject',
  Approve: 'Approve',
  ReApprove: 'ReApprove',
  Clear: 'Clear',
  Search: 'Search',
};

export const BUTTON_EDIT = {
  cancel: "Cancel",
  save: "Save",
  edit: "Edit",
};

export const REQUEST_STATUS = {
  Open: "open",
  WaitApprove: "waitapprove",
  Approved: "approved",
  Cancelled: "cancelled",
  Rejected: "rejected",
  Closed: "closed"
};

export const TOPBAR_TYPE = {
  RequestForm: "RequestForm",
  RequestList: "AllProject",
  Dashboard: "Dashboard",
  TeamAd: "MemberSetting",
};

export const TOPBAR_MENU = {
  DataPipeline: "DataPipeline",
  Group: "Group",
  Settings: "Settings",
  CreatePipeline: "/app/pipeline/create",
  TablePermission: "/app/pipeline/permission",
  Workspace: "/app/pipeline/workspace",
  Management: "/app/group/management",
  Permission: "/app/group/permission",
  ListUsers: "/app/ListUser",
  Logout: "Logout",
  Download: "Download",
  Bell: "Bell",
};

export const DESIGN_INFO_KEYS = {
  impedanceMainsource: 'IMPEDANCE_MAIN_SOURCE',
  memorybusBus: 'MEMORY_BUS',
  memorybusSpeed: 'MEMORY_BUS_SPEED',
  pciExpress: 'PCI_EXPRESS',
  hdmiLevelShift: 'HDMI_LEVEL_SHIFT',
  hdmiSupportDeepColor: 'HDMI_SUPPORT_DEEP_COLOR',
  displayportSpeed: 'DISPLAY_PORT_SPEED',
  displayportSsc: 'DISPLAY_PORT_SSC',
  edpSpeed: 'EDP_SPEED',
  edpLane: 'EDP_LANE',
  edpSsc: 'EDP_SSC',
  cardreaderSpeed: 'CARD_READER_SPEED',
};

export const OVERALL_LIGHT = {
  Gray: 'gray',
  Red: 'red',
  Orange: 'orange',
  Green: 'green',
};

export const RF_ANTENNA_TYPE = [
  {
    id: 'Type 1',
    name: 'Type 1'
  },
  {
    id: 'Type 2',
    name: 'Type 2'
  },
  {
    id: 'Type 3a',
    name: 'Type 3a'
  },
  {
    id: 'Type 3b',
    name: 'Type 3b'
  },
  {
    id: 'Type 4',
    name: 'Type 4'
  },
  {
    id: 'Type 5a',
    name: 'Type 5a'
  },
  {
    id: 'Type 5b',
    name: 'Type 5b'
  },
  {
    id: 'Type 5c',
    name: 'Type 5c'
  },

  {
    id: 'Type 6',
    name: 'Type 6'
  },
  {
    id: 'Type 7a',
    name: 'Type 7a'
  },
  {
    id: 'Type 7b',
    name: 'Type 7b'
  },
  {
    id: 'Type 7c',
    name: 'Type 7c'
  },
];

export const CRITICAL_ISSUE_HIGHLIGHT = {
  open: 'Open',
  closed: 'Closed',
};

export const TEST_ITEM_TAB = [
  {
    key: 'Total',
    value: 'Total',
    isDisable: false,
  },
  {
    key: 'Pass',
    value: 'Pass',
    isDisable: false,
  },
  {
    key: 'Fail',
    value: 'Fail',
    isDisable: false,
  },
  {
    key: 'EMPTY',
    value: 'EMPTY',
    isDisable: false,
  }
];
