'use client';

import { AppState } from '@/store/store';
import { useSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { redirect, usePathname } from 'next/navigation';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const AuthGuard = ({ children }: Props) => {
  const isLogin: boolean = useSelector((state: AppState) => state.auth.isLogin);
  const pathname = usePathname();

  useEffect(() => {
    if (!isLogin) {
      redirect('/auth/login');
    }
  }, [isLogin, pathname]);

  return children;
};

export default AuthGuard;
