import axios from "axios";

const apiInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export const doGetApiCall = async (config: { url: string; params?: any }) => {
  try {
    const response = await apiInstance.get(config.url, { params: config.params });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const doPostApiCall = async (config: { url: string; bodyData?: any }) => {
  try {
    const response = await apiInstance.post(config.url, config.bodyData);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const doPutApiCall = async (config: { url: string; bodyData?: any }) => {
  try {
    const response = await apiInstance.put(config.url, config.bodyData);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const doDeleteApiCall = async (config: { url: string; params?: any }) => {
  try {
    const response = await apiInstance.delete(config.url, { params: config.params });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};
