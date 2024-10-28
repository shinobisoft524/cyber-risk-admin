import { FPostApi } from './instance.api';

export const createOrganisationApi = async (data: unknown) => {
  return await FPostApi(`/api/organisation/create`, { reqData: data });
};

export const createOrganisationAssessmentApi = async (data: unknown) => {
  return await FPostApi(`/api/organisation/createOrganisationAssessment`, { reqData: data });
};

export const getOrganisationListApi = async (data: unknown) => {
  return await FPostApi(`/api/organisation/list`, { reqData: data });
};

export const getOrganisationDetailApi = async (data: unknown) => {
  return await FPostApi(`/api/organisation/detail`, { reqData: data });
};

export const getOrganisatioAssessmentDetailApi = async (data: unknown) => {
  return await FPostApi(`/api/organisation/assessmentDetail`, { reqData: data });
};
