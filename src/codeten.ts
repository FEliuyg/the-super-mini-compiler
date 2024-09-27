import { NodeTypes, RootNode, ChildNode } from './parser';

export function codeten(ast: any): string {
  switch (ast.type) {
    case NodeTypes.Program: {
      return ast.body.map(codeten).join('');
    }
    case NodeTypes.ExpressionStatement: {
      return codeten(ast.expression);
    }
    case NodeTypes.CallExpression: {
      return `${ast.callee.name}(${ast.arguments.map((node) => codeten(node)).join(', ')})`;
    }
    case NodeTypes.NumberLiteral:
    case NodeTypes.StringLiteral: {
      return ast.value;
    }
    default: {
      throw new Error(`Unknown node type: ${ast.type}`);
    }
  }
}
