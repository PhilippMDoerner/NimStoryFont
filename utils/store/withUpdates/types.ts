import { capitalize, uncapitalize } from 'src/utils/string';

export function getKeys<Name extends string>(name: Name) {
  return {
    name,
    dataField: uncapitalize(name),
    requestStateField: `${uncapitalize(name)}UpdateState`,
    errorField: `${uncapitalize(name)}UpdateError`,
    serverModelField: `${uncapitalize(name)}ServerModel`,
    updateMethod: `update${capitalize(name)}`,
  };
}
