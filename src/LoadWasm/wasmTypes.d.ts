declare global {
  export interface Window {
    Go: new () => {
      importObject: WebAssembly.Imports;
      run: (instance: WebAssemblyInstantiatedSource['instance']) => Promise<void>;
    };
    validate: (yamlSchema: string, inputYaml: string) => string;
  }
}

export {};
