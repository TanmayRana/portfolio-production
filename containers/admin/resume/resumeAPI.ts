import { doGetApiCall, doPostApiCall, doDeleteApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";

export const fetchResumeDataAPI = async () => {
  return await doGetApiCall({ url: endPoints.admin.resume });
};

export const saveResumeDataAPI = async (data: { fileUrl: string; fileName: string }) => {
  return await doPostApiCall({
    url: endPoints.admin.resume,
    bodyData: data,
  });
};

export const deleteResumeDataAPI = async (id: string) => {
  return await doDeleteApiCall({
    url: `${endPoints.admin.resume}?id=${id}`,
  });
};
