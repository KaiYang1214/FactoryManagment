import axios, { CancelToken } from "axios";
import { message as Message } from "antd";
import env from "@/utils/env";

const API_CONFIG = {
  baseURL: env.notifyUrl,
  timeout: 600000,
  token: 'X6WhAHvJdbhod51EH60nteqUC6Gx4rvHgRJqv4d8XkB',
};



class AxiosApiClient {
  constructor(apiConfig) {
    this.axiosInstance = axios.create({ ...API_CONFIG, ...apiConfig });
  }

  setHeader(headerObject = null) {

    const defaultHeaders = {
      Authorization: `Bearer ${API_CONFIG.token}`,
      'Content-Security-Policy': 'upgrade-insecure-requests',
      // 'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Origin': 'https://notify-api.line.me/api',
    };
    this.axiosInstance.defaults.headers = {
      ...defaultHeaders,
      ...headerObject,
    };
  }

  instance() {
    return this.axiosInstance;
  }

  get({ url, payload, config }) {
    this.setHeader(config.header);
    const source = CancelToken.source();
    return {
      send: () =>
        this.axiosInstance
          .get(url, {
            params: { ...payload },
            ...config,
            cancelToken: source.token,
          })
          .catch(this.onError),
      cancel: source.cancel,
    };
  }

  post({ url, payload, config }) {
    this.setHeader(config.header);
    const source = CancelToken.source();
    return {
      send: () =>
        this.axiosInstance
          .post(url, payload, { ...config, cancelToken: source.token })
          .catch(this.onError),
      cancel: source.cancel,
    };
  }

  delete({ url, payload, config }) {
    this.setHeader(config.header);
    const source = CancelToken.source();
    return {
      send: () =>
        this.axiosInstance
          .delete(url, payload, { ...config, cancelToken: source.token })
          .catch(this.onError),
      cancel: source.cancel,
    };
  }

  put({ url, payload, config }) {
    this.setHeader(config.header);
    const source = CancelToken.source();
    return {
      send: () =>
        this.axiosInstance
          .put(url, payload, { ...config, cancelToken: source.token })
          .catch(this.onError),
      cancel: source.cancel,
    };
  }

  patch(...args) {
    this.setHeader();
    return this.axiosInstance.patch(...args).catch(this.onError);
  }

  handlerError({ onError = () => {}, isShowError = true }) {
    return (e) => {
      onError(e);
      this.onError(e, isShowError);
    };
  }

  postFile(
    url,
    payload,
    header = { "Content-Type": "application/json" },
    config
  ) {
    this.setHeader(header, "blob");
    const source = CancelToken.source();
    return {
      send: () =>
        this.axiosInstance
          .post(...[url, payload], { cancelToken: source.token, ...config })
          .catch(this.onError),
      cancel: source.cancel,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  async onError(error, isShowError = true) {
    if (axios.isCancel(error)) {
      // console.warn("canceled");
    } else {
      let statudCode = 500;
      let errorKey = "SYSTEM_ERROR";
      let errorCode = 0;
      let errorData = {};
      let errorMessage = "";
      if (error.response) {
        statudCode = error.response.status;
        errorKey =
          error.response.data && error.response.data.errorMsg
            ? error.response.data.errorMsg
            : errorKey;
        errorData = error.response.data;
        // eslint-disable-next-line prefer-destructuring
        errorCode = error.response.data.errorCode;
        errorMessage = error.response.data.message;
      } else if (error.request) {
        statudCode = error.request.status;
      }

      const errorObj = {
        status: statudCode,
        errorKey,
        errorData,
        errorCode,
        errorMessage,
      };

      let message = "";
      if (statudCode === 400) {
        if (error.response && error.response.data.errorMsg) {
          message = error.response.data.errorMsg;
        } else {
          message = "System Error";
        }

        if (isShowError) {
          Message.error(message);
        }
      }

      if (statudCode === 401) {
        message = "Token Expired";

        window.location.href = `${window.location.origin}`;
      }

      if (statudCode === 403) {
        message = "Forbidden";
        if (error.response) {
          message = error.response.data.message || message;
        }
        if (isShowError) {
          Message.error(message);
        }
      }

      if (statudCode === 422) {
        if (error.response) {
          if (error.response.data instanceof Blob) {
            message = JSON.parse(await error.response.data.text()).errorMsg;
          } else {
            message = error.response.data.errorMsg;
          }
        }

        if (isShowError) {
          Message.error(message);
        }
      }

      if (!message) {
        if (error.response) {
          // eslint-disable-next-line prefer-destructuring
          message = error.response.data.message;
        }

        if (isShowError) {
          Message.error(message || "System Error");
        }
      }

      throw new Error(JSON.stringify(errorObj));
    }
  }
}

export default AxiosApiClient;
