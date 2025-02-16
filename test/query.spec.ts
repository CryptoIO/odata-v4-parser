import { get } from '@newdash/newdash';
import { PrimitiveTypeEnum } from '@odata/metadata';
import { defaultParser, ODataFilter, ODataParam } from '../src';
import { TokenType } from '../src/lexer';
import { Parser } from '../src/parser';
import { findAll, findOne, isType } from '../src/utils';

describe('Query Test Suite', () => {

  const parser = new Parser();

  const expands = [
    [ODataParam.New().expand('A').toString(), 'A'],
    [ODataParam.New().expand('A/V').toString(), 'A/V'],
    [ODataParam.New().expand('A/B/C').toString(), 'A/B/C'],
    [ODataParam.New().expand(['A', 'B/C']).toString(), 'A'],
    [ODataParam.New().expand('*').toString(), '*']
  ];

  expands.forEach(([original, parsed]) => {

    it(`should parse ${original}`, () => {

      expect(parser.query(original).value.options[0].value.items[0].raw).toEqual(parsed);

    });

  });

  it('should parse $top', () => {

    const ast = parser.query('$top=1');

    expect(ast.value.options[0].type).toBe(TokenType.Top);

    if (isType(ast.value.options[0], TokenType.Top)) {
      expect(ast.value.options[0].value.raw).toEqual('1');
    }

  });

  it('should parse $top and $skip', () => {
    const ast = defaultParser.query('$top=1&$skip=120');
    expect(ast.value.options[0].type).toBe(TokenType.Top);
    expect(ast.value.options[1].type).toBe(TokenType.Skip);

    if (isType(ast.value.options[0], TokenType.Top)) {
      expect(ast.value.options[0].value.raw).toEqual('1');
    }
    if (isType(ast.value.options[1], TokenType.Skip)) {
      expect(ast.value.options[1].value.raw).toEqual('120');
    }
  });

  it('should parse $select', () => {
    expect(parser.query('$select=A').value.options[0].value.items[0].value.raw).toEqual('A');
    expect(parser.query('$select=*').value.options[0].value.items[0].value.value).toEqual('*');
    let ast = defaultParser.query('$select=A,B,C');
    expect(findAll(ast, TokenType.SelectPath).map((node) => get(node, 'value.value.name'))
    ).toStrictEqual(['A', 'B', 'C']);
    ast = defaultParser.query('$select=A, B,C');
    expect(findAll(ast, TokenType.SelectPath).map((node) => get(node, 'value.value.name'))
    ).toStrictEqual(['A', 'B', 'C']);

    parser.query('$select=A/B');
  });

  it('should parse $search', () => {

    parser.query('$search=theo');
    parser.query('$search="theo%20sun"');

  });

  it('should parse $orderby', () => {
    parser.query('$orderby=A desc');
    parser.query('$orderby=A desc,B asc');
    parser.query('$orderby=A desc, B asc');

  });

  it('should parse $format', () => {
    parser.query('$format=xml');
    parser.query('$format=json');
    parser.query('$format=JSON');
    parser.query('$format=atom');
  });

  it('should parse $count', () => {
    const ast = parser.query('$count=true');
    const node = findOne(ast, TokenType.InlineCount);
    expect(node).not.toBeUndefined();
  });

  it('should parse $filter only', () => {
    const ast = defaultParser.query('$filter=id eq 1');
    expect(ast).not.toBeUndefined();
    expect(ast.value.options).not.toBeUndefined();
    expect(ast.value.options).toHaveLength(1);

  });

  it('should parse complex uri', () => {

    const u1 = ODataParam.New()
      .top(1)
      .skip(10)
      .select(['A', 'B'])
      .orderbyMulti([{ field: 'C', order: 'asc' }, { field: 'D', order: 'desc' }])
      .format('json')
      .search('A')
      .expand('F1,F2')
      .filter(ODataFilter.New().field('A').eq(1).toString())
      .toString();
    const ast = defaultParser.query(u1);

    expect(findOne(ast, TokenType.Filter).value).not.toBeNull();

    expect(findOne(ast, TokenType.Top)).toMatchObject({
      type: TokenType.Top,
      value: {
        type: TokenType.Literal,
        value: PrimitiveTypeEnum.Int32
      }
    });
    expect(findOne(ast, TokenType.Skip).value.raw).toBe('10');

    expect(findOne(ast, TokenType.Format).value.format).toBe('json');
    expect(findOne(ast, TokenType.Search).value.value).toBe('A');

    expect(
      findOne(ast, TokenType.Expand)
        .value
        .items
        .map((item) => item.raw)
    ).toStrictEqual(['F1', 'F2']);

  });

});
