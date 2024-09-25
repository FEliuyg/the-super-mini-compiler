import { NodeTypes, RootNode } from './parser';
import { traverser } from './traverser';

export function transformer(ast: RootNode) {
  const newAst: any = {
    type: NodeTypes.Program,
    body: [],
  };

  ast.context = newAst.body;

  traverser(ast, {
    NumberLiteral: {
      enter(node, parent) {
        if (node.type === NodeTypes.NumberLiteral) {
          parent?.context?.push(node);
        }
      },
    },
    StringLiteral: {
      enter(node, parent) {
        if (node.type === NodeTypes.StringLiteral) {
          parent?.context?.push(node);
        }
      },
    },
    CallExpression: {
      enter(node, parent) {
        if (node.type === NodeTypes.CallExpression) {
          let expression: any = {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: node.name,
            },
            arguments: [],
          };

          node.context = expression.arguments;

          if (parent?.type !== NodeTypes.CallExpression) {
            expression = {
              type: 'ExpressionStatement',
              expression: expression,
            };
          }

          parent?.context?.push(expression);
        }
      },
    },
  });

  return newAst;
}
