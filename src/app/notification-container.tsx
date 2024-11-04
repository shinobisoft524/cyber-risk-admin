'use client';

import { RootState } from '@/store/store';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function NotifiactionContainer() {
  const notificationList = useSelector((state: RootState) => state.notification.notificationList);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    return () => {
      setIsLoaded(false);
    };
  }, []);

  useEffect(() => {
    if (isLoaded) {
      if (notificationList && notificationList.length > 0) {
        showNotification(notificationList);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, notificationList]);

  const notify = (msg: string) => toast(msg);

  const showNotification = (
    notificationList: {
      msg: string;
      code: number;
    }[]
  ) => {
    notificationList.forEach((n) => {
      console.log('----------', n.msg);
      notify(n.msg);
    });
  };

  return <ToastContainer />;
}

export default NotifiactionContainer;
