import { capitalize, uncapitalize } from 'src/utils/string';

export function getKeys<Name extends string>(name: Name) {
  return {
    name,
    dataField: uncapitalize(name),
    requestStateField: `${uncapitalize(name)}CreateState`,
    errorField: `${uncapitalize(name)}CreateError`,
    createMethod: `create${capitalize(name)}`,
  };
}
