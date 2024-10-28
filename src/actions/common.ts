import { Dispatch, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { IStandardReq, IStandardRes } from '@/cmodels';
import { setNotificationList } from '@/store/notification';

export async function commonAction(
  _action: Function,
  data: IStandardReq<unknown>,
  _dispatch: Dispatch<any>,
  _reduxAction?: ActionCreatorWithPayload<unknown>
) {
  return _action(data)
    .then((res: IStandardRes<unknown>) => {
      if (res.statusCode === 200 && !!res.data) {
        if (!!_reduxAction) {
          _dispatch(_reduxAction(res.data));
        }
        _dispatch(
          setNotificationList([
            {
              code: null,
              msg: 'Loading was successful!',
            },
          ])
        );
        return res.data;
      } else if (res.statusCode === 200) {
        _dispatch(
          setNotificationList([
            {
              code: null,
              msg: 'Loading was successful!',
            },
          ])
        );
        return true;
      } else if (res.message) {
        _dispatch(
          setNotificationList([
            {
              code: null,
              msg: res.message,
            },
          ])
        );
      } else {
        _dispatch(
          setNotificationList([
            {
              code: null,
              msg: 'Server error!',
            },
          ])
        );
      }

      if (!!_reduxAction) {
        _dispatch(_reduxAction(false));
      }

      return false;
    })
    .catch(() => {
      _dispatch(
        setNotificationList([
          {
            code: null,
            msg: 'Unkown error!',
          },
        ])
      );
      return false;
    });
}
