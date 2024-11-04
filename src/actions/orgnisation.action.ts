import {
  createOrganisationApi,
  createOrganisationAssessmentApi,
  createOrganisationLogoApi,
  getOrganisatioAssessmentDetailApi,
  getOrganisationDetailApi,
  getOrganisationListApi,
  getOrganisationLogoUrlApi,
} from '@/apis/organisation.api';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { ICurrentOrganisationType, setCurrentOrganisation, setList } from '@/store/organisation';
import { IOrganisationAssessmentDetailReq, IStandardReq } from '@/cmodels';
import { commonAction } from './common';

export async function createOrganisationAction(
  reqData: IStandardReq<ICurrentOrganisationType>,
  _dispatch: Dispatch<AnyAction>
) {
  return commonAction(createOrganisationApi, reqData, _dispatch);
}

export async function createOrganisationLogoAction(
  reqData: IStandardReq<{
    id: number;
    logo: string;
  }>,
  _dispatch: Dispatch<AnyAction>
) {
  return commonAction(createOrganisationLogoApi, reqData, _dispatch);
}

export async function getOrganisationLogoUrlAction(
  reqData: IStandardReq<{
    id: number;
  }>,
  _dispatch: Dispatch<AnyAction>
) {
  return commonAction(getOrganisationLogoUrlApi, reqData);
}

export async function createOrganisationAssessmentAction(
  reqData: IStandardReq<{
    organisationId: number;
    value: {
      id: number;
      templateId: number;
    }[];
  }>,
  _dispatch: Dispatch<AnyAction>
) {
  return commonAction(createOrganisationAssessmentApi, reqData, _dispatch);
}

export async function getOrganisationListAction(
  reqData: IStandardReq<{
    filter: any;
  }>,
  _dispatch: Dispatch<AnyAction>
) {
  return commonAction(getOrganisationListApi, reqData, _dispatch, setList);
}

export async function getOrganisationDetailAction(
  reqData: IStandardReq<{
    id: number;
  }>,
  _dispatch: Dispatch<AnyAction>
) {
  return commonAction(getOrganisationDetailApi, reqData, _dispatch, setCurrentOrganisation);
}

export async function getOrganisatioAssessmentDetailAction(
  reqData: IStandardReq<IOrganisationAssessmentDetailReq>,
  _dispatch: Dispatch<AnyAction>
) {
  return commonAction(getOrganisatioAssessmentDetailApi, reqData, _dispatch);
}
