import { camelToSnake, snakeToCamel } from './string';

/**
 * Returns a property from an object even if there is a mismatch between
 * the actual key on object and `key` due to snakeCase/camelCase mismatch
 * */
export function getProperty<T extends object, O>(
  obj: T,
  key: string,
): O | undefined {
  if (key in obj) {
    return obj[key as keyof T] as O;
  }

  const snakeCaseKey = camelToSnake(key);
  if (snakeCaseKey in obj) {
    return obj[snakeCaseKey as keyof T] as O;
  }

  const camelCaseKey = snakeToCamel(key);
  if (camelCaseKey in obj) {
    return obj[camelCaseKey as keyof T] as O;
  }

  return undefined;
}

/**
 * Returns the correct property key of an object for the given `key` for scenarios
 * where the propertyKey is in snakeCase while `key` is in camelCase and vice-versa.
 */
export function getCorrectKey<T extends object>(
  obj: T,
  key: string,
): keyof T | undefined {
  if (key in obj) {
    return key as keyof T;
  }

  const snakeCaseKey = camelToSnake(key);
  if (snakeCaseKey in obj) {
    return snakeCaseKey as keyof T;
  }

  const camelCaseKey = snakeToCamel(key);
  if (camelCaseKey in obj) {
    return camelCaseKey as keyof T;
  }

  return undefined;
}

/**
 * Checks if an object has a property with the given `key` either as is, in snake_case or in camelCase
 */
export function hasProperty<T extends object>(obj: T, key: string): boolean {
  return key in obj || camelToSnake(key) in obj || snakeToCamel(key) in obj;
}

/**
 * Essentially evaluates an expression "item.field1.field2.field3" with fieldPath being "field1.field2.field3".
 * It iterates over the individual fields and goes through them one by one, returns the last field value.
 */
export function getNestedProperty<T extends object>(
  item: T,
  keyPath: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  /**Returns the field of a given item, even if it is nested within it */
  const keys: string[] = keyPath.split('.');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let currentValue: any = item;
  for (const key of keys) {
    if (!(key in currentValue)) {
      const error = new Error(
        `Cannot find nested property '${keyPath}' in '${JSON.stringify(item)}'`,
      );
      throw error;
    }

    currentValue = currentValue[key];
  }

  return currentValue;
}
