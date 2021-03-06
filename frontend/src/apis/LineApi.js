import { LINE } from "./url";
import AxiosApiClient from "./AxiosApiClient";

const apiClient = new AxiosApiClient();

export const postNotify = async (message) => {
  const payload = {
    message
  };
  const config = {};
  const { data } = await apiClient
    .post({ url: LINE.POST_NOTIFY, payload, config })
    .send();
  return data;
};



export const getStatus = async () => {
  const { data } = await apiClient
    .get({
      url: `${LINE.GET_STATUS}`,
      payload: {},
      config: {},
    })
    .send();
  return data;
};
