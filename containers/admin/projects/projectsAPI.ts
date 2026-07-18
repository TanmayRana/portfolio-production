import { doGetApiCall, doPostApiCall, doPutApiCall, doDeleteApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";
import { Project } from "./Hooks";

export const fetchProjectsDataAPI = async () => {
  return await doGetApiCall({ url: endPoints.admin.projects });
};

export const saveProjectDataAPI = async (data: Partial<Project>) => {
  const isEdit = !!data.id;
  if (isEdit) {
    return await doPutApiCall({
      url: endPoints.admin.projects,
      bodyData: data,
    });
  } else {
    return await doPostApiCall({
      url: endPoints.admin.projects,
      bodyData: data,
    });
  }
};

export const deleteProjectDataAPI = async (id: string) => {
  return await doDeleteApiCall({
    url: `${endPoints.admin.projects}?id=${id}`,
  });
};
