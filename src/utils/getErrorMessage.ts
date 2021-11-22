import { YAMLException } from 'js-yaml';

type ErrorWithMessage = {
  message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}

function getYamlExceptionErrorMessage(error: YAMLException): string {
  const STRING_TO_REMOVE_FROM_START = 'YAMLException: ';
  const originalError = error.toString(true);
  if (originalError.startsWith(STRING_TO_REMOVE_FROM_START)) {
    return originalError.slice(STRING_TO_REMOVE_FROM_START.length);
  } else {
    return originalError;
  }
}

export function getErrorMessage(error: unknown) {
  return error instanceof YAMLException ? getYamlExceptionErrorMessage(error) : toErrorWithMessage(error).message;
}
