export enum TokenType {
  Paren,
  Name,
  Number,
}

export interface Token {
  type: TokenType;
  value: string;
}

export function tokenizer(code: string) {
  let current = 0;

  const result: Token[] = [];

  while (current < code.length) {
    let letter = code[current];

    // 左括号
    if (letter === '(' || letter === ')') {
      result.push({ type: TokenType.Paren, value: letter });
      current++;
      continue;
    }

    // 名称
    const wordReg = /[a-z]/i;
    if (wordReg.test(letter)) {
      let name = '';
      // /[a-z]/i.test(undefined) return true
      while (current < code.length && wordReg.test(code[current])) {
        name += code[current];
        current++;
      }
      result.push({ type: TokenType.Name, value: name });
      continue;
    }

    // 数值
    const numberReg = /[0-9]/;
    if (numberReg.test(letter)) {
      let number = '';
      while (numberReg.test(code[current])) {
        number += code[current];
        current++;
      }
      result.push({ type: TokenType.Number, value: number });
      continue;
    }

    // 空格
    const whitespaceReg = /\s/;
    if (whitespaceReg.test(letter)) {
      current++;
      continue;
    }
  }

  return result;
}
