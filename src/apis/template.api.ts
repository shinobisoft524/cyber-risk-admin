import { PostApi } from './instance.api';

export const createTemplateApi = async (data: unknown) => {
  return await PostApi(`/api/template/create`, { reqData: data });
};
