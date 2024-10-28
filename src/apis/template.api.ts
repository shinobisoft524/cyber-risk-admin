import { FPostApi } from './instance.api';

export const createTemplateApi = async (data: unknown) => {
  return await FPostApi(`/api/template/create`, { reqData: data });
};

export const getTemplateListApi = async (data: unknown) => {
  return await FPostApi(`/api/template/list`, { reqData: data });
};

export const getTemplateDetailApi = async (data: unknown) => {
  return await FPostApi(`/api/template/detail`, { reqData: data });
};

export const createTemplatDataApi = async (data: unknown) => {
  return await FPostApi(`/api/template/createData`, { reqData: data });
};

export const getTemplatDataApi = async (data: unknown) => {
  return await FPostApi(`/api/template/getData`, { reqData: data });
};
