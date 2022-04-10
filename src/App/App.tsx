import { css } from '@emotion/css';
import React from 'react';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { createUseClasses } from '../utils/createUseClasses';
import { selectAppSlice, selectValidationResult, setYamlInput, setYamlSchema } from './appSlice';
import { ValidationResult } from './Results/ValidationResult';
import { YamlEditor } from './YamlEditor';

interface Props {}

export function App(props: Props) {
  console.log('loaded app');
  const classes = useClasses(props);
  const dispatch = useAppDispatch();
  const { yamlSchema, yamlInput } = useAppSelector(selectAppSlice);
  const validationResult = useAppSelector(selectValidationResult);

  const dispatchYamlSchemaValue = (newValue: string): void => {
    dispatch(setYamlSchema(newValue));
  };
  const dispatchYamlInputValue = (newValue: string): void => {
    dispatch(setYamlInput(newValue));
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h1>YAML Schema Validator Online</h1>
      </div>
      <div className={classes.mainAppContainer}>
        <div className={classes.textFieldsContainer}>
          <div className={classes.textFieldContainer}>
            <div className={classes.textAboveTextField}>YAML Schema</div>
            <div className={classes.codeEditorWrapper}>
              <YamlEditor
                value={yamlSchema}
                onBeforeChange={(editor, data, value) => {
                  dispatchYamlSchemaValue(value);
                }}
                setValue={dispatchYamlSchemaValue}
              />
            </div>
          </div>
          <div className={classes.textFieldContainer}>
            <div className={classes.textAboveTextField}>Input YAML to test against</div>
            <div className={classes.codeEditorWrapper}>
              <YamlEditor
                value={yamlInput}
                onBeforeChange={(editor, data, value) => {
                  dispatchYamlInputValue(value);
                }}
                setValue={dispatchYamlInputValue}
              />
            </div>
          </div>
        </div>
        <ValidationResult validationResult={validationResult} />
      </div>
    </div>
  );
}

const useClasses = createUseClasses((_props: Props) => ({
  root: css``,
  header: css`
    padding: 1rem 3rem;
  `,
  mainAppContainer: css`
    margin: 1rem;
  `,
  textFieldsContainer: css`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
    height: 60vh;
  `,
  textFieldContainer: css`
    height: 100%;
    width: 47.5%;
    display: flex;
    flex-direction: column;
  `,
  textAboveTextField: css`
    padding: 1rem 1rem 1rem 0;
    flex-grow: 0;
  `,
  codeEditorWrapper: css`
    flex-grow: 1;
  `,
}));

export default App;

const schemaContent = `type: object
properties:
  kind:
    type: string
    enum:
      - Ingress
      - Service
`;

const inputContent = `---
apiVersion: apps/v1
kind: Ingress
metadata: bbaaaaad
`;
