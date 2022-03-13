import { fromRange } from "./LazyIterator";

function div3or5(x: number) {
  return x % 3 === 0 || x % 5 === 0;
}

function solve(n: number) {
  return fromRange(0, n)
    .filter(div3or5)
    .reduce(0, (acc: number, x: number) => acc + x);
}

console.log(`solve 10 = ${solve(10)}`);
console.log(`solve 1000 = ${solve(1000)}`);
