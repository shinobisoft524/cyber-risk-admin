import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import {
  createTemplatDataApi,
  createTemplateApi,
  getTemplatDataApi,
  getTemplateDetailApi,
  getTemplateListApi,
} from '@/apis/template.api';
import { IStandardReq, ITemplateCreateReq, ITemplateDetailReq, ITemplateListReq } from '@/cmodels';
import { User } from '@/cprisma';

export async function createTemplatAction(
  reqData: IStandardReq<ITemplateCreateReq>,
  _dispatch: Dispatch<AnyAction>
) {
  return createTemplateApi(reqData)
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

export async function getTemplateListAction(
  reqData: IStandardReq<ITemplateListReq>,
  _dispatch: Dispatch<AnyAction>
) {
  return getTemplateListApi(reqData)
    .then((res: any) => {
      if (res.statusCode === 200 && !!res.data) {
        return res.data;
      } else {
        return false;
      }
    })
    .catch((res: any) => {
      return false;
    });
}

export async function getTemplateDetailAction(
  reqData: IStandardReq<ITemplateDetailReq>,
  _dispatch: Dispatch<AnyAction>
) {
  return getTemplateDetailApi(reqData)
    .then((res: any) => {
      if (res.statusCode === 200 && !!res.data) {
        return res.data;
      } else {
        return false;
      }
    })
    .catch((res: any) => {
      return false;
    });
}

export async function createTemplatDataAction(
  reqData: {
    user: User;
    info: {
      value: any[];
    };
  },
  _dispatch: Dispatch<AnyAction>
) {
  return createTemplatDataApi(reqData)
    .then((res: any) => {
      if (res.statusCode === 200 && !!res.data) {
        return res.data;
      } else {
        return false;
      }
    })
    .catch((res: any) => {
      return false;
    });
}

export async function getTemplatDataAction(
  reqData: {
    user: User;
    info: {
      value: any;
    };
  },
  _dispatch: Dispatch<AnyAction>
) {
  return getTemplatDataApi(reqData)
    .then((res: any) => {
      if (res.statusCode === 200 && !!res.data) {
        return res.data;
      } else {
        return false;
      }
    })
    .catch((res: any) => {
      return false;
    });
}
