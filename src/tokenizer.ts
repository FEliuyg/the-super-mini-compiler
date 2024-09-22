export enum TokenTypes {
  Number = 'number',
  Paren = 'paren',
  Name = 'name',
  String = 'string',
}

export interface Token {
  type: TokenTypes;
  value: string;
}

export function tokenizer(code: string): Token[] {
  let current = 0;
  let tokens: Token[] = [];

  while (current < code.length) {
    let char = code[current];
    if (char === '(') {
      tokens.push({
        type: TokenTypes.Paren,
        value: char,
      });
      current++;
      continue;
    }

    if (char === ')') {
      tokens.push({
        type: TokenTypes.Paren,
        value: char,
      });
      current++;
      continue;
    }

    const LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = '';
      // /[0-9]/.test(undefined) => false， /[a-z]/i.test(undefined) => true，因为有隐式转化 undefined => 'undefined'
      while (char && LETTERS.test(char)) {
        value += char;
        char = code[++current];
      }
      tokens.push({
        type: TokenTypes.Name,
        value,
      });
      continue;
    }

    const NUMBER = /[0-9]/;
    if (NUMBER.test(char)) {
      let value = '';
      while (NUMBER.test(char)) {
        value += char;
        char = code[++current];
      }
      tokens.push({
        type: TokenTypes.Number,
        value,
      });
      continue;
    }

    const WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    if (char === '"') {
      let value = '';
      char = code[++current];
      while (char && char !== '"') {
        value += char;
        char = code[++current];
      }
      tokens.push({
        type: TokenTypes.String,
        value,
      });
      current++;
      continue;
    }

    throw new Error('Unexpected character');
  }

  return tokens;
}
