/**
 * FP with Ramda
 * See https://tutorials.paqmind.com/ramda-I/challenges/0.1.qzn
 */

const R = require("ramda");

// Ch3
// With the same args the same results are returned

let add = R.curry((x, y) => x + y);
// add(x)(y) => y => x + y

add(1, 2);
// With the same args the same results are returned

add(2)(1);
// x => y => x + y
// 2 => y => 2 + y
// 1 => 2 + 1

// Ch2
// Watch the syntax !!!

let add = (x, y) => x + y;
R.partial(add, 1)(2);
// Err, [] needed

R.partial(add, 1, 2);
// Err, [] needed

R.partial(add, [])(1, 2);
// add2 = add
// 1 + 2

R.partial(add, [1])(2);
// add2 = y => 1 + y
// 1 + 2

R.partial(add, [1, 2])();
// add2 = () => 1 + 2

R.partial(add, [1, 2, 3])();
// Drops the extra arg
// add2 = () => 1 + 2

// Ch1: online
