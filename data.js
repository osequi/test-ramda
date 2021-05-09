const node1 = {
  id: "ui",
  label: "User Interface",
  edges: {
    children: [
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
    ],
  },
};

const node2 = {
  id: "ui.web",
  label: "Web User Interface",
  edges: {
    siblings: [
      {
        id: "ui.web.html",
        label: "HTML",
        edges: {
          siblings: [
            {
              id: "ui.structure",
              label: "Structure",
              edges: {},
            },
          ],
        },
      },
      {
        id: "ui.web.css",
        label: "CSS",
        edges: {
          siblings: [
            {
              id: "ui.presentation",
              label: "Presentation",
              edges: {},
            },
          ],
        },
      },
      {
        id: "ui.web.javascript",
        label: "JavaScript",
        edges: {
          siblings: [
            {
              id: "ui.behavior",
              label: "Behavior",
              edges: {},
            },
          ],
        },
      },
    ],
  },
};

module.exports = { node1, node2 };
