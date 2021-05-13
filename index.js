const { node1, node2 } = require("./data");
const R = require("ramda");

/**
 * The impure functions separated into a special name space
 */
const Impure = {
  toConsole: R.curry((text, x) => {
    console.log(text, x);
    return x;
  }),
};

const takeProp = R.curry((propName, props) => {
  Impure.toConsole("takeProp:", R.prop(propName));
  return props;
});

// Works
const destructure1 = R.compose(Impure.toConsole("result1:"), R.prop("node1"));

/**
 * Works not really
 * node3: [Function: f1]
takeProp: [Function: f1]
result9: {
  node1: { id: 'ui', label: 'User Interface', edges: { children: [Array] } },
  node2: {
    id: 'ui.web',
    label: 'Web User Interface',
    edges: { siblings: [Array] }
  }
}

 */
const destructure9 = R.compose(Impure.toConsole("result9:"), takeProp("node1"));

// Works not: `node: [Function: f1]`
const destructure2 = (node) => R.compose(Impure.toConsole("node2:", node));

// Works not: `node: [Function: f1]`
const destructure3 = (node) => Impure.toConsole("node3:", node);

// Works not: `node: [Function: f1]`
const destructure4 = (node) => console.log("node4:", node);

// Works not: arity error
/*
const destructure5 = R.compose(
  Impure.toConsole("result5:"),
  R.prop("node1"),
  destructure4(R.prop("node1"))
);
*/

// Works not:
// code: [Function: f1]
// result6:
const destructure6 = R.compose(
  Impure.toConsole("result6:"),
  R.prop("node1"),
  destructure3(R.prop("node1"))
);

/**
 * Works not really:
 * 
 * node3: [Function: f1]
node3: {
  id: 'ui',
  label: 'User Interface',
  edges: { children: [ [Object], [Object], [Object] ] }
}
result6: 
 */
const destructure7 = R.compose(
  Impure.toConsole("result6:"),
  R.prop("node1"),
  destructure3,
  R.prop("node1")
);

// Works not: arity error
/*
const destructure8 = R.compose(
  Impure.toConsole("result6:"),
  R.prop("node1"),
  destructure2,
  R.prop("node1")
);
*/

const nodes = { node1, node2 };
//destructure1(nodes);
//destructure2(R.prop("node1"));
//destructure3(R.prop("node1"));
//destructure4(R.prop("node1"));
//destructure5(nodes);
//destructure6(nodes);
//destructure7(nodes);
//destructure8(nodes);
destructure9(nodes);
