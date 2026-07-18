import { doGetApiCall, doPostApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";
import { HeroFormData } from "./heroReducer";

export const fetchHeroDataAPI = async () => {
  return await doGetApiCall({ url: endPoints.admin.hero });
};

export const submitHeroFormAPI = async (data: HeroFormData) => {
  return await doPostApiCall({
    url: endPoints.admin.hero,
    bodyData: data,
  });
};
