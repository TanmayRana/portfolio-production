import { doGetApiCall, doPostApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";

export const getHeroAPI = async () => {
  return await doGetApiCall({ url: endPoints.hero });
};

export const postHeroAPI = async (bodyData: any) => {
  return await doPostApiCall({ url: endPoints.admin.hero, bodyData });
};
