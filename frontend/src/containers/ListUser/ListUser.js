/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Spin } from 'antd'
import useAxios from "@/hooks/useAxios.js";
import { UserApi } from '@/apis';
import { useQuery } from '@/hooks';
import { MainTitle, ContainerItem } from "@/components/atoms/Common";
import LoadingMask from "@/components/compos/LoadingMask";
import { getstoreUserInfo } from "@/utils/common";
import TopBar from "@/components/compos/TopBar";
import { getColumns } from "./columns.js";
import { defaultPagination, defaultPayLoad } from "./initialState.js";

import * as Style from "./style";

const ListUser = ({ history }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState(defaultPagination);
  const [payLoad, setPayLoad] = useState(defaultPayLoad);
  const [searchValueState, setSearchValueState] = useState('');
  const [haveAuth, setHaveAuth] = useState(false);

  const userData = getstoreUserInfo();
  const getUserList = useQuery(UserApi.getUserList);
  const updateUserList = useQuery(UserApi.updateUserList);

  const getTabaleData = async (tempPayLoad, tempPagination) => {
    setLoading(true);
    const data = {
      searchKey: searchValueState,
      pagination: tempPagination,
      sorter: tempPayLoad
    };
    try {
      const response = await getUserList.exec(data);
      setTableData(response.result.userList);
      setPagination(response.pagination);
      setHaveAuth(userData.role === 'admin')
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (value, employeeId) => {
    const data = {
      employeeId,
      role: value
    };
    try {
      const response = await updateUserList.exec(data);
    } catch (e) {
      console.log(e);
    } finally {
      getTabaleData(payLoad, pagination);
    }

  };

  const handleSearch = () => {
    getTabaleData(payLoad, defaultPagination);
  };

  const onChangeSort = (page, filters, sorter) => {
    let tempPayLoad = {};
    if (payLoad.sortField === sorter.field) {
      tempPayLoad = {
        sortField: payLoad.sortField,
        sortType: payLoad.sortType === "ASC" ? 'DESC' : 'ASC' // 排序方式
      };
    } else {
      tempPayLoad = {
        sortField: sorter.field,
        sortType: 'ASC'
      };
    }
    setPayLoad(tempPayLoad);
    getTabaleData(tempPayLoad, defaultPagination);
  };

  const handleOnChange = (e) => {
    setSearchValueState(e.target.value);
  };

  const columns = getColumns(handleChange, payLoad, haveAuth);

  const onChangePage = (page, pageSize) => {
    const tempPagination = {
      current: page,
      pageSize: pagination.pageSize,
      total: 1000,
    }
    getTabaleData(payLoad, tempPagination);
    setPagination(tempPagination);
  };

  useEffect(() => {
    getTabaleData(payLoad, pagination);
  }, [])

  return (
    <>
      <TopBar path="/app/ListUser" />
      <Style.Container>
        <Spin spinning={loading}>
          <Style.MainTitle>{t('LISTUSER.TITLE')}</Style.MainTitle>
          <ContainerItem marginTop={18} style={{ padding: "0px" }} noLightbar="none">
            <Style.SearchContainer>
              <Style.PJSearch
                placeholder={t('COMMON.SEARCH_KEYWORD')}
                suffix={
                  <SearchOutlined style={{ fontSize: "16px", marginRight: "14px" }} />
                    }
                onChange={handleOnChange}
                value={searchValueState}
                onSearch={handleSearch}
                  />
            </Style.SearchContainer>
            <Style.TableContent
              columns={columns}
              dataSource={tableData}
              pagination={false}
              onChange={onChangeSort}
                />
            <Style.TablePagination current={pagination.current} total={pagination.total} onChange={onChangePage} />
          </ContainerItem>
        </Spin>
      </Style.Container>
    </>
  );
};

export default ListUser;
