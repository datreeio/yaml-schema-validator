import { css } from '@emotion/css';
import React from 'react';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { createUseClasses } from '../utils/createUseClasses';
import { selectAppSlice, selectValidationResult, setYamlManifest, setYamlSchema } from './appSlice';
import { ValidationResult } from './ValidationResult';

interface Props {}

export function App(props: Props) {
  const classes = useClasses(props);
  const dispatch = useAppDispatch();
  const { yamlSchema, yamlManifest } = useAppSelector(selectAppSlice);
  const validationResult = useAppSelector(selectValidationResult);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h1>YAML Schema Validator</h1>
      </div>
      <div className={classes.mainAppContainer}>
        <div className={classes.textFieldsContainer}>
          <div className={classes.textFieldContainer}>
            <span className={classes.textAboveTextField}>YAML Schema</span>
            <textarea
              className={classes.textField}
              value={yamlSchema}
              onChange={(e) => {
                dispatch(setYamlSchema(e.target.value));
              }}
            />
          </div>
          <div className={classes.textFieldContainer}>
            <span className={classes.textAboveTextField}>Input YAML manifest to test against</span>
            <textarea
              className={classes.textField}
              value={yamlManifest}
              onChange={(e) => {
                dispatch(setYamlManifest(e.target.value));
              }}
            />
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
  `,
  textField: css`
    width: 100%;
    flex-grow: 1;
  `,
}));

export default App;
