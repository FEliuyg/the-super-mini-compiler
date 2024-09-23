import { expect, test } from 'vitest';
import { traverser } from '../src/traverser';
import { NodeTypes, RootNode } from '../src/parser';

test('traverser', () => {
  const expectSteps = [
    ['program-enter', NodeTypes.Program, ''],
    ['callExpression-enter', NodeTypes.CallExpression, NodeTypes.Program],
    ['numberLiteral-enter', NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ['numberLiteral-exit', NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ['callExpression-enter', NodeTypes.CallExpression, NodeTypes.CallExpression],
    ['numberLiteral-enter', NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ['numberLiteral-exit', NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ['numberLiteral-enter', NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ['numberLiteral-exit', NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ['callExpression-exit', NodeTypes.CallExpression, NodeTypes.CallExpression],
    ['callExpression-exit', NodeTypes.CallExpression, NodeTypes.Program],
    ['program-exit', NodeTypes.Program, ''],
  ];

  const ast: RootNode = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.CallExpression,
        name: 'add',
        params: [
          {
            type: NodeTypes.NumberLiteral,
            value: '2',
          },
          {
            type: NodeTypes.CallExpression,
            name: 'subtract',
            params: [
              {
                type: NodeTypes.NumberLiteral,
                value: '4',
              },
              {
                type: NodeTypes.NumberLiteral,
                value: '2',
              },
            ],
          },
        ],
      },
    ],
  };

  const steps: string[][] = [];

  traverser(ast, {
    Program: {
      enter(node, parent) {
        steps.push(['program-enter', node.type, '']);
      },
      exit(node, parent) {
        steps.push(['program-exit', node.type, '']);
      },
    },
    CallExpression: {
      enter(node, parent) {
        steps.push(['callExpression-enter', node.type, parent!.type]);
      },
      exit(node, parent) {
        steps.push(['callExpression-exit', node.type, parent!.type]);
      },
    },
    NumberLiteral: {
      enter(node, parent) {
        steps.push(['numberLiteral-enter', node.type, parent!.type]);
      },
      exit(node, parent) {
        steps.push(['numberLiteral-exit', node.type, parent!.type]);
      },
    },
  });

  expect(steps).toEqual(expectSteps);
});
