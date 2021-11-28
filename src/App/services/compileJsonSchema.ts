import Ajv, { ValidateFunction } from 'ajv';

// TODO maybe add keywords and custom keys
class CustomAjv extends Ajv {}

const ajv = new CustomAjv({ allErrors: true });

export function compileJsonSchema(input: object): ValidateFunction {
  return ajv.compile(input);
}
