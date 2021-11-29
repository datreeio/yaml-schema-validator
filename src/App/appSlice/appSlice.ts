import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ValidateFunction } from 'ajv';

import type { RootState } from '../../redux/store';
import { LocalStorageKey, LocalStorageService } from '../services/LocalStorageService';
import { getValidationResult } from './getValidationResult';

export type YamlSchema = string;
export type ObjSchema = object;
export type YamlInput = string;
export type ObjInput = object;
export enum ErrorType {
  yamlSchemaToObj,
  objToJsonSchema,
  yamlInputToObj,
  test,
}

type ValidationResultSuccess = {
  isSuccess: true;
  successMessage: string;
};
type ValidationResultFailure = {
  isSuccess: false;
  error: {
    errorType: ErrorType.objToJsonSchema | ErrorType.yamlSchemaToObj | ErrorType.yamlInputToObj;
    errorTypeMessage: string;
    errorMessage: string;
  };
};
type ValidationResultTestFailure = {
  isSuccess: false;
  error: {
    errorType: ErrorType.test;
    errorTypeMessage: string;
    errors: ValidateFunction['errors'];
  };
};

export type ValidationResult = ValidationResultSuccess | ValidationResultFailure | ValidationResultTestFailure;

interface AppState {
  yamlSchema: YamlSchema;
  yamlInput: YamlInput;
}

const initialState: AppState = {
  yamlSchema: LocalStorageService.getItem(LocalStorageKey.yamlSchema),
  yamlInput: LocalStorageService.getItem(LocalStorageKey.yamlInput),
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setYamlSchema: (state, action: PayloadAction<string>) => {
      state.yamlSchema = action.payload;
      LocalStorageService.setItem(LocalStorageKey.yamlSchema, action.payload);
    },
    setYamlInput: (state, action: PayloadAction<string>) => {
      state.yamlInput = action.payload;
      LocalStorageService.setItem(LocalStorageKey.yamlInput, action.payload);
    },
  },
});

export const { setYamlSchema, setYamlInput } = appSlice.actions;

export const selectAppSlice = (state: RootState) => state.app;
export const selectYamlSchema = (state: RootState) => state.app.yamlSchema;
export const selectYamlInput = (state: RootState) => state.app.yamlInput;
export const selectValidationResult = createSelector([selectYamlSchema, selectYamlInput], getValidationResult);

export const appReducer = appSlice.reducer;
