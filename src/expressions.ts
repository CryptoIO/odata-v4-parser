import * as ArrayOrObject from './json';
import * as Lexer from './lexer';
import * as NameOrIdentifier from './nameOrIdentifier';
import * as PrimitiveLiteral from './primitiveLiteral';
import Utils, { SourceArray } from './utils';

export function commonExpr(value: SourceArray, index: number): Lexer.Token {
  const token =
    PrimitiveLiteral.primitiveLiteral(value, index) ||
    parameterAlias(value, index) ||
    ArrayOrObject.arrayOrObject(value, index) ||
    rootExpr(value, index) ||
    methodCallExpr(value, index) ||
    firstMemberExpr(value, index) ||
    functionExpr(value, index) ||
    negateExpr(value, index) ||
    parenExpr(value, index) ||
    castExpr(value, index);
    // jsonPathExpr(value, index);

  if (!token) {
    return;
  }

  const expr =
    addExpr(value, token.next) ||
    subExpr(value, token.next) ||
    mulExpr(value, token.next) ||
    divExpr(value, token.next) ||
    modExpr(value, token.next);

  if (expr) {
    token.value = {
      left: Lexer.clone(token),
      right: expr.value
    };
    token.next = expr.value.next;
    token.type = expr.type;
    token.raw = Utils.stringify(value, token.position, token.next);
  }

  if (token) {
    return Lexer.tokenize(
      value,
      token.position,
      token.next,
      token,
      Lexer.TokenType.CommonExpression
    );
  }
}

export function boolCommonExpr(value: SourceArray, index: number): Lexer.Token {
  const token =
    isofExpr(value, index) ||
    boolMethodCallExpr(value, index) ||
    notExpr(value, index) ||
    commonExpr(value, index) ||
    boolParenExpr(value, index);
    // jsonbExpr(value, index);

  if (!token) {
    return;
  }

  let commonMoreExpr = undefined;
  if (token.type === Lexer.TokenType.CommonExpression) {
    commonMoreExpr =
      eqExpr(value, token.next) ||
      neExpr(value, token.next) ||
      ltExpr(value, token.next) ||
      leExpr(value, token.next) ||
      gtExpr(value, token.next) ||
      geExpr(value, token.next) ||
      hasExpr(value, token.next)||
      inExpr(value, token.next);

    if (commonMoreExpr) {
      token.value = {
        left: token.value,
        right: commonMoreExpr.value
      };
      token.next = commonMoreExpr.value.next;
      token.type = commonMoreExpr.type;
      token.raw = Utils.stringify(value, token.position, token.next);
    }
  }

  const expr = andExpr(value, token.next) || orExpr(value, token.next);

  if (expr) {
    const left = Lexer.clone(token);
    token.next = expr.value.next;
    token.value = {
      left,
      right: expr.value
    };
    token.type = expr.type;
    token.raw = Utils.stringify(value, token.position, token.next);

    if (
      token.type === Lexer.TokenType.AndExpression &&
      token.value.right.type === Lexer.TokenType.OrExpression
    ) {
      token.value.left = Lexer.tokenize(
        value,
        token.value.left.position,
        token.value.right.value.left.next,
        {
          left: token.value.left,
          right: token.value.right.value.left
        },
        token.type
      );
      token.type = token.value.right.type;
      token.value.right = token.value.right.value.right;
    }
  }

  return token;
}

export function jsonPathExpr(value: SourceArray, index: number): Lexer.Token {
  let token = null;
  let start = index;
  let re = /^([\w'#{}\->\[\]]{5,})[\s,]+/;
  let str = Utils.stringify(value, start, value.length);
  // if values does not include a > - abort
  if (!str || !str.includes(">")) {
    return;
  }

  let match = null
  let matches = str.match(re);
  if (matches && matches.length > 0) match = matches[1];

  if (match) {
    token = Lexer.tokenize(value, start, start + match.length, match, Lexer.TokenType.JsonPathExpression); // JsonBExpression vs CommonExpression
  }
  return token;
}

export function andExpr(value: SourceArray, index: number): Lexer.Token {
  let rws = Lexer.RWS(value, index);
  if (rws === index || !Utils.equals(value, rws, 'and')) {
    return;
  }
  const start = index;
  index = rws + 3;
  rws = Lexer.RWS(value, index);
  if (rws === index) {
    return;
  }
  index = rws;
  const token = boolCommonExpr(value, index);
  if (!token) {
    return;
  }

  return Lexer.tokenize(
    value,
    start,
    index,
    token,
    Lexer.TokenType.AndExpression
  );
}

export function orExpr(value: SourceArray, index: number): Lexer.Token {
  let rws = Lexer.RWS(value, index);
  if (rws === index || !Utils.equals(value, rws, 'or')) {
    return;
  }
  const start = index;
  index = rws + 2;
  rws = Lexer.RWS(value, index);
  if (rws === index) {
    return;
  }
  index = rws;
  const token = boolCommonExpr(value, index);
  if (!token) {
    return;
  }

  return Lexer.tokenize(
    value,
    start,
    index,
    token,
    Lexer.TokenType.OrExpression
  );
}

export function leftRightExpr(
  value: SourceArray,
  index: number,
  expr: string,
  tokenType: Lexer.TokenType
): Lexer.Token {
  let rws = Lexer.RWS(value, index);
  if (rws === index) {
    return;
  }
  const start = index;
  index = rws;
  if (!Utils.equals(value, index, expr)) {
    return;
  }
  index += expr.length;
  rws = Lexer.RWS(value, index);
  if (rws === index) {
    return;
  }
  index = rws;
  const token = commonExpr(value, index);
  if (!token) {
    return;
  }

  return Lexer.tokenize(value, start, index, token.value, tokenType);
}
export function eqExpr(value: SourceArray, index: number): Lexer.Token {
  return leftRightExpr(value, index, 'eq', Lexer.TokenType.EqualsExpression);
}
export function neExpr(value: SourceArray, index: number): Lexer.Token {
  return leftRightExpr(value, index, 'ne', Lexer.TokenType.NotEqualsExpression);
}
export function ltExpr(value: SourceArray, index: number): Lexer.Token {
  return leftRightExpr(
    value,
    index,
    'lt',
    Lexer.TokenType.LesserThanExpression
  );
}
export function leExpr(value: SourceArray, index: number): Lexer.Token {
  return leftRightExpr(
    value,
    index,
    'le',
    Lexer.TokenType.LesserOrEqualsExpression
  );
}
export function gtExpr(value: SourceArray, index: number): Lexer.Token {
  return leftRightExpr(
    value,
    index,
    'gt',
    Lexer.TokenType.GreaterThanExpression
  );
}
export function geExpr(value: SourceArray, index: number): Lexer.Token {
  return leftRightExpr(
    value,
    index,
    'ge',
    Lexer.TokenType.GreaterOrEqualsExpression
  );
}
export function hasExpr(value: SourceArray, index: number): Lexer.Token {
  return leftRightExpr(value, index, 'has', Lexer.TokenType.HasExpression);
}

export function inExpr(value: SourceArray, index: number): Lexer.Token { return leftRightExpr(value, index, "in", Lexer.TokenType.InExpression); }

export function addExpr(value: SourceArray, index: number): Lexer.Token {
  return leftRightExpr(value, index, 'add', Lexer.TokenType.AddExpression);
}
export function subExpr(value: SourceArray, index: number): Lexer.Token {
  return leftRightExpr(value, index, 'sub', Lexer.TokenType.SubExpression);
}
export function mulExpr(value: SourceArray, index: number): Lexer.Token {
  return leftRightExpr(value, index, 'mul', Lexer.TokenType.MulExpression);
}
export function divExpr(value: SourceArray, index: number): Lexer.Token {
  return leftRightExpr(value, index, 'div', Lexer.TokenType.DivExpression);
}
export function modExpr(value: SourceArray, index: number): Lexer.Token {
  return leftRightExpr(value, index, 'mod', Lexer.TokenType.ModExpression);
}

export function notExpr(value: SourceArray, index: number): Lexer.Token {
  if (!Utils.equals(value, index, 'not')) {
    return;
  }
  const start = index;
  index += 3;
  const rws = Lexer.RWS(value, index);
  if (rws === index) {
    return;
  }
  index = rws;
  const token = boolCommonExpr(value, index);
  if (!token) {
    return;
  }

  return Lexer.tokenize(
    value,
    start,
    token.next,
    token,
    Lexer.TokenType.NotExpression
  );
}

export function boolParenExpr(value: SourceArray, index: number): Lexer.Token {
  const open = Lexer.OPEN(value, index);
  if (!open) {
    return;
  }
  const start = index;
  index = open;
  index = Lexer.BWS(value, index);
  const token = boolCommonExpr(value, index);
  if (!token) {
    return;
  }
  index = Lexer.BWS(value, token.next);
  const close = Lexer.CLOSE(value, index);
  if (!close) {
    return;
  }
  index = close;

  return Lexer.tokenize(
    value,
    start,
    index,
    token,
    Lexer.TokenType.BoolParenExpression
  );
}
export function parenExpr(value: SourceArray, index: number): Lexer.Token {
  const open = Lexer.OPEN(value, index);
  if (!open) {
    return;
  }
  const start = index;
  index = open;
  index = Lexer.BWS(value, index);
  const token = commonExpr(value, index);
  if (!token) {
    return;
  }
  index = Lexer.BWS(value, token.next);
  const close = Lexer.CLOSE(value, index);
  if (!close) {
    return;
  }
  index = close;

  return Lexer.tokenize(
    value,
    start,
    index,
    token.value,
    Lexer.TokenType.ParenExpression
  );
}

export function boolMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return (
    endsWithMethodCallExpr(value, index) ||
    startsWithMethodCallExpr(value, index) ||
    containsMethodCallExpr(value, index) ||
    intersectsMethodCallExpr(value, index) ||
    containsAnyMethodCallExpr(value, index)
    // jsonbMethodCallExpr(value, index)
  );
}
export function methodCallExpr(value: SourceArray, index: number): Lexer.Token {
  return (
    indexOfMethodCallExpr(value, index) ||
    toLowerMethodCallExpr(value, index) ||
    toUpperMethodCallExpr(value, index) ||
    trimMethodCallExpr(value, index) ||
    substringMethodCallExpr(value, index) ||
    substringOfMethodCallExpr(value, index) ||
    concatMethodCallExpr(value, index) ||
    lengthMethodCallExpr(value, index) ||
    yearMethodCallExpr(value, index) ||
    monthMethodCallExpr(value, index) ||
    dayMethodCallExpr(value, index) ||
    hourMethodCallExpr(value, index) ||
    minuteMethodCallExpr(value, index) ||
    secondMethodCallExpr(value, index) ||
    fractionalsecondsMethodCallExpr(value, index) ||
    totalsecondsMethodCallExpr(value, index) ||
    dateMethodCallExpr(value, index) ||
    timeMethodCallExpr(value, index) ||
    roundMethodCallExpr(value, index) ||
    floorMethodCallExpr(value, index) ||
    ceilingMethodCallExpr(value, index) ||
    distanceMethodCallExpr(value, index) ||
    geoLengthMethodCallExpr(value, index) ||
    totalOffsetMinutesMethodCallExpr(value, index) ||
    minDateTimeMethodCallExpr(value, index) ||
    maxDateTimeMethodCallExpr(value, index) ||
    nowMethodCallExpr(value, index)
  );
}

export function methodCallJsonBFactory(value: SourceArray, index: number, method: string, min?: number, max?: number): Lexer.Token {
  if (typeof min === "undefined") min = 0;
  if (typeof max === "undefined") max = min;

  if (!Utils.equals(value, index, method)) return;
  let start = index;
  index += method.length;
  let open = Lexer.OPEN(value, index);
  if (!open) return;
  index = open;
  index = Lexer.BWS(value, index);
  let parameters;
  if (min > 0) {
    parameters = [];
    /*  let expr = commonExpr(value, index);
     if (expr) {
         parameters.push(expr.value);
         index = expr.next;
         index = Lexer.OWS(value, index); // allow for optional whitespace eg. shipto ->>
     } else return; */

    while (parameters.length < max) {
      // let  expr = jsonValueExpr(value, index) || jsonObjectExpr(value, index) || commonExpr(value, index);
      let  expr = commonExpr(value, index);
      if (parameters.length < min && !expr) {
        return;
      }
      if (expr) {
        parameters.push(expr.value);
        index = expr.next;

        index = Lexer.OWS(value, index);
        let comma = Lexer.COMMA(value, index);
        if (comma) {
          index = comma;
          index = Lexer.OWS(value, index);
        }

      } else break;
    }
  }
  index = Lexer.BWS(value, index);
  let close = Lexer.CLOSE(value, index);
  if (!close) return;
  index = close;

  return Lexer.tokenize(value, start, index, {
    method: method,
    parameters: parameters
  }, Lexer.TokenType.MethodCallJsonExpression);
}

export function methodCallExprFactory(
  value: SourceArray,
  index: number,
  method: string,
  min?: number,
  max?: number
): Lexer.Token {
  if (typeof min === 'undefined') {
    min = 0;
  }
  if (typeof max === 'undefined') {
    max = min;
  }

  if (!Utils.equals(value, index, method)) {
    return;
  }
  const start = index;
  index += method.length;
  const open = Lexer.OPEN(value, index);
  if (!open) {
    return;
  }
  index = open;
  index = Lexer.BWS(value, index);
  let parameters;
  if (min > 0) {
    parameters = [];
    while (parameters.length < max) {
      const expr = commonExpr(value, index);
      if (parameters.length < min && !expr) {
        return;
      } else if (expr) {
        parameters.push(expr.value);
        index = expr.next;
        index = Lexer.BWS(value, index);
        const comma = Lexer.COMMA(value, index);
        if (parameters.length < min && !comma) {
          return;
        }
        if (comma) {
          index = comma;
        } else {
          break;
        }
        index = Lexer.BWS(value, index);
      } else {
        break;
      }
    }
  }
  index = Lexer.BWS(value, index);
  const close = Lexer.CLOSE(value, index);
  if (!close) {
    return;
  }
  index = close;

  return Lexer.tokenize(
    value,
    start,
    index,
    {
      method,
      parameters
    },
    Lexer.TokenType.MethodCallExpression
  );
}

// export function jsonbMethodCallExpr(value: SourceArray, index: number): Lexer.Token { return methodCallJsonBFactory(value, index, "jsonb", 2, 10); }

export function containsMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'contains', 2);
}

export function containsAnyMethodCallExpr(value: SourceArray, index: number): Lexer.Token { return methodCallExprFactory(value, index, "containsAny", 2); }

export function startsWithMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'startswith', 2);
}
export function endsWithMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'endswith', 2);
}
export function lengthMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'length', 1);
}
export function indexOfMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'indexof', 2);
}
export function substringMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'substring', 2, 3);
}
export function substringOfMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'substringof', 2);
}
export function toLowerMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'tolower', 1);
}
export function toUpperMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'toupper', 1);
}
export function trimMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'trim', 1);
}
export function concatMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'concat', 2);
}

export function yearMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'year', 1);
}
export function monthMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'month', 1);
}
export function dayMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'day', 1);
}
export function hourMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'hour', 1);
}
export function minuteMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'minute', 1);
}
export function secondMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'second', 1);
}
export function fractionalsecondsMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'fractionalseconds', 1);
}
export function totalsecondsMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'totalseconds', 1);
}
export function dateMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'date', 1);
}
export function timeMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'time', 1);
}
export function totalOffsetMinutesMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'totaloffsetminutes', 1);
}

export function minDateTimeMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'mindatetime', 0);
}
export function maxDateTimeMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'maxdatetime', 0);
}
export function nowMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'now', 0);
}

export function roundMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'round', 1);
}
export function floorMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'floor', 1);
}
export function ceilingMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'ceiling', 1);
}

export function distanceMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'geo.distance', 2);
}
export function geoLengthMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'geo.length', 1);
}
export function intersectsMethodCallExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return methodCallExprFactory(value, index, 'geo.intersects', 2);
}

export function isofExpr(value: SourceArray, index: number): Lexer.Token {
  if (!Utils.equals(value, index, 'isof')) {
    return;
  }
  const start = index;
  index += 4;
  const open = Lexer.OPEN(value, index);
  if (!open) {
    return;
  }
  index = open;
  index = Lexer.BWS(value, index);
  const expr = commonExpr(value, index);
  if (expr) {
    index = expr.next;
    index = Lexer.BWS(value, index);
    const comma = Lexer.COMMA(value, index);
    if (!comma) {
      return;
    }
    index = comma;
    index = Lexer.BWS(value, index);
  }
  const typeName = NameOrIdentifier.qualifiedTypeName(value, index);
  if (!typeName) {
    return;
  }
  index = typeName.next;
  index = Lexer.BWS(value, index);
  const close = Lexer.CLOSE(value, index);
  if (!close) {
    return;
  }
  index = close;

  return Lexer.tokenize(
    value,
    start,
    index,
    {
      target: expr,
      typename: typeName
    },
    Lexer.TokenType.IsOfExpression
  );
}
export function castExpr(value: SourceArray, index: number): Lexer.Token {
  if (!Utils.equals(value, index, 'cast')) {
    return;
  }
  const start = index;
  index += 4;
  const open = Lexer.OPEN(value, index);
  if (!open) {
    return;
  }
  index = open;
  index = Lexer.BWS(value, index);
  const expr = commonExpr(value, index);
  if (expr) {
    index = expr.next;
    index = Lexer.BWS(value, index);
    const comma = Lexer.COMMA(value, index);
    if (!comma) {
      return;
    }
    index = comma;
    index = Lexer.BWS(value, index);
  }
  const typeName = NameOrIdentifier.qualifiedTypeName(value, index);
  if (!typeName) {
    return;
  }
  index = typeName.next;
  index = Lexer.BWS(value, index);
  const close = Lexer.CLOSE(value, index);
  if (!close) {
    return;
  }
  index = close;

  return Lexer.tokenize(
    value,
    start,
    index,
    {
      target: expr,
      typename: typeName
    },
    Lexer.TokenType.CastExpression
  );
}

export function negateExpr(value: SourceArray, index: number): Lexer.Token {
  if (value[index] !== 0x2d) {
    return;
  }
  const start = index;
  index++;
  index = Lexer.BWS(value, index);
  const expr = commonExpr(value, index);
  if (!expr) {
    return;
  }

  return Lexer.tokenize(
    value,
    start,
    expr.next,
    expr,
    Lexer.TokenType.NegateExpression
  );
}

export function firstMemberExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  let token = inscopeVariableExpr(value, index);
  let member;
  const start = index;

  if (token) {
    if (value[token.next] === 0x2f) {
      index = token.next + 1;
      member = memberExpr(value, index);
      if (!member) {
        return;
      }

      return Lexer.tokenize(
        value,
        start,
        member.next,
        [token, member],
        Lexer.TokenType.FirstMemberExpression
      );
    }
  } else {
    member = memberExpr(value, index);
  }

  token = token || member;
  if (!token) {
    return;
  }

  return Lexer.tokenize(
    value,
    start,
    token.next,
    token,
    Lexer.TokenType.FirstMemberExpression
  );
}
export function memberExpr(value: SourceArray, index: number): Lexer.Token {
  const start = index;
  const token = NameOrIdentifier.qualifiedEntityTypeName(value, index);

  if (token) {
    if (value[token.next] !== 0x2f) {
      return;
    }
    index = token.next + 1;
  }

  const next =
    propertyPathExpr(value, index) || boundFunctionExpr(value, index);

  if (!next) {
    return;
  }
  return Lexer.tokenize(
    value,
    start,
    next.next,
    token ? { name: token, value: next } : next,
    Lexer.TokenType.MemberExpression
  );
}
export function propertyPathExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  let token: any = NameOrIdentifier.odataIdentifier(value, index);
  const start = index;
  if (token) {
    index = token.next;
    const nav =
      collectionPathExpr(value, token.next) ||
      collectionNavigationExpr(value, token.next) ||
      singleNavigationExpr(value, token.next) ||
      complexPathExpr(value, token.next) ||
      singlePathExpr(value, token.next);

    if (nav) {
      index = nav.next;
      token = {
        current: Lexer.clone(token),
        next: nav
      };
    }
  } else if (!token) {
    token = NameOrIdentifier.streamProperty(value, index);
    if (token) {
      index = token.next;
    }
  }

  if (!token) {
    return;
  }
  return Lexer.tokenize(
    value,
    start,
    index,
    token,
    Lexer.TokenType.PropertyPathExpression
  );
}
export function inscopeVariableExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return (
    implicitVariableExpr(value, index) ||
    (isLambdaPredicate ? lambdaVariableExpr(value, index) : undefined)
  );
}
export function implicitVariableExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  if (Utils.equals(value, index, '$it')) {
    return Lexer.tokenize(
      value,
      index,
      index + 3,
      '$it',
      Lexer.TokenType.ImplicitVariableExpression
    );
  }
}
let isLambdaPredicate = false;
let hasLambdaVariableExpr = false;
export function lambdaVariableExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  const token = NameOrIdentifier.odataIdentifier(
    value,
    index,
    Lexer.TokenType.LambdaVariableExpression
  );
  if (token) {
    hasLambdaVariableExpr = true;
    return token;
  }
}
export function lambdaPredicateExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  isLambdaPredicate = true;
  const token = boolCommonExpr(value, index);
  isLambdaPredicate = false;
  if (token && hasLambdaVariableExpr) {
    hasLambdaVariableExpr = false;
    return Lexer.tokenize(
      value,
      token.position,
      token.next,
      token,
      Lexer.TokenType.LambdaPredicateExpression
    );
  }
}
export function anyExpr(value: SourceArray, index: number): Lexer.Token {
  if (!Utils.equals(value, index, 'any')) {
    return;
  }
  const start = index;
  index += 3;
  const open = Lexer.OPEN(value, index);
  if (!open) {
    return;
  }
  index = open;
  index = Lexer.BWS(value, index);
  const variable = lambdaVariableExpr(value, index);
  let predicate;
  if (variable) {
    index = variable.next;
    index = Lexer.BWS(value, index);
    const colon = Lexer.COLON(value, index);
    if (!colon) {
      return;
    }
    index = colon;
    index = Lexer.BWS(value, index);
    predicate = lambdaPredicateExpr(value, index);
    if (!predicate) {
      return;
    }
    index = predicate.next;
  }
  index = Lexer.BWS(value, index);
  const close = Lexer.CLOSE(value, index);
  if (!close) {
    return;
  }
  index = close;

  return Lexer.tokenize(
    value,
    start,
    index,
    {
      variable,
      predicate
    },
    Lexer.TokenType.AnyExpression
  );
}
export function allExpr(value: SourceArray, index: number): Lexer.Token {
  if (!Utils.equals(value, index, 'all')) {
    return;
  }
  const start = index;
  index += 3;

  const open = Lexer.OPEN(value, index);
  if (!open) {
    return;
  }
  index = open;

  index = Lexer.BWS(value, index);
  const variable = lambdaVariableExpr(value, index);
  if (!variable) {
    return;
  }
  index = variable.next;

  index = Lexer.BWS(value, index);

  const colon = Lexer.COLON(value, index);
  if (!colon) {
    return;
  }
  index = colon;

  index = Lexer.BWS(value, index);

  const predicate = lambdaPredicateExpr(value, index);
  if (!predicate) {
    return;
  }
  index = predicate.next;

  index = Lexer.BWS(value, index);

  const close = Lexer.CLOSE(value, index);
  if (!close) {
    return;
  }
  index = close;

  return Lexer.tokenize(
    value,
    start,
    index,
    {
      variable,
      predicate
    },
    Lexer.TokenType.AllExpression
  );
}

export function collectionNavigationExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  const start = index;
  let entity, navigation, path;
  if (value[index] === 0x2f) {
    index++;
    entity = NameOrIdentifier.qualifiedEntityTypeName(value, index);
    if (!entity) {
      return;
    }
    index = entity.next;
  }

  const predicate = keyPredicate(value, index);

  if (predicate) {
    index = predicate.next;
    navigation = singleNavigationExpr(value, index);
    if (navigation) {
      index = navigation.next;
    }
  } else {
    path = collectionPathExpr(value, index);
    if (path) {
      index = path.next;
    }
  }

  if (index > start) {
    return Lexer.tokenize(
      value,
      start,
      index,
      {
        entity,
        predicate,
        navigation,
        path
      },
      Lexer.TokenType.CollectionNavigationExpression
    );
  }
}
export function keyPredicate(
  value: SourceArray,
  index: number,
  metadataContext?: any
): Lexer.Token {
  return simpleKey(value, index, metadataContext) || compoundKey(value, index);
}
export function simpleKey(
  value: SourceArray,
  index: number,
  metadataContext?: any
): Lexer.Token {
  const open = Lexer.OPEN(value, index);
  if (!open) {
    return;
  }
  const start = index;
  index = open;

  const token = keyPropertyValue(value, index);
  if (!token) {
    return;
  }

  const close = Lexer.CLOSE(value, token.next);
  if (!close) {
    return;
  }

  let key;
  if (
    typeof metadataContext === 'object' &&
    metadataContext.key &&
    metadataContext.key.propertyRefs &&
    metadataContext.key.propertyRefs[0] &&
    metadataContext.key.propertyRefs[0].name
  ) {
    key = metadataContext.key.propertyRefs[0].name;
  }

  return Lexer.tokenize(
    value,
    start,
    close,
    { key, value: token },
    Lexer.TokenType.SimpleKey
  );
}
export function compoundKey(value: SourceArray, index: number): Lexer.Token {
  const open = Lexer.OPEN(value, index);
  if (!open) {
    return;
  }
  const start = index;
  index = open;

  let pair = keyValuePair(value, index);
  if (!pair) {
    return;
  }

  const keys = [];
  while (pair) {
    keys.push(pair);
    const comma = Lexer.COMMA(value, pair.next);
    if (comma) {
      pair = keyValuePair(value, comma);
    } else {
      pair = null;
    }
  }

  index = keys[keys.length - 1].next;
  const close = Lexer.CLOSE(value, index);
  if (!close) {
    return;
  }
  index = close;

  return Lexer.tokenize(value, start, index, keys, Lexer.TokenType.CompoundKey);
}
export function keyValuePair(value: SourceArray, index: number): Lexer.Token {
  const prop =
    NameOrIdentifier.primitiveKeyProperty(value, index) ||
    keyPropertyAlias(value, index);

  if (!prop) {
    return;
  }
  const eq = Lexer.EQ(value, prop.next);
  if (!eq) {
    return;
  }

  const val = keyPropertyValue(value, eq);
  if (val) {
    return Lexer.tokenize(
      value,
      index,
      val.next,
      {
        key: prop,
        value: val
      },
      Lexer.TokenType.KeyValuePair
    );
  }
}
export function keyPropertyValue(
  value: SourceArray,
  index: number
): Lexer.Token {
  const token = PrimitiveLiteral.primitiveLiteral(value, index);
  if (token) {
    token.type = Lexer.TokenType.KeyPropertyValue;
    return token;
  }
}
export function keyPropertyAlias(
  value: SourceArray,
  index: number
): Lexer.Token {
  return NameOrIdentifier.odataIdentifier(
    value,
    index,
    Lexer.TokenType.KeyPropertyAlias
  );
}

export function singleNavigationExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  if (value[index] !== 0x2f) {
    return;
  }
  const member = memberExpr(value, index + 1);
  if (member) {
    return Lexer.tokenize(
      value,
      index,
      member.next,
      member,
      Lexer.TokenType.SingleNavigationExpression
    );
  }
}
export function collectionPathExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  let token = countExpr(value, index);
  if (!token) {
    if (value[index] === 0x2f) {
      token =
        boundFunctionExpr(value, index + 1) ||
        anyExpr(value, index + 1) ||
        allExpr(value, index + 1);
    }
  }

  if (token) {
    return Lexer.tokenize(
      value,
      index,
      token.next,
      token,
      Lexer.TokenType.CollectionPathExpression
    );
  }
}
export function complexPathExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  if (value[index] !== 0x2f) {
    return;
  }
  const start = index;
  index++;
  const token = NameOrIdentifier.qualifiedComplexTypeName(value, index);
  if (token) {
    if (value[token.next] !== 0x2f) {
      return;
    }
    index = token.next + 1;
  }

  const expr =
    propertyPathExpr(value, index) || boundFunctionExpr(value, index);

  if (expr) {
    return Lexer.tokenize(
      value,
      start,
      expr.next,
      token ? [token, expr] : [expr],
      Lexer.TokenType.ComplexPathExpression
    );
  }
}
export function singlePathExpr(value: SourceArray, index: number): Lexer.Token {
  if (value[index] !== 0x2f) {
    return;
  }
  const boundFunction = boundFunctionExpr(value, index + 1);
  if (boundFunction) {
    return Lexer.tokenize(
      value,
      index,
      boundFunction.next,
      boundFunction,
      Lexer.TokenType.SinglePathExpression
    );
  }
}
export function functionExpr(value: SourceArray, index: number): Lexer.Token {
  const namespaceNext = NameOrIdentifier.namespace(value, index);
  if (namespaceNext === index || value[namespaceNext] !== 0x2e) {
    return;
  }
  const start = index;
  index = namespaceNext + 1;

  const token = NameOrIdentifier.odataIdentifier(value, index);

  if (!token) {
    return;
  }
  token.position = start;
  token.value.namespace = Utils.stringify(value, start, namespaceNext);
  token.raw = Utils.stringify(value, start, token.next);

  index = token.next;
  const params = functionExprParameters(value, index);

  if (!params) {
    return;
  }

  index = params.next;
  const expr =
    collectionPathExpr(value, index) ||
    collectionNavigationExpr(value, index) ||
    singleNavigationExpr(value, index) ||
    complexPathExpr(value, index) ||
    singlePathExpr(value, index);

  if (expr) {
    index = expr.next;
  }

  return Lexer.tokenize(
    value,
    start,
    index,
    {
      fn: token,
      params,
      expression: expr
    },
    Lexer.TokenType.FunctionExpression
  );
}
export function boundFunctionExpr(
  value: SourceArray,
  index: number
): Lexer.Token {
  return functionExpr(value, index);
}

export function functionExprParameters(
  value: SourceArray,
  index: number
): Lexer.Token {
  const open = Lexer.OPEN(value, index);
  if (!open) {
    return;
  }
  const start = index;
  index = open;

  const params = [];
  let expr = functionExprParameter(value, index);
  while (expr) {
    params.push(expr);
    const comma = Lexer.COMMA(value, expr.next);
    if (comma) {
      index = comma;
      expr = functionExprParameter(value, index);
      if (!expr) {
        return;
      }
    } else {
      index = expr.next;
      expr = null;
    }
  }

  const close = Lexer.CLOSE(value, index);
  if (!close) {
    return;
  }
  index = close;

  return Lexer.tokenize(
    value,
    start,
    index,
    params,
    Lexer.TokenType.FunctionExpressionParameters
  );
}
export function functionExprParameter(
  value: SourceArray,
  index: number
): Lexer.Token {
  const name = parameterName(value, index);
  if (!name) {
    return;
  }
  const eq = Lexer.EQ(value, name.next);
  if (!name || !eq) {
    return;
  }

  const start = index;
  index = eq;

  const param = parameterAlias(value, index) || parameterValue(value, index);

  if (!param) {
    return;
  }
  return Lexer.tokenize(
    value,
    start,
    param.next,
    {
      name,
      value: param
    },
    Lexer.TokenType.FunctionExpressionParameter
  );
}
export function parameterName(value: SourceArray, index: number): Lexer.Token {
  return NameOrIdentifier.odataIdentifier(
    value,
    index,
    Lexer.TokenType.ParameterName
  );
}
export function parameterAlias(value: SourceArray, index: number): Lexer.Token {
  const at = Lexer.AT(value, index);
  if (!at) {
    return;
  }
  const id = NameOrIdentifier.odataIdentifier(value, at);
  if (id) {
    return Lexer.tokenize(
      value,
      index,
      id.next,
      id.value,
      Lexer.TokenType.ParameterAlias
    );
  }
}
export function parameterValue(value: SourceArray, index: number): Lexer.Token {
  const token =
    ArrayOrObject.arrayOrObject(value, index) || commonExpr(value, index);
  if (token) {
    return Lexer.tokenize(
      value,
      index,
      token.next,
      token.value,
      Lexer.TokenType.ParameterValue
    );
  }
}

export function countExpr(value: SourceArray, index: number): Lexer.Token {
  if (Utils.equals(value, index, '/$count')) {
    return Lexer.tokenize(
      value,
      index,
      index + 7,
      '/$count',
      Lexer.TokenType.CountExpression
    );
  }
}
export function refExpr(value: SourceArray, index: number): Lexer.Token {
  if (Utils.equals(value, index, '/$ref')) {
    return Lexer.tokenize(
      value,
      index,
      index + 5,
      '/$ref',
      Lexer.TokenType.RefExpression
    );
  }
}
export function valueExpr(value: SourceArray, index: number): Lexer.Token {
  if (Utils.equals(value, index, '/$value')) {
    return Lexer.tokenize(
      value,
      index,
      index + 7,
      '/$value',
      Lexer.TokenType.ValueExpression
    );
  }
}

export function rootExpr(value: SourceArray, index: number): Lexer.Token {
  if (!Utils.equals(value, index, '$root/')) {
    return;
  }
  const start = index;
  index += 6;

  const entitySet = NameOrIdentifier.entitySetName(value, index);
  let predicate, entity, token;
  if (entitySet) {
    predicate = keyPredicate(value, entitySet.next);
  }
  if (!(entitySet && predicate)) {
    entity = NameOrIdentifier.singletonEntity(value, index);
    if (!entity) {
      return;
    }
    token = {
      entity
    };
  } else {
    token = {
      entitySet,
      keys: predicate
    };
  }

  index = (predicate || entity).next;
  const nav = singleNavigationExpr(value, index);
  if (nav) {
    index = nav.next;
  }

  return Lexer.tokenize(
    value,
    start,
    index,
    {
      current: token,
      next: nav
    },
    Lexer.TokenType.RootExpression
  );
}

export function jsonObjectExpr(value: SourceArray, index: number): Lexer.Token {
  if (Utils.equals(value, index, "->")) return Lexer.tokenize(value, index, index + 2, "->", Lexer.TokenType.RefExpression);
}

export function jsonValueExpr(value: SourceArray, index: number): Lexer.Token {
  if (Utils.equals(value, index, "->>")) return Lexer.tokenize(value, index, index + 3, "->>", Lexer.TokenType.RefExpression);
}
