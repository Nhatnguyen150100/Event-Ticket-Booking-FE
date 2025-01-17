import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IGeneral } from '../../types/general.types';

export interface CounterState {
  modalActive: IGeneral,
  isMobile: boolean
}

const initialState: CounterState = {
  modalActive: null,
  isMobile: false,
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setModalActive: (state, action: PayloadAction<IGeneral>) => {
      state.modalActive = action.payload;
    },
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    }
  },
});

export const { setModalActive, setIsMobile } = generalSlice.actions;

const generalReducer = generalSlice.reducer;

export default generalReducer;
