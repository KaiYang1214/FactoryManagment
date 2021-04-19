/**
 * useListQuery
 * 會幫忙帶上 pagination & sorter 所以有關列表的呼叫可以用這隻
 */
import React from 'react';
import Axios from 'axios';
import apiErrorHandle from "@/utils/apiErrorHandle";

const PAGINATION = {
  current: 1,
  pageSize: 10,
  total: 0,
};


const transformSorter = (antdSorter) => ({
  sortField: antdSorter.field,
  sortType: antdSorter.order === 'ascend' ? 'asc' : 'desc',
});

/**
 * userListQuery
 * @param {any} defaultResponse 預設從 api 回傳的格式
 * @param {Pagination} defaultPagination 分頁資訊
 * @param {Sorter} defaultSorter 排序資訊
 * @param {boolean} useDefaultConfig 要不要使用預設的 baseurl 跟 auth token
 */
const useListQuery = (defaultResponse, globalSettingStore = null, defaultPagination = PAGINATION, defaultQuery = {}, defaultQueryConfig = {}, defaultSorter = SORTER, useDefaultConfig = true) => {
  const defaultConfig = {
    withCredentials: true,
  };
  if (sessionStorage.accessToken) {
    defaultConfig.headers = { Authorization: sessionStorage.accessToken };
  }
  const axios = Axios.create(useDefaultConfig ? defaultConfig : {});
  const [pagination, setPagination] = React.useState(defaultPagination);
  const [sorter, setSorter] = React.useState(defaultSorter);
  const [isLoading, setIsLoading] = React.useState(false);
  const [response, setResponse] = React.useState(defaultResponse);
  const [error, setError] = React.useState();
  const [query, setQuery] = React.useState(defaultQuery);
  const [queryConfig, setQueryConfig] = React.useState(defaultQueryConfig);

  const data = { pagination, sorter, query };

  const req = async (config = { ...queryConfig, data }) => {
    let responseData = defaultResponse;
    try {
      if (globalSettingStore) {
        globalSettingStore.setSettingData((e) => ({ ...e, isLoading: true }));
      }
      const { data: d } = await axios(config);
      responseData = d;

      const { pagination: p } = d;
      setPagination({ ...pagination, ...p });
      setResponse(responseData);
    } catch (e) {
      setError(e);
      console.log(e);
      apiErrorHandle(e.response.status);
    } finally {
      setIsLoading(false);
      if (globalSettingStore) {
        globalSettingStore.setSettingData((p) => ({ ...p, isLoading: false }));
      }
      // eslint-disable-next-line no-unsafe-finally
    }
    return responseData;
  };

  /**
   * exec
   * 第一次 query 的時候呼叫這隻
   * @param {AxiosConfig} axiosConfig
   */
  const exec = async (axiosConfig = {}, changePagination = null) => {
    setPagination(changePagination || defaultPagination);
    setSorter(SORTER);
    setIsLoading(true);
    setQuery({ ...axiosConfig.data });
    setQueryConfig({ ...axiosConfig, data: {} });

    const config = {
      ...axiosConfig,
      data: { pagination: changePagination || defaultPagination, sorter: transformSorter(SORTER), query: axiosConfig.data },
    };
    return req(config);
  };


  /**
   * onTableChange
   * @param {object} pagin pagination
   * @param {object} filter filter
   * @param {object} sor sorter
   */
  const onTableChange = async (pagin, changeQuery, filter, sor) => {
    setIsLoading(true);
    const config = { ...queryConfig, data: { query: changeQuery || query } };
    if (pagin) {
      setPagination({ ...pagination, ...pagin });
      config.data.pagination = pagin;
    }
    if (sor) {
      setSorter(sor);
      config.data.sorter = transformSorter(sor);
    }
    return req(config);
  };

  const tableProps = {
    onChange: onTableChange,
    dataSource: response.result,
    loading: isLoading,
    pagination,
  };

  return {
    exec,
    response,
    isLoading,
    error,
    pagination,
    sorter,
    query,
    tableProps,
    queryConfig,
  };
};

export default useListQuery;
