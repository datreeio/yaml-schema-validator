import { ValidateFunction } from 'ajv';
import yaml from 'js-yaml';
import parserYaml from 'prettier/parser-yaml';
import prettier from 'prettier/standalone';

import { isObject } from '../../utils/functions';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { compileJsonSchema } from '../services/compileJsonSchema';
import { ErrorType, ObjManifest, ObjSchema, ValidationResult, YamlManifest, YamlSchema } from './index';

export function getValidationResult(yamlSchema: YamlSchema, yamlManifest: YamlManifest): ValidationResult {
  let jsonSchemaObj: ObjSchema;
  try {
    jsonSchemaObj = yamlToJsonObject(yamlSchema);
  } catch (error) {
    return {
      isSuccess: false,
      error: {
        errorType: ErrorType.yamlSchemaToJson,
        errorTypeMessage: 'YAML schema: invalid yaml',
        errorMessage: getErrorMessage(error),
      },
    };
  }

  let jsonManifestObj: ObjManifest;
  try {
    jsonManifestObj = yamlToJsonObject(yamlManifest);
  } catch (error) {
    return {
      isSuccess: false,
      error: {
        errorType: ErrorType.yamlManifestToJsonManifest,
        errorTypeMessage: 'YAML manifest: invalid yaml',
        errorMessage: getErrorMessage(error),
      },
    };
  }

  let validate: ValidateFunction;
  try {
    validate = compileJsonSchema(jsonSchemaObj);
  } catch (error) {
    return {
      isSuccess: false,
      error: {
        errorType: ErrorType.jsonToJsonSchema,
        errorTypeMessage: 'YAML schema: invalid json schema',
        errorMessage: getErrorMessage(error),
      },
    };
  }

  if (validate(jsonManifestObj)) {
    return { isSuccess: true, successMessage: 'manifest PASSES validation against schema' };
  } else {
    return {
      isSuccess: false,
      error: {
        errorType: ErrorType.test,
        errors: validate.errors,
        errorTypeMessage: 'manifest does NOT pass validation against schema',
      },
    };
  }
}

function yamlToJsonObject(yamlInput: string): object {
  const json = yaml.load(yamlInput);
  if (!isObject(json)) {
    throw new Error('invalid yaml');
  }
  return json;
}

export function isYamlValid(value: string): boolean {
  let isYamlValid = true;
  try {
    yaml.load(value);
  } catch (e) {
    isYamlValid = false;
  }
  return isYamlValid;
}

export function formatYaml(source: string): string {
  return prettier.format(source, {
    parser: 'yaml',
    plugins: [parserYaml],
    tabWidth: 2,
  });
}
