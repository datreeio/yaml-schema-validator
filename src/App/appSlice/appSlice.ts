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
  yamlSchemaToJson,
  jsonToJsonSchema,
  yamlInputToJsonInput,
  test,
}
export type ValidationResult =
  | {
      isSuccess: true;
      successMessage: string;
    }
  | {
      isSuccess: false;
      error:
        | {
            errorType: ErrorType.jsonToJsonSchema | ErrorType.yamlSchemaToJson | ErrorType.yamlInputToJsonInput;
            errorTypeMessage: string;
            errorMessage: string;
          }
        | {
            errorType: ErrorType.test;
            errorTypeMessage: string;
            errors: ValidateFunction['errors'];
          };
    };

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
