const prime = require("./prime");

console.log('Find the n consecutive integers to have n distinct prime factors each. What is the first of these numbers?')
const overAllStart = performance.now();

// const factorCount = prompt('input number of distinct prime factors (1-4) : ');
// const limiter = prompt('input limit of search : ');

// console.log('digit', prime.getStartAndEndRange(Number(digit)))
console.log(`Finding first 2 consecutive numbers with 2 distinct prime factors each:`);
const start2 = performance.now();
prime.solve(2)
const end2 = performance.now();
console.log(`Execution time: ${end2 - start2} ms`);

console.log(`Finding first 3 consecutive numbers with 3 distinct prime factors each:`);
const start3 = performance.now();
prime.solve(3)
const end3 = performance.now();
console.log(`Execution time: ${end3 - start3} ms`);

console.log(`Finding first 4 consecutive numbers with 4 distinct prime factors each:`);
const start4 = performance.now();
prime.solve(4)
const end4 = performance.now();
console.log(`Execution time: ${end4 - start4} ms`);

const overAllEnd = performance.now();
console.log(`Overall execution time: ${overAllEnd - overAllStart} ms`);
