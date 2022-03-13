export const fromIterator = <a>(itt: Iterator<a>) => ({
  reduce: <b>(z: b, f: (a: a, b: b) => b) => reduce(itt, z, f),
  filter: (p: (a: a) => boolean) => fromIterator(filter(itt, p)),
  takeWhile: (p: (a: a) => boolean) => fromIterator(takeWhile(itt, p)),
});

export const fromRange = (s: number, e: number) =>
  fromIterator(from_range(s, e));

export const fromGen2 = <a>(z1: a, z2: a, nextVal: (x: a, y: a) => a) =>
  fromIterator(from_gen2(z1, z2, nextVal));

function* from_gen2<a>(z1: a, z2: a, nextVal: (x: a, y: a) => a) {
  yield z1;
  yield z2;
  let x1 = z1;
  let x2 = z2;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const x3 = nextVal(x1, x2);
    x1 = x2;
    x2 = x3;
    yield x3;
  }
}

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

function* takeWhile<a>(a: Iterator<a>, p: (a: a) => boolean) {
  let current = a.next();
  while (current.done == false && p(current.value)) {
    yield current.value;
    current = a.next();
  }
}
