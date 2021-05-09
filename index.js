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

const childrenPath = ["edges", "children"];
const siblingsPath = ["edges", "siblings"];

const toLabel = (label) => `[label="${label}"]`;
const toID = (id) => id?.replaceAll(".", "_");
const toNode = (node) => `${toID(node.id)} ${toLabel(node.label)}`;
const toEdge = (node1, node2, arrow) =>
  `${toID(node1.id)} ${arrow} ${toID(node2.id)}`;

const toChildrenNodes = R.curry((node1, arrow, node2) => {
  return `${toNode(node1)} ${toEdge(node1, node2, arrow)} ${toNode(node2)}`;
});

const toChildren = (main) =>
  R.map(toChildrenNodes(main, "->"), R.pathOr([], childrenPath, main));

const toSiblingNodes = (node) => {
  return toChildrenNodes(R.head(R.pathOr([], siblingsPath, node)), "--", node);
};

const toSiblings = (main) =>
  R.map(toSiblingNodes, R.pathOr([], siblingsPath, main));

const children = R.compose(
  Impure.toConsole("result:"),
  R.join(" "),
  toChildren
);

const siblings = R.compose(
  Impure.toConsole("result:"),
  R.join(" "),
  toSiblings
);

siblings(node2);
children(node1);
