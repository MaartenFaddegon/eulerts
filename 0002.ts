import { fromGen2 } from "./LazyIterator";

function add(x1: number, x2: number) {
  return x1 + x2;
}

function lte(n: number) {
  return (x: number) => x <= n;
}

function isEven(x: number): boolean {
  return x % 2 === 0;
}

function solve(n: number) {
  return fromGen2(1, 2, add).takeWhile(lte(n)).filter(isEven).reduce(0, add);
}

/* fib<60   =  1, 2, 3, 5, 8, 13, 21, 34, 55
 * filter even    2    +   8     +    34     = 44
 */
console.log(`solve 60 = ${solve(60)}`);

console.log(`solve 4.000.000 = ${solve(4000000)}`);
