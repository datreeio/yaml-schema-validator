import { css } from '@emotion/css';
import React from 'react';

import { createUseClasses } from '../utils/createUseClasses';

interface Props {
  size: number;
}

export function App() {
  const classes = useClasses({ size: 5 });

  return (
    <div className={classes.mainAppContainer}>
      <div className={classes.innerComponent}>im the inner component</div>
      Hello Datree
    </div>
  );
}

const useClasses = createUseClasses((props: Props) => ({
  mainAppContainer: css`
    border: ${props.size}px solid green;
    background-color: green;
  `,
  innerComponent: css`
    background-color: red;
    opacity: 30%;
  `,
}));

export default App;
