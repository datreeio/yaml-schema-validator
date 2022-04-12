import yaml from 'js-yaml';
import parserYaml from 'prettier/parser-yaml';
import prettier from 'prettier/standalone';

import { isObject } from '../../utils/functions';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { ErrorType, GolangResult, ValidationResult, YamlInput, YamlSchema } from './index';

export function getValidationResult(yamlSchema: YamlSchema, yamlInput: YamlInput): ValidationResult {
  // validate that input & schema are valid yaml
  try {
    yamlToObject(yamlSchema);
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
  try {
    yamlToObject(yamlInput);
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

  // golang validation
  const result = window.validate(yamlSchema, yamlInput);
  console.log(result);
  const golangResult: GolangResult = JSON.parse(result);

  if (golangResult.valid) {
    return {
      isSuccess: true,
      successMessage: 'Input PASSES validation against schema',
    };
  }
  if (golangResult.err) {
    return {
      isSuccess: false,
      error: {
        errorType: ErrorType.objToJsonSchema,
        errorTypeMessage: 'YAML schema: invalid yaml schema',
        errorMessage: golangResult.err,
      },
    };
  }
  if (golangResult.errors) {
    return {
      isSuccess: false,
      error: {
        errorType: ErrorType.test,
        errorTypeMessage: 'Input does NOT pass validation against schema',
        errors: golangResult.errors,
      },
    };
  }
  throw new Error(`unexpected golangResult${JSON.stringify(golangResult)}`);
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
