import { ValidateFunction } from 'ajv';
import yaml from 'js-yaml';
import parserYaml from 'prettier/parser-yaml';
import prettier from 'prettier/standalone';

import { isObject } from '../../utils/functions';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { compileJsonSchema } from '../services/compileJsonSchema';
import { ErrorType, ObjInput, ObjSchema, ValidationResult, YamlInput, YamlSchema } from './index';

export function getValidationResult(yamlSchema: YamlSchema, yamlInput: YamlInput): ValidationResult {
  let jsonSchemaObj: ObjSchema;
  try {
    jsonSchemaObj = yamlToJsonObject(yamlSchema);
  } catch (error) {
    return {
      isSuccess: false,
      error: {
        errorType: ErrorType.yamlSchemaToObj,
        errorTypeMessage: 'YAML schema: invalid yaml',
        errorMessage: getErrorMessage(error),
      },
    };
  }

  let jsonInputObj: ObjInput;
  try {
    jsonInputObj = yamlToJsonObject(yamlInput);
  } catch (error) {
    return {
      isSuccess: false,
      error: {
        errorType: ErrorType.yamlInputToObj,
        errorTypeMessage: 'YAML input: invalid yaml',
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
        errorType: ErrorType.objToJsonSchema,
        errorTypeMessage: 'YAML schema: invalid json schema',
        errorMessage: getErrorMessage(error),
      },
    };
  }

  if (validate(jsonInputObj)) {
    return { isSuccess: true, successMessage: 'input PASSES validation against schema' };
  } else {
    return {
      isSuccess: false,
      error: {
        errorType: ErrorType.test,
        errors: validate.errors,
        errorTypeMessage: 'input does NOT pass validation against schema',
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
