import { expect, test } from 'vitest';
import { parser } from '../src/parser';
import { Token, TokenTypes } from '../src/tokenizer';

test('parser number', () => {
  const tokens: Token[] = [
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'add' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Number, value: '3' },
    { type: TokenTypes.Paren, value: ')' },
  ];

  const ast = {
    type: 'Program',
    body: [
      {
        type: 'CallExpression',
        name: 'add',
        params: [
          {
            type: 'NumberLiteral',
            value: '2',
          },
          {
            type: 'NumberLiteral',
            value: '3',
          },
        ],
      },
    ],
  };

  expect(parser(tokens)).toEqual(ast);
});

test('parser string', () => {
  const tokens: Token[] = [
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'concat' },
    { type: TokenTypes.String, value: 'ab' },
    { type: TokenTypes.String, value: 'bc' },
    { type: TokenTypes.Paren, value: ')' },
  ];

  const ast = {
    type: 'Program',
    body: [
      {
        type: 'CallExpression',
        name: 'concat',
        params: [
          {
            type: 'StringLiteral',
            value: 'ab',
          },
          {
            type: 'StringLiteral',
            value: 'bc',
          },
        ],
      },
    ],
  };

  expect(parser(tokens)).toEqual(ast);
});

test('parser deep', () => {
  const tokens: Token[] = [
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'add' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'subtract' },
    { type: TokenTypes.Number, value: '4' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Paren, value: ')' },
    { type: TokenTypes.Paren, value: ')' },
  ];

  const ast = {
    type: 'Program',
    body: [
      {
        type: 'CallExpression',
        name: 'add',
        params: [
          {
            type: 'NumberLiteral',
            value: '2',
          },
          {
            type: 'CallExpression',
            name: 'subtract',
            params: [
              {
                type: 'NumberLiteral',
                value: '4',
              },
              {
                type: 'NumberLiteral',
                value: '2',
              },
            ],
          },
        ],
      },
    ],
  };

  expect(parser(tokens)).toEqual(ast);
});

test('number', () => {
  const tokens: Token[] = [{ type: TokenTypes.Number, value: '2' }];

  const ast = {
    type: 'Program',
    body: [
      {
        type: 'NumberLiteral',
        value: '2',
      },
    ],
  };

  expect(parser(tokens)).toEqual(ast);
});
