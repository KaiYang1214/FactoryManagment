/* eslint-disable no-nested-ternary */
import React from "react";
import { Select } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { getstoreUserInfo } from "@/utils/common";
import * as Style from "./style";

export const columnStyle = {
  fontSize: "14px",
  paddingLeft: "24px",
  fontFamily: "Arial",
  color: "#333333",
};


export const getColumns = (handleChange, payLoad, haveAuth) => {
  const { t } = useTranslation();
  const userData = getstoreUserInfo();
  return (
    [
      {
        title: <div>{t(`LISTUSER.NAME`)}</div>,
        dataIndex: "name",
        key: "name",
        width: "13%",
        align: "left",
        fixed: "left",
        ellipsis: true,
        sorter: () => { },
        sortOrder: payLoad.sortField === 'name' ? (payLoad.sortType === 'ASC' ? 'ascend' : 'descend') : false,
        render: (value) => ({
          children: value,
          props: {
            style: columnStyle,
          },
        }),
      },
      {
        title: <div>{t(`Account`)}</div>,
        dataIndex: "employeeId",
        key: "employeeId",
        width: "8%",
        align: "left",
        sortOrder: payLoad.sortField === 'employeeId' ? (payLoad.sortType === 'ASC' ? 'ascend' : 'descend') : false,
        sorter: () => { },
        render: (value) => ({
          children: value,
          props: {
            style: columnStyle,
          },
        }),
      },
      {
        title: <div>{t(`LISTUSER.PERMISSION`)}</div>,
        dataIndex: "permission",
        key: "permission",
        width: "13%",
        align: "left",
        sortOrder: payLoad.sortField === 'permission' ? (payLoad.sortType === 'ASC' ? 'ascend' : 'descend') : false,
        render: (value, record) => {
          const onChange = (e) => {
            handleChange(e, record.employeeId);
          }
          return (
            <>
              {
               haveAuth ? (
                 <Select value={value} style={{ width: 240 }} onChange={onChange} disabled={userData.emplId === record.employeeId}>
                   <Select.Option value="admin">Admin</Select.Option>
                   <Select.Option value="user">User</Select.Option>
                 </Select>
                )
                  : (
                    <div>{value}</div>
                  )
              }
            </>
          )
        }
        ,
      },
    ]
  );
};
