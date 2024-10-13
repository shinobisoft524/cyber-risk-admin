import { RegisterSchema, SigninSchema } from '@/cmodules/validations';
import { login as _login, register as _register, logout as _logout } from '@/apis/auth.api';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { setUser } from '@/store/auth/AuthSlice';
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

export async function login(
  data: { email: string; password: string },
  _dispatch: Dispatch<AnyAction>
) {
  const validatedFields = SigninSchema.safeParse(data);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  return _login(data)
    .then((res: any) => {
      if (res.statusCode === 200 && !!res.data) {
        _dispatch(
          setUser({
            isLogin: true,
            user: res.data,
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
