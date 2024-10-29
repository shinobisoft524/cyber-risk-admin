import { IStandardReq } from '@/cmodels';
import { FPostApi } from './instance.api';

export const createOrganisationApi = async (data: unknown) => {
  return await FPostApi(`/api/organisation/create`, { reqData: data });
};

export const createOrganisationLogoApi = async (data: unknown) => {
  return await FPostApi(`/api/organisation/createLogo`, { reqData: data }, 'enc');

  // const res = await fetch('http://localhost:3001/api/v1/file/uploadOrganisationLogo', {
  //   method: 'post',
  //   // duplex: 'half',
  //   // headers: isNoJson
  //   //   ? { 'Content-Type': 'multipart/form-data' }
  //   //   : {
  //   //       'Content-Type': 'application/json',
  //   //     },
  //   body: data,
  // });
  // return res.json();
};

export const getOrganisationLogoUrlApi = async (data: unknown) => {
  return await FPostApi(`/api/organisation/getOrganisationLogoUrl`, { reqData: data });
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
