import { PostApi } from './instance.api';

export const createTemplateApi = async (data: unknown) => {
  return await PostApi(`/api/template/create`, { reqData: data });
};

export const getTemplateListApi = async (data: unknown) => {
  return await PostApi(`/api/template/list`, { reqData: data });
};

export const getTemplateDetailApi = async (data: unknown) => {
  return await PostApi(`/api/template/detail`, { reqData: data });
};

export const createTemplatDataApi = async (data: unknown) => {
  return await PostApi(`/api/template/createData`, { reqData: data });
};

export const getTemplatDataApi = async (data: unknown) => {
  return await PostApi(`/api/template/getData`, { reqData: data });
};
