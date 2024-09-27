import { Token, TokenTypes } from './tokenizer';

export enum NodeTypes {
  Program = 'Program',
  CallExpression = 'CallExpression',
  NumberLiteral = 'NumberLiteral',
  StringLiteral = 'StringLiteral',
  ExpressionStatement = 'ExpressionStatement',
}

export interface Node {
  type: NodeTypes;
}

export interface RootNode extends Node {
  type: NodeTypes.Program;
  body: ChildNode[];
  context?: ChildNode[];
}

export interface CallExpressionNode extends Node {
  type: NodeTypes.CallExpression;
  name: string;
  params: ChildNode[];
  context?: ChildNode[];
}

export interface NumberNode extends Node {
  type: NodeTypes.NumberLiteral;
  value: string;
}

export interface StringLiteralNode extends Node {
  type: NodeTypes.StringLiteral;
  value: string;
}

export type ChildNode = NumberNode | CallExpressionNode | StringLiteralNode;

function createRootNode(): RootNode {
  return {
    type: NodeTypes.Program,
    body: [],
  };
}

function createNumberNode(value: string): NumberNode {
  return {
    type: NodeTypes.NumberLiteral,
    value,
  };
}

function createCallExpression(name: string): CallExpressionNode {
  return {
    type: NodeTypes.CallExpression,
    name,
    params: [],
  };
}

function createStringLiteralNode(value: string): StringLiteralNode {
  return {
    type: NodeTypes.StringLiteral,
    value,
  };
}

export function parser(tokens: Token[]): RootNode {
  const rootNode = createRootNode();
  let current = 0;

  function walk() {
    let token = tokens[current];

    if (token.type === TokenTypes.Number) {
      current++;
      return createNumberNode(token.value);
    }

    if (token.type === TokenTypes.String) {
      current++;
      return createStringLiteralNode(token.value);
    }

    if (token.type === TokenTypes.Paren && token.value === '(') {
      token = tokens[++current];

      const callExpressionNode = createCallExpression(token.value);

      token = tokens[++current];
      while (!(token.type === TokenTypes.Paren && token.value === ')')) {
        callExpressionNode.params.push(walk());
        token = tokens[current];
      }
      current++;

      return callExpressionNode;
    }

    throw new Error(`Unknown token ${token.type}`);
  }

  rootNode.body.push(walk());

  return rootNode;
}
