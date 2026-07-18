import { doGetApiCall, doPostApiCall, doPutApiCall, doDeleteApiCall } from "@/utils/apiConfig";
import { endPoints } from "@/utils/endPoints";

export const fetchSkillsDataAPI = async () => {
  return await doGetApiCall({ url: endPoints.admin.skills });
};

export const addCategoryDataAPI = async (data: { name: string; icon: string }) => {
  return await doPostApiCall({
    url: endPoints.admin.skillCategories,
    bodyData: data,
  });
};

export const deleteCategoryDataAPI = async (id: string) => {
  return await doDeleteApiCall({
    url: `${endPoints.admin.skillCategories}?id=${id}`,
  });
};

export const addSkillDataAPI = async (data: { name: string; level: number; categoryId: string }) => {
  return await doPostApiCall({
    url: endPoints.admin.skills,
    bodyData: data,
  });
};

export const deleteSkillDataAPI = async (id: string) => {
  return await doDeleteApiCall({
    url: `${endPoints.admin.skills}?id=${id}`,
  });
};

export const updateCategoryDataAPI = async (data: { id: string; name: string; icon: string }) => {
  return await doPutApiCall({
    url: endPoints.admin.skillCategories,
    bodyData: data,
  });
};

export const updateSkillDataAPI = async (data: { id: string; name: string; level: number; categoryId: string }) => {
  return await doPutApiCall({
    url: endPoints.admin.skills,
    bodyData: data,
  });
};
