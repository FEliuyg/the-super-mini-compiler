import { test, expect } from 'vitest';
import { tokenizer, TokenType } from '../src';

test('(add 2 (subtract 4 2))', () => {
  const code = '(add 2 (subtract 4 2))';

  const result = [
    { type: TokenType.Paren, value: '(' },
    { type: TokenType.Name, value: 'add' },
    { type: TokenType.Number, value: '2' },
    { type: TokenType.Paren, value: '(' },
    { type: TokenType.Name, value: 'subtract' },
    { type: TokenType.Number, value: '4' },
    { type: TokenType.Number, value: '2' },
    { type: TokenType.Paren, value: ')' },
    { type: TokenType.Paren, value: ')' },
  ];

  expect(tokenizer(code)).toEqual(result);
});

test('paren', () => {
  const code = '(';

  const result = [{ type: TokenType.Paren, value: '(' }];

  expect(tokenizer(code)).toEqual(result);
});

test('name', () => {
  const code = 'add';

  const result = [{ type: TokenType.Name, value: 'add' }];

  expect(tokenizer(code)).toEqual(result);
});

test('number', () => {
  const code = '2';

  const result = [{ type: TokenType.Number, value: '2' }];

  expect(tokenizer(code)).toEqual(result);
});
