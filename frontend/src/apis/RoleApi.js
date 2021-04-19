import { ROLE } from './url';
import AxiosApiClient from './AxiosApiClient';

const apiClient = new AxiosApiClient();

export const getRoles = async () => {
  const payload = {};
  const config = {};
  const { data } = await apiClient
    .get({ url: ROLE.GET_ROLES, payload, config })
    .send();
  return data;
};

export const getRolesHook = {
  url: ROLE.GET_ROLES,
  method: 'get',
  payload: {},
  data: [],
  config: {},
};
