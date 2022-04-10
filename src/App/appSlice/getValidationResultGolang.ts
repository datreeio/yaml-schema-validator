import { ValidateFunction } from 'ajv';
import yaml from 'js-yaml';
import parserYaml from 'prettier/parser-yaml';
import prettier from 'prettier/standalone';

import { isObject } from '../../utils/functions';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { compileJsonSchema } from '../services/compileJsonSchema';
import { ErrorType, ObjInput, ObjSchema, ValidationResult, YamlInput, YamlSchema } from './index';

export function getValidationResultGolang(yamlSchema: YamlSchema, yamlInput: YamlInput): ValidationResult {
  const result = window.validate(yamlSchema, yamlInput);

  console.log(result);

  let jsonSchemaObj: ObjSchema;
  try {
    jsonSchemaObj = yamlToObject(yamlSchema);
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

  let validate: ValidateFunction;
  try {
    validate = compileJsonSchema(jsonSchemaObj);
  } catch (error) {
    return {
      isSuccess: false,
      error: {
        errorType: ErrorType.objToJsonSchema,
        errorTypeMessage: 'YAML schema: invalid yaml schema',
        errorMessage: getErrorMessage(error),
      },
    };
  }

  let inputObject: ObjInput;
  try {
    inputObject = yamlToObject(yamlInput);
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

  if (validate(inputObject)) {
    return { isSuccess: true, successMessage: 'Input PASSES validation against schema' };
  } else {
    return {
      isSuccess: false,
      error: {
        errorType: ErrorType.test,
        errors: validate.errors,
        errorTypeMessage: 'Input does NOT pass validation against schema',
      },
    };
  }
}

function yamlToObject(yamlInput: string): object {
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
