const R = require("ramda");

/**
 * Conditions
 *
 * 1. Can't take an argument (It's curried)
 * 2. The return values must be functions
 */

/**
 * The impure functions separated into a special name space
 */
const Impure = {
  toConsole: R.curry((text, x) => {
    console.log(text, x);
    return x;
  }),
};

const options1 = { display: ["children"] };
const display = R.prop("display");

console.log("options:", display(options1));

// Works
const logic5 = R.cond([
  [R.equals(["all"]), R.always("all5")],
  [R.equals(["children"]), R.always("children5")],
  [R.T, R.always("default5")],
]);
//console.log("result5: ", logic5(display(options1)));

// Works
const logic4 = R.cond([
  [R.equals(["all"]), Impure.toConsole("all4")],
  [R.equals(["children"]), Impure.toConsole("children4")],
  [R.T, Impure.toConsole("default4")],
]);
// logic4(display(options1));

// Works
const logic3 = R.cond([
  [R.equals(["all"]), () => console.log("all3")],
  [R.equals(["children"]), () => console.log("children3")],
  [R.T, () => console.log("default3")],
]);
//logic3(display(options1));

// Doesn't works, displays all without breaking at first true
// in plus, it gives an error message
// This function is always called, even if it's not called ...
/*
const logic2 = R.cond([
  [R.equals(["all"]), console.log("all2")],
  [R.equals(["children"]), console.log("children2")],
  [R.T, console.log("default2")],
]);
*/
// logic2(display(options1));

// Doesn't works, displays all without breaking at first true
const logic1 = (options) =>
  R.cond([
    [R.equals(options, ["all"]), console.log("all1")],
    [R.equals(options, ["children"]), console.log("children1")],
    [options, console.log("default1:", options)],
  ]);
//logic1(display(options1));

// Works, the return value must be a function
const fn = R.cond([
  [R.equals(0), R.always("water freezes at 0°C")],
  [R.equals(100), R.always("water boils at 100°C")],
  [R.T, (temp) => "nothing special happens at " + temp + "°C"],
]);
//console.log("fn:", fn(0)); //=> 'water freezes at 0°C'
