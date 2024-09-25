import { NodeTypes, RootNode, ChildNode, CallExpressionNode } from './parser';

interface VisitorOptionFunc {
  (node: RootNode | ChildNode, parent: RootNode | CallExpressionNode | null): void;
}

interface VisitorOption {
  enter?: VisitorOptionFunc;
  exit?: VisitorOptionFunc;
}

interface Visitor {
  [NodeTypes.Program]?: VisitorOption;
  [NodeTypes.CallExpression]?: VisitorOption;
  [NodeTypes.NumberLiteral]?: VisitorOption;
  [NodeTypes.StringLiteral]?: VisitorOption;
}

export function traverser(ast: RootNode, visitor: Visitor) {
  function traverseArray(array: ChildNode[], parent: RootNode | CallExpressionNode) {
    array.forEach((child) => {
      traverseNode(child, parent);
    });
  }

  function traverseNode(node: RootNode | ChildNode, parent: RootNode | CallExpressionNode | null) {
    const methods = visitor[node.type];

    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    switch (node.type) {
      case NodeTypes.Program: {
        traverseArray(node.body, node);
        break;
      }
      case NodeTypes.CallExpression: {
        traverseArray(node.params, node);
        break;
      }
      case NodeTypes.NumberLiteral:
      case NodeTypes.StringLiteral: {
        break;
      }
      default: {
        throw new Error(`Node type  not supported`);
      }
    }

    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }

  traverseNode(ast, null);
}
