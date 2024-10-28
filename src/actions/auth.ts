import { RegisterSchema, LoginSchema } from '@/cvalidations';
import { loginApi, register as _register, logout as _logout } from '@/apis/auth.api';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { setUser } from '@/store/auth';
import { commonAction } from './common';
import { IAuthReq, IStandardReq } from '@/cmodels';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export async function register(data: { email: string; password: string }) {
  const validatedFields = RegisterSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const res = await _register(data);
  return res;
}

export async function loginAction(
  reqData: IStandardReq<IAuthReq>,
  _dispatch: Dispatch<any>
): Promise<boolean> {
  const validatedFields = LoginSchema.safeParse(reqData.info);
  if (!validatedFields.success) {
    return false;
    // {
    //   errors: validatedFields.error.flatten().fieldErrors,
    // };
  }

  return commonAction(loginApi, reqData, _dispatch)
    .then((res: any) => {
      if (!!res) {
        _dispatch(
          setUser({
            isLogin: true,
            user: res,
          })
        );
        return true;
      } else {
        _dispatch(
          setUser({
            isLogin: false,
            user: null,
          })
        );
        return false;
      }
    })
    .catch((res: any) => {
      _dispatch(
        setUser({
          isLogin: false,
          user: null,
        })
      );
      return false;
    });
}

export async function logout(
  data: { email: string },
  _dispatch: Dispatch<AnyAction>,
  router: AppRouterInstance
) {
  return _logout(data)
    .then((res: any) => {
      return res;
    })
    .finally(() => {
      _dispatch(
        setUser({
          isLogin: false,
          user: null,
        })
      );
      router.push('/auth/login');
    });
}

export async function expired(_dispatch: Dispatch<AnyAction>) {
  _dispatch(
    setUser({
      isLogin: false,
      user: null,
    })
  );
}
