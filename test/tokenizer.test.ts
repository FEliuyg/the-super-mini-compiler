import { test, expect } from 'vitest';
import { tokenizer } from '../src/tokenizer';

test('tokenizer', () => {
  const code = '(add 2 (subtract 4 2))';

  const tokens = [
    { type: 'paren', value: '(' },
    { type: 'name', value: 'add' },
    { type: 'number', value: '2' },
    { type: 'paren', value: '(' },
    { type: 'name', value: 'subtract' },
    { type: 'number', value: '4' },
    { type: 'number', value: '2' },
    { type: 'paren', value: ')' },
    { type: 'paren', value: ')' },
  ];

  expect(tokenizer(code)).toEqual(tokens);
});

test('left paren', () => {
  const code = '(';
  const tokens = [{ type: 'paren', value: '(' }];
  expect(tokenizer(code)).toEqual(tokens);
});

test('name', () => {
  const code = 'add';
  const tokens = [{ type: 'name', value: 'add' }];
  expect(tokenizer(code)).toEqual(tokens);
});

test('number', () => {
  const code = '123';
  const tokens = [{ type: 'number', value: '123' }];
  expect(tokenizer(code)).toEqual(tokens);
});

test('right paren', () => {
  const code = ')';
  const tokens = [{ type: 'paren', value: ')' }];
  expect(tokenizer(code)).toEqual(tokens);
});

test('(add 2 3)', () => {
  const code = '(add 2 3)';
  const tokens = [
    { type: 'paren', value: '(' },
    { type: 'name', value: 'add' },
    { type: 'number', value: '2' },
    { type: 'number', value: '3' },
    { type: 'paren', value: ')' },
  ];
  expect(tokenizer(code)).toEqual(tokens);
});

test('(concat "ab" "bc")', () => {
  const code = '(concat "ab" "bc")';
  const tokens = [
    { type: 'paren', value: '(' },
    { type: 'name', value: 'concat' },
    { type: 'string', value: 'ab' },
    { type: 'string', value: 'bc' },
    { type: 'paren', value: ')' },
  ];
  expect(tokenizer(code)).toEqual(tokens);
});
