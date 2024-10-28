import { createSlice } from '@reduxjs/toolkit';

interface IStateType {
  notificationList: {
    msg: string;
    code: number;
  }[];
}

const initialState: IStateType = {
  notificationList: [],
};

export const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    initNotification: (state: IStateType) => {
      state = initialState;
    },
    setNotificationList: (state: IStateType, action) => {
      state.notificationList = action.payload;
    },
  },
});

export const { initNotification, setNotificationList } = NotificationSlice.actions;

export default NotificationSlice.reducer;
