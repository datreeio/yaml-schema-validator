import { css } from '@emotion/css';
import { Fragment } from 'react';

import { createUseClasses } from '../../utils/createUseClasses';
import { ErrorType, ValidationResult as ValidationResultType } from '../appSlice';
import { TestErrors } from './TestErrors';

interface Props {
  validationResult: ValidationResultType;
}

export function ValidationResult(props: Props) {
  const classes = useClasses(props);
  const { validationResult } = props;

  return (
    <div className={classes.validationResultContainer}>
      {validationResult.isSuccess ? (
        <span>{validationResult.successMessage}</span>
      ) : (
        <Fragment>
          <div className={classes.errorTypeMessage}>{validationResult.error.errorTypeMessage}</div>
          <div className={classes.errorMessage}>
            {validationResult.error.errorType === ErrorType.test ? (
              <TestErrors errors={validationResult.error.errors} />
            ) : (
              <span>{validationResult.error.errorMessage}</span>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
}

const useClasses = createUseClasses((props: Props) => ({
  validationResultContainer: css`
    color: ${props.validationResult.isSuccess ? 'green' : 'red'};
    padding: 1rem 1rem;
  `,
  errorTypeMessage: css`
    font-weight: bold;
    margin-bottom: 0.5rem;
  `,
  errorMessage: css``,
}));
