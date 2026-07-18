import { doGetApiCall, doPostApiCall, doPutApiCall, doDeleteApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";
import { MyExperienceFormData } from "./myExperienceReducer";

export const fetchMyExperienceDataAPI = async () => {
  return await doGetApiCall({ url: endPoints.admin.myExperience });
};

export const addMyExperienceAPI = async (data: MyExperienceFormData) => {
  return await doPostApiCall({
    url: endPoints.admin.myExperience,
    bodyData: data,
  });
};

export const updateMyExperienceAPI = async (data: { id: string } & MyExperienceFormData) => {
  return await doPutApiCall({
    url: endPoints.admin.myExperience,
    bodyData: data,
  });
};

export const deleteMyExperienceAPI = async (id: string) => {
  return await doDeleteApiCall({
    url: `${endPoints.admin.myExperience}?id=${id}`,
  });
};
