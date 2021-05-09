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
const childrenNodes = R.pathOr([], childrenPath);

const toLabel = (label) => `[label="${label}"]`;
const toID = (id) => id?.replaceAll(".", "_");
const toNode = (node) => `${toID(node.id)} ${toLabel(node.label)}`;
const toEdge = (node1, node2) => `${toID(node1.id)} -> ${toID(node2.id)}`;

const toNodesWithEdge = R.curry((node1, node2) => {
  console.log("node1:", node1);
  console.log("node2:", node2);
  return `${toNode(node1)} ${toEdge(node1, node2)} ${toNode(node2)}`;
});

const toChildren = R.curry((children, main) =>
  R.compose(R.map(toNodesWithEdge(main)), children)
);

const app = R.compose(
  Impure.toConsole("result:"),
  toChildren([
    {
      id: "ui.structure",
      label: "Structure",
      edges: {},
    },
    {
      id: "ui.presentation",
      label: "Presentation",
      edges: {},
    },
    {
      id: "ui.behavior",
      label: "Behavior",
      edges: {},
    },
  ])
);

console.log({ node1 });
app(node1);
