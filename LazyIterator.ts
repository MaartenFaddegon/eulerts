export const fromIterator = <a>(itt: Iterator<a>) => ({
  reduce: <b>(z: b, f: (a: a, b: b) => b) => reduce(itt, z, f),
  filter: (p: (a: a) => boolean) => fromIterator(filter(itt, p)),
});

export const fromRange = (s: number, e: number) =>
  fromIterator(from_range(s, e));

function* from_range(start: number, end: number) {
  for (let x = start; x < end; x++) {
    yield x;
  }
}

function* filter<a>(a: Iterator<a>, p: (a: a) => boolean) {
  let current = a.next();
  while (current.done == false) {
    if (p(current.value)) yield current.value;
    current = a.next();
  }
}

function reduce<a, b>(a: Iterator<a>, z: b, f: (a: a, b: b) => b) {
  let acc = z;
  let current = a.next();
  while (current.done == false) {
    acc = f(current.value, acc);
    current = a.next();
  }
  return acc;
}
