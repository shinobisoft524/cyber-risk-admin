import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import {
  createTemplatDataApi,
  createTemplateApi,
  getTemplatDataApi,
  getTemplateDetailApi,
  getTemplateListApi,
} from '@/apis/template.api';
import { User } from '@/cmodels';

export async function createTemplatAction(
  reqData: {
    type: string;
    user: User;
    info: {
      value: {
        id?: string;
        name: string;
      };
    };
  },
  _dispatch: Dispatch<AnyAction>
) {
  return createTemplateApi(reqData).then((res: any) => {
    return res.data;
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

export async function getTemplateListAction(
  reqData: {
    user: User;
    info: {
      value: {
        name: string;
      };
    };
  },
  _dispatch: Dispatch<AnyAction>
) {
  return getTemplateListApi(reqData).then((res: any) => {
    return res.data;
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

export async function getTemplateDetailAction(
  reqData: {
    user: User;
    info: {
      value: {
        name: string;
      };
    };
  },
  _dispatch: Dispatch<AnyAction>
) {
  return getTemplateDetailApi(reqData).then((res: any) => {
    return res.data;
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

export async function createTemplatDataAction(
  reqData: {
    user: User;
    info: {
      value: any[];
    };
  },
  _dispatch: Dispatch<AnyAction>
) {
  return createTemplatDataApi(reqData).then((res: any) => {
    return res.data;
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

export async function getTemplatDataAction(
  reqData: {
    user: User;
    info: {
      value: any;
    };
  },
  _dispatch: Dispatch<AnyAction>
) {
  return getTemplatDataApi(reqData).then((res: any) => {
    return res.data;
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
