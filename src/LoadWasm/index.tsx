import React from 'react';

import { useLoadWasm } from './useLoadWasm';

export const LoadWasm: React.FC = ({ children }) => {
  const { isLoading } = useLoadWasm();

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return <React.Fragment>{children}</React.Fragment>;
  }
};
