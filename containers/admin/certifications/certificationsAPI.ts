import { doGetApiCall, doPostApiCall, doPutApiCall, doDeleteApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";
import { Certification } from "./Hooks";

export const fetchCertificationsDataAPI = async () => {
  return await doGetApiCall({ url: endPoints.admin.certifications });
};

export const saveCertificationDataAPI = async (data: Partial<Certification>) => {
  const isEdit = !!data.id;
  if (isEdit) {
    return await doPutApiCall({
      url: endPoints.admin.certifications,
      bodyData: data,
    });
  } else {
    return await doPostApiCall({
      url: endPoints.admin.certifications,
      bodyData: data,
    });
  }
};

export const deleteCertificationDataAPI = async (id: string) => {
  return await doDeleteApiCall({
    url: `${endPoints.admin.certifications}?id=${id}`,
  });
};
