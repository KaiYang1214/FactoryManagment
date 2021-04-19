import React, { useEffect } from 'react';
import { Result, Spin } from 'antd';
import { RoleApi } from '@/apis';
import { ROLE_TYPE } from '@/constants/index';
import { useQuery } from '@/hooks';
import { MasterTableList } from './components';
import * as Style from '../style';

const Permission = () => {
  const getRolesQuery = useQuery(RoleApi.getRolesHook);

  useEffect(() => {
    getRolesQuery.exec();
  }, []);

  return (
    <>
      <Style.MainTitle>Permission</Style.MainTitle>
      <div className="group-permission">
        <Spin spinning={getRolesQuery.isLoading}>
          {getRolesQuery.data.includes(ROLE_TYPE.MASTER) ? (
            <MasterTableList />
          )
            : (
              <Result
                status="403"
                title="No permission"
                subTitle="Sorry, you are not authorized to access this page."
              />
            )}
        </Spin>
      </div>
    </>
  );
};

Permission.propTypes = {};

Permission.defaultProps = {};

export default Permission;
