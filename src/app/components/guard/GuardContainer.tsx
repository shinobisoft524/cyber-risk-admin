'use client';

import { AppState } from '@/store/store';
import { useSelector } from '@/store/hooks';
import { redirect, usePathname } from 'next/navigation';
import { useEffect } from 'react';
type Props = {
  children: JSX.Element | JSX.Element[];
};

const GuardContainer = ({ children }: Props) => {
  const pathname = usePathname();
  const isLogin: boolean = useSelector((state: AppState) => state.auth.isLogin);
  console.log('----------isLogin', isLogin);
  useEffect(() => {
    if (pathname.startsWith('/home')) {
      return;
    }
    if (isLogin && pathname.startsWith('/auth/')) {
      redirect(`/`);
    }
    if (!isLogin && !pathname.startsWith('/auth/')) {
      redirect(`/auth/login`);
    }
  }, [isLogin, pathname]);
  return <>{children}</>;
};

export default GuardContainer;
