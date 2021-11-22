import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './store';

interface AppState {
  yamlSchema: string;
  yamlManifest: string;
}

const initialState: AppState = {
  yamlSchema: '',
  yamlManifest: '',
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setYamlSchema: (state, action: PayloadAction<string>) => {
      state.yamlSchema = action.payload;
    },
    setYamlManifest: (state, action: PayloadAction<string>) => {
      state.yamlManifest = action.payload;
    },
  },
});

export const { setYamlSchema, setYamlManifest } = appSlice.actions;

export const selectAppSlice = (state: RootState) => state.app;

export const appReducer = appSlice.reducer;
