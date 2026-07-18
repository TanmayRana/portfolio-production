import { doGetApiCall, doPostApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";
import { ContactFormData } from "./contactReducer";
// import { ContactFormData } from "./contactReducer";

export const fetchContactDataAPI = async () => {
  return await doGetApiCall({ url: endPoints.admin.contact });
};

export const submitContactFormAPI = async (data: ContactFormData) => {
  return await doPostApiCall({
    url: endPoints.admin.contact,
    bodyData: data,
  });
};
