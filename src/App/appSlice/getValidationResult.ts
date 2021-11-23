import Ajv, { ValidateFunction } from 'ajv';
import yaml from 'js-yaml';

import { isObject } from '../../utils/functions';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { ErrorType, ObjManifest, ObjSchema, ValidationResult, YamlManifest, YamlSchema } from './index';

export function getValidationResult(yamlSchema: YamlSchema, yamlManifest: YamlManifest): ValidationResult {
  let jsonSchemaObj: ObjSchema;
  try {
    jsonSchemaObj = yamlSchemaToJsonSchema(yamlSchema);
  } catch (error) {
    return {
      isSuccess: false,
      error: {
        errorType: ErrorType.yamlSchemaToJson,
        errorTypeMessage: 'failed to convert yaml schema to json schema',
        errorMessage: getErrorMessage(error),
      },
    };
  }

  let jsonManifestObj: ObjManifest;
  try {
    jsonManifestObj = yamlManifestToJsonManifest(yamlManifest);
  } catch (error) {
    return {
      isSuccess: false,
      error: {
        errorType: ErrorType.yamlManifestToJsonManifest,
        errorTypeMessage: 'failed to convert yaml manifest to json manifest',
        errorMessage: getErrorMessage(error),
      },
    };
  }

  let validate: ValidateFunction;
  try {
    const ajv = new Ajv({ allErrors: true });
    validate = ajv.compile(jsonSchemaObj);
  } catch (error) {
    return {
      isSuccess: false,
      error: {
        errorType: ErrorType.jsonToJsonSchema,
        errorTypeMessage: 'failed to compile json schema',
        errorMessage: getErrorMessage(error),
      },
    };
  }

  const valid = validate(jsonManifestObj);

  if (!valid) {
    return {
      isSuccess: false,
      error: {
        errorType: ErrorType.test,
        errors: validate.errors,
        errorTypeMessage: 'manifest does NOT pass validation against schema',
      },
    };
  } else {
    return { isSuccess: true, successMessage: 'manifest PASSES validation against schema' };
  }
}

function yamlSchemaToJsonSchema(yamlSchema: YamlSchema): ObjSchema {
  const json = yaml.load(yamlSchema);
  if (!isObject(json)) {
    throw new Error('invalid yaml schema');
  }
  return json;
}

function yamlManifestToJsonManifest(yamlManifest: YamlManifest): ObjManifest {
  const json = yaml.load(yamlManifest);
  if (!isObject(json)) {
    throw new Error('invalid yaml manifest');
  }
  return json;
}
