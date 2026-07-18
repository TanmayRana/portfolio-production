import { doGetApiCall, doPostApiCall, doPutApiCall, doDeleteApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";
import { WorkExperience } from "./Hooks";

export const fetchWorkExperienceDataAPI = async () => {
  return await doGetApiCall({ url: endPoints.admin.workExperience });
};

export const saveWorkExperienceDataAPI = async (data: Partial<WorkExperience>) => {
  const isEdit = !!data.id;
  if (isEdit) {
    return await doPutApiCall({
      url: endPoints.admin.workExperience,
      bodyData: data,
    });
  } else {
    return await doPostApiCall({
      url: endPoints.admin.workExperience,
      bodyData: data,
    });
  }
};

export const deleteWorkExperienceDataAPI = async (id: string) => {
  return await doDeleteApiCall({
    url: `${endPoints.admin.workExperience}?id=${id}`,
  });
};
