import { createSlice } from '@reduxjs/toolkit';
import { Organisation, User } from '@/cprisma';

export interface ICurrentOrganisationType extends Organisation {
  Owner?: User;
}

interface IStateType {
  list: Organisation[];
  currentOrganisation?: ICurrentOrganisationType;
}

const initialState: IStateType = {
  list: [],
  currentOrganisation: {
    Owner: {},
  } as any,
};

export const OrganisationSlice = createSlice({
  name: 'organisation',
  initialState,
  reducers: {
    initOrganisation: (state: IStateType) => {
      state = initialState;
    },
    setList: (state: IStateType, action) => {
      if (action.payload === false) {
        state.list = [];
      }
      state.list = action.payload;
    },
    setCurrentOrganisation: (state: IStateType, action) => {
      if (action.payload === false) {
        state.currentOrganisation = initialState.currentOrganisation;
      } else {
        state.currentOrganisation = action.payload;
      }
    },
    updateCurrentOrganisation: (
      state: IStateType,
      action: { payload: { field: keyof Organisation; value: any } }
    ) => {
      if (state.currentOrganisation) {
        state.currentOrganisation[action.payload.field] = action.payload.value as never;
      }
    },
    updateCurrentOrganisationOwner: (
      state: IStateType,
      action: { payload: { field: keyof User; value: any } }
    ) => {
      if (!(state.currentOrganisation as any).Owner) (state.currentOrganisation as any).Owner = {};

      (state.currentOrganisation as any).Owner[action.payload.field] = action.payload
        .value as never;
    },
  },
});

export const {
  initOrganisation,
  setList,
  setCurrentOrganisation,
  updateCurrentOrganisation,
  updateCurrentOrganisationOwner,
} = OrganisationSlice.actions;

export default OrganisationSlice.reducer;
