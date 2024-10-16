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

export async function createOrganisationAction(
  data: ICurrentOrganisationType,
  _dispatch: Dispatch<AnyAction>
) {
  return createOrganisationApi(data).then((res: any) => {
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
      if (res.statusCode === 200 && !!res.data && res.data.length === 1) {
        console.log(res.data);
        _dispatch(setCurrentOrganisation(res.data[0]));
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
