/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';
import { getNestedProperty } from 'src/utils/object';

@Pipe({ name: 'groupByFirstLetter', standalone: true })
export class GroupByFirstLetterPipe<T> implements PipeTransform {
  transform(itemArray: T[], field: keyof T): { key: string; value: T[] }[] {
    const callback = (accumulator: { [key: string]: T[] }, item: T) => {
      const groupedFieldValue = item[field] as string;
      const firstLetter: string = groupedFieldValue[0];
      // eslint-disable-next-line no-prototype-builtins
      if (accumulator.hasOwnProperty(firstLetter))
        accumulator[firstLetter].push(item);
      else accumulator[firstLetter] = [item];
      return accumulator;
    };
    const groupedObj = itemArray.reduce(callback, {});
    const result = Object.keys(groupedObj)
      .map((key) => ({ key, value: groupedObj[key] }))
      .sort((a, b) => (a.key > b.key ? 1 : -1));
    return result;
  }
}

@Pipe({ name: 'groupBy', standalone: true })
export class GroupByPipe<T> implements PipeTransform {
  transform(
    itemArray: T[],
    groupProp: Exclude<keyof T, number | symbol>,
    subSortProp: Exclude<keyof T, number | symbol>,
    reverse = false,
  ): any {
    const callback = (accumulator: any, item: any) => {
      //grouped Field Value = The content of the field by which you're grouping.
      //item = The value being grouped
      //Accumulator = Object with groupedFieldValue as key and an array of items associated with that Field as value
      const groupedFieldValue = getNestedProperty(item, groupProp);

      // eslint-disable-next-line no-prototype-builtins
      const hasGroupAlready = accumulator.hasOwnProperty(groupedFieldValue);
      if (hasGroupAlready) {
        accumulator[groupedFieldValue].push(item);
      } else {
        accumulator[groupedFieldValue] = [item];
      }

      return accumulator;
    };

    const groupedObj: { [key: string]: any[] } = itemArray.reduce(callback, {});
    const groupArray: { key: string; value: any[] }[] = Object.keys(
      groupedObj,
    ).map((key) => ({
      key,
      value: groupedObj[key],
    }));
    const sortedGroupArray: { key: string; value: any[] }[] = groupArray.sort(
      (group1, group2) =>
        group1.key.toLowerCase() < group2.key.toLowerCase() ? -1 : 1,
    );

    sortedGroupArray.forEach((group) => {
      const groupEntries: any[] = group.value;
      group.value = this.sortGroup(groupEntries, subSortProp);
    });

    return reverse ? sortedGroupArray.reverse() : sortedGroupArray;
  }

  private sortGroup<T>(
    group: T[],
    propertyPath: Exclude<keyof T, number | symbol>,
  ): T[] {
    return group.sort((val1: any, val2: any) => {
      let sortValue1 = getNestedProperty(val1, propertyPath);
      const isStringProperty = typeof sortValue1 === 'string';
      if (isStringProperty) {
        sortValue1 = sortValue1.toLowerCase();
      }

      let sortValue2 = getNestedProperty(val2, propertyPath);
      if (isStringProperty) {
        sortValue2 = sortValue2.toLowerCase();
      }
      return sortValue1 < sortValue2 ? 1 : -1;
    });
  }
}
