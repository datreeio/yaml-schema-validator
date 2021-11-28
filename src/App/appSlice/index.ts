import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ValidateFunction } from 'ajv';

import type { RootState } from '../../redux/store';
import { LocalStorageKey, LocalStorageService } from '../services/LocalStorageService';
import { getValidationResult } from './getValidationResult';

export type YamlSchema = string;
export type ObjSchema = object;
export type YamlManifest = string;
export type ObjManifest = object;
export enum ErrorType {
  yamlSchemaToJson,
  jsonToJsonSchema,
  yamlManifestToJsonManifest,
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
            errorType: ErrorType.jsonToJsonSchema | ErrorType.yamlSchemaToJson | ErrorType.yamlManifestToJsonManifest;
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
  yamlManifest: YamlManifest;
}

const initialState: AppState = {
  yamlSchema: LocalStorageService.getItem(LocalStorageKey.yamlSchema),
  yamlManifest: LocalStorageService.getItem(LocalStorageKey.yamlManifest),
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setYamlSchema: (state, action: PayloadAction<string>) => {
      state.yamlSchema = action.payload;
      LocalStorageService.setItem(LocalStorageKey.yamlSchema, action.payload);
    },
    setYamlManifest: (state, action: PayloadAction<string>) => {
      state.yamlManifest = action.payload;
      LocalStorageService.setItem(LocalStorageKey.yamlManifest, action.payload);
    },
  },
});

export const { setYamlSchema, setYamlManifest } = appSlice.actions;

export const selectAppSlice = (state: RootState) => state.app;
export const selectYamlSchema = (state: RootState) => state.app.yamlSchema;
export const selectYamlManifest = (state: RootState) => state.app.yamlManifest;
export const selectValidationResult = createSelector([selectYamlSchema, selectYamlManifest], getValidationResult);

export const appReducer = appSlice.reducer;
