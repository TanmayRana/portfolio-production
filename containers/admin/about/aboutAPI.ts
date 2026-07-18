import { doGetApiCall, doPostApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";
import { AboutFormData } from "./aboutReducer";
// import { AboutFormData } from "./aboutReducer";

export const fetchAboutDataAPI = async () => {
  return await doGetApiCall({ url: endPoints.admin.about });
};

export const submitAboutFormAPI = async (data: AboutFormData) => {
  return await doPostApiCall({
    url: endPoints.admin.about,
    bodyData: data,
  });
};
