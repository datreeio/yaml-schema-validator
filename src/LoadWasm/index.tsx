import './wasm_exec.js';
import './types.d.ts';

import React, { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core/';
import { setTimeOutPromise } from '../utils/setTimeOutPromise';

async function main(): Promise<void> {
  console.log('Loading wasm...');
  await setTimeOutPromise(1000); // fake a big golang bundle
  const goWasm = new window.Go();
  const result = await WebAssembly.instantiateStreaming(fetch('main.wasm'), goWasm.importObject);
  console.log('Wasm loaded!');
  goWasm.run(result.instance);
  console.log('Wasm ran!');
}

export const LoadWasm: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    main().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress size={50} />
      </div>
    );
  } else {
    return <React.Fragment>{children}</React.Fragment>;
  }
};
