import {
  createOrganisationApi,
  createOrganisationAssessmentApi,
  getOrganisatioAssessmentDetailApi,
  getOrganisationDetailApi,
  getOrganisationListApi,
} from '@/apis/organisation.api';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import {
  ICurrentOrganisationType,
  setCurrentOrganisation,
  setList,
} from '@/store/organisation/OrganisationSlice';
import { IOrganisationAssessmentDetailReq, IStandardReq } from '@/cmodels';

export async function createOrganisationAction(
  data: IStandardReq<ICurrentOrganisationType>,
  _dispatch: Dispatch<AnyAction>
) {
  return createOrganisationApi(data)
    .then((res: any) => {
      if (res.statusCode === 200 && !!res.data) {
        return res.data;
      } else {
        return false;
      }
    })
    .catch(() => {
      return false;
    });
}

export async function createOrganisationAssessmentAction(
  data: IStandardReq<{
    organisationId: number;
    value: {
      id: number;
      templateId: number;
    }[];
  }>,
  _dispatch: Dispatch<AnyAction>
) {
  return createOrganisationAssessmentApi(data)
    .then((res: any) => {
      if (res.statusCode === 200 && !!res.data) {
        return res.data;
      } else {
        return true;
      }
    })
    .catch(() => {
      return false;
    });
}

export async function getOrganisationListAction(
  data: ICurrentOrganisationType,
  _dispatch: Dispatch<AnyAction>
) {
  return getOrganisationListApi(data)
    .then((res: any) => {
      if (res.statusCode === 200 && !!res.data) {
        console.log(res.data);
        _dispatch(setList(res.data));
        return true;
      } else {
        _dispatch(setList([]));
        return false;
      }
    })
    .catch((res: any) => {
      _dispatch(setList([]));
      return false;
    });
}

export async function getOrganisationDetailAction(
  data: { id: number },
  _dispatch: Dispatch<AnyAction>
) {
  return getOrganisationDetailApi(data)
    .then((res: any) => {
      if (res.statusCode === 200 && !!res.data) {
        console.log(res.data);
        _dispatch(setCurrentOrganisation(res.data));
        return true;
      } else {
        _dispatch(setCurrentOrganisation({}));
        return false;
      }
    })
    .catch((res: any) => {
      _dispatch(setCurrentOrganisation({}));
      return false;
    });
}

export async function getOrganisatioAssessmentDetailAction(
  data: IStandardReq<IOrganisationAssessmentDetailReq>,
  _dispatch: Dispatch<AnyAction>
) {
  return getOrganisatioAssessmentDetailApi(data)
    .then((res: any) => {
      if (res.statusCode === 200 && !!res.data) {
        console.log(res.data);
        return res.data;
      } else {
        _dispatch(setCurrentOrganisation({}));
        return false;
      }
    })
    .catch((res: any) => {
      _dispatch(setCurrentOrganisation({}));
      return false;
    });
}
