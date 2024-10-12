'use client';

import { AppState } from '@/store/store';
import { useSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const GuestGuard = ({ children }: Props) => {
  const isLogin: boolean = useSelector((state: AppState) => state.auth.isLogin);
  const router = useRouter();

  useEffect(() => {
    if (isLogin) {
      router.push('/dashboard');
    }
  }, [isLogin, router]);

  return children;
};

export default GuestGuard;
