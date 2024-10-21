import {
  createOrganisationApi,
  getOrganisationDetailApi,
  getOrganisationListApi,
} from '@/apis/organisation.api';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import {
  ICurrentOrganisationType,
  setCurrentOrganisation,
  setList,
} from '@/store/organisation/OrganisationSlice';
import { createTemplateApi } from '@/apis/template.api';
import { User } from '@/cmodels';

export async function createTemplatAction(
  reqData: {
    type: string;
    user: User;
    info: {
      value: {
        name: string;
      };
    };
  },
  _dispatch: Dispatch<AnyAction>
) {
  return createTemplateApi(reqData).then((res: any) => {
    return res;
    //   if (res.statusCode === 200 && !!res.data) {
    //     _dispatch(
    //       setUser({
    //         isLogin: true,
    //         user: res.data,
    //       })
    //     );
    //     return true;
    //   } else {
    //     _dispatch(
    //       setUser({
    //         isLogin: false,
    //         user: null,
    //       })
    //     );
    //     return false;
    //   }
    // })
    // .catch((res: any) => {
    //   _dispatch(
    //     setUser({
    //       isLogin: false,
    //       user: null,
    //     })
    //   );
    //   return false;
  });
}
