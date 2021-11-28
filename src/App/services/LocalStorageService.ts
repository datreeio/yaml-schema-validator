import { defaultYamlInputValue } from '../../examples/defaultYamlInputValue';
import { defaultYamlSchemaValue } from '../../examples/defaultYamlSchemaValue';

export enum LocalStorageKey {
  yamlSchema = 'yamlSchema',
  yamlInput = 'yamlInput',
}

const localStorageDefaultValues: Record<LocalStorageKey, string> = {
  [LocalStorageKey.yamlSchema]: defaultYamlSchemaValue,
  [LocalStorageKey.yamlInput]: defaultYamlInputValue,
};

export class LocalStorageService {
  static setItem(key: LocalStorageKey, value: string): void {
    localStorage.setItem(key, value);
  }
  static getItem(key: LocalStorageKey): string {
    return localStorage.getItem(key) ?? localStorageDefaultValues[key];
  }
}
