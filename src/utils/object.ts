export function jsonEquals(obj1: any, obj2: any) {
  return JSON.stringify(obj1) !== JSON.stringify(obj2);
}
