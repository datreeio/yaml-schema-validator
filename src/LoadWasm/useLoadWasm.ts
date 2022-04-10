import './wasm_exec.js';
import './types.d.ts';

import React, { useEffect } from 'react';

async function main(): Promise<void> {
  console.log('Loading wasm...');
  const goWasm = new window.Go();
  const result = await WebAssembly.instantiateStreaming(fetch('main.wasm'), goWasm.importObject);
  console.log('Wasm loaded!');
  goWasm.run(result.instance);
  console.log('Wasm ran!');
}

export const useLoadWasm = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    main().then(() => {
      setIsLoading(false);
    });
  }, []);

  return { isLoading };
};
