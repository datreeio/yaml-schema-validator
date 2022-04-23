import './wasm_exec.js';
import './wasmTypes.d.ts';

import { css } from '@emotion/css';
import { CircularProgress } from '@material-ui/core/';
import React, { useEffect } from 'react';

import { createUseClasses } from '../utils/createUseClasses';

async function loadWasm(): Promise<void> {
  const goWasm = new window.Go();
  const result = await WebAssembly.instantiateStreaming(fetch('main.wasm'), goWasm.importObject);
  goWasm.run(result.instance);
}

interface Props {}

export const LoadWasm: React.FC<Props> = (props) => {
  const classes = useClasses(props);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    loadWasm().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className={classes.root}>
        <CircularProgress size={50} />
      </div>
    );
  } else {
    return <React.Fragment>{props.children}</React.Fragment>;
  }
};

const useClasses = createUseClasses((_props: Props) => ({
  root: css`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
}));
