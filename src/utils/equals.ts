export function equals(a: Object, b: Object) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function same(a: { id: string }, b: { id: string }) {
  return !!a && !!b && a.id === b.id;
}
