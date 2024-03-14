import { SuperDatePicker } from "../store/date";

export function flatObject(obj: object): Array<[string, any]> {
  const paths = jsonPath(obj);
  let result: Array<[string, any]> = [];
  for (let path of paths) {
    result.push([path.join("."), extractValue(obj, path)]);
  }
  return result;
}

export function extractValue(obj: any, paths: string[]): any {
  if (paths.length === 0) {
    return obj;
  }
  const [head, ...tail] = paths;
  return extractValue(obj[head], tail);
}

export function jsonPath(obj: any): Array<Array<string>> {
  if (obj === null || typeof obj !== "object") {
    return [];
  }
  let keys = Object.keys(obj);
  let result: Array<Array<string>> = [];
  keys.forEach((key) => {
    if (typeof obj[key] === "object") {
      result.push(...jsonPath(obj[key]).map((k) => [key, ...k]));
    } else {
      result.push([key]);
    }
  });
  return result;
}

export function arrayNarray(
  arr: Array<string>,
  arr2: Array<string>
): Array<string> {
  const set = new Set(arr2);
  return arr.filter((item) => !set.has(item));
}

export function mixinTimeRange(obj: any, timeRange: SuperDatePicker): any {
  if (!obj) return null
  let newObj = JSON.parse(JSON.stringify(obj));
  const range = newObj.query.bool.filter.filter((f: any) => !f.range);
  newObj.query.bool.filter = [...range, {
    range: {
      "@timestamp": {
        gte: timeRange.start,
        lte: timeRange.end,
      },
    },
  }]
  return newObj;
}