import {ACCESS_TOKEN, REFRESH_TOKEN, TOKEN_EX_AT} from '@/constants';
import {storage} from '@/utils';
import axios from 'axios';
import queryString from 'query-string';

export const baseURL = 'https://api.fashional.pro';

export const axiosConfig = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
});
axiosConfig.interceptors.request.use(async config => {
  const token = await storage.getItem(ACCESS_TOKEN);
  config.headers.Authorization = `Bearer ${token}`;
  const {isRefresh, refreshToken} = await validateRefreshToken();
  if (isRefresh) {
    const response = await axios.post(`${baseURL}/v1/auth/refresh`, {
      refresh_token: refreshToken,
    });
    await storage.setItem(TOKEN_EX_AT, response.data.context.token_expired_at);
    await storage.setItem(ACCESS_TOKEN, response.data.context.accessToken);
    config.headers.Authorization = `Bearer ${response.data.context.accessToken}`;
  }
  return config;
});
const validateRefreshToken = async () => {
  let isRefresh = false;
  const tokenExAt = await storage.getItem(TOKEN_EX_AT);
  const refreshToken = await storage.getItem(REFRESH_TOKEN);
  if (!tokenExAt || !refreshToken) {
    return {isRefresh: false};
  }
  const date = new Date();
  const dateMilliseconds = date.getTime();
  const dateEx = new Date(tokenExAt);
  const dateExMilliseconds = dateEx.getTime();
  if (dateMilliseconds > dateExMilliseconds) {
    isRefresh = true;
  }
  return {
    isRefresh,
    refreshToken,
  };
};
