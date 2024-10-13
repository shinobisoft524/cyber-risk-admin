'use client';

import { AppState } from '@/store/store';
import { useDispatch, useSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { redirect, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { logout as _logout } from '@/actions/auth';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const AuthGuard = ({ children }: Props) => {
  // const router = useRouter();
  // const dispatch = useDispatch();
  // const pathname = usePathname();
  // const isLogin: boolean = useSelector((state: AppState) => state.auth.isLogin);
  // const user = useSelector((state: AppState) => state.auth.user);
  // const handleLogOut = async () => {
  //   _logout({ email: user.email }, dispatch);
  // };

  // useEffect(() => {
  //   if (!isLogin) {
  //     router.push('/auth/login');
  //   }
  // }, [isLogin, pathname]);

  return children;
};

export default AuthGuard;
