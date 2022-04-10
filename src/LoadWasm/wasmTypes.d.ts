declare global {
  export interface Window {
    Go: any;
    validate: (yamlSchema: string, inputYaml: string) => string;
  }
}

export {};
