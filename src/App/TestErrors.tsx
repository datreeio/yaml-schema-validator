import { css } from '@emotion/css';
import { ValidateFunction } from 'ajv';

import { createUseClasses } from '../utils/createUseClasses';

interface Props {
  errors: ValidateFunction['errors'];
}

export function TestErrors(props: Props) {
  const classes = useClasses(props);
  const { errors } = props;

  const numberOfErrors = errors?.length ?? 0;
  const errorsListHeaderText = `Found ${numberOfErrors} error${numberOfErrors !== 1 ? 's' : ''}`;

  return (
    <div className={classes.testErrorsContainer}>
      <div className={classes.testErrorsHeader}>{errorsListHeaderText}</div>
      <div>
        {errors?.map((e) => (
          <div className={classes.testError}>
            <div className={classes.testErrorProperty}>
              <div className={classes.testErrorFieldName}>Message:&nbsp;</div>
              <div>{e.message}</div>
            </div>
            <div className={classes.testErrorProperty}>
              <div className={classes.testErrorFieldName}>Schema path:&nbsp;</div>
              <div>{e.schemaPath}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const useClasses = createUseClasses((_props: Props) => ({
  testErrorsContainer: css``,
  testErrorsHeader: css`
    color: red;
    margin-bottom: 0.5rem;
  `,
  testErrorFieldName: css`
    color: black;
    min-width: 10rem;
  `,
  testError: css`
    margin-bottom: 1rem;
  `,
  testErrorProperty: css`
    display: flex;
    flex-direction: row;
  `,
}));
