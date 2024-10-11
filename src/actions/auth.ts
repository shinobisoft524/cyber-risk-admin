import { RegisterSchema, SigninSchema } from '@/cmodules/xvalidations';
import { login as _login, register as _register } from '@/apis/auth.api';
import { useSelector, useDispatch } from '@/store/hooks';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { setUser } from '@/store/auth/AuthSlice';

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

export function login(data: { email: string; password: string }, _dispatch: Dispatch<AnyAction>) {
  const validatedFields = SigninSchema.safeParse(data);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  _login(data).then((res: any) => {
    if (res.statusCode === 200 && !!res.data) {
      _dispatch(
        setUser({
          isLogin: true,
          user: res.data,
        })
      );
    } else {
      _dispatch(
        setUser({
          isLogin: false,
          user: null,
        })
      );
    }
  });
}
