export enum LocalStorageKey {
  yamlSchema = 'yamlSchema',
  yamlManifest = 'yamlManifest',
}

const localStorageDefaultValues: Record<LocalStorageKey, string> = {
  [LocalStorageKey.yamlSchema]: '',
  [LocalStorageKey.yamlManifest]: '',
};

export class LocalStorageService {
  static setItem(key: LocalStorageKey, value: string): void {
    localStorage.setItem(key, value);
  }
  static getItem(key: LocalStorageKey): string {
    return localStorage.getItem(key) ?? localStorageDefaultValues[key];
  }
}
