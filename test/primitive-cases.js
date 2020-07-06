export default [
  {
    '-Name': 'Binary with X',
    '-Rule': 'binaryValue',
    '-FailAt': '0',
    'Input': "X'1a2B3c4D'",
    'result_error': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Binary'
    }
  },
  {
    '-Name': 'Binary - empty',
    '-Rule': 'binary',
    'Input': "binary''",
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Binary'
    }
  },
  {
    '-Name': 'Binary - f',
    '-Rule': 'binary',
    'Input': "binary'Zg=='",
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Binary'
    }
  },
  {
    '-Name': 'Binary - f (pad character is optional)',
    '-Rule': 'binary',
    'Input': "binary'Zg'",
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Binary'
    }
  },
  {
    '-Name': 'Binary - fo',
    '-Rule': 'binary',
    'Input': "binary'Zm8='",
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Binary'
    }
  },
  {
    '-Name': 'Binary - fo (pad character is optional)',
    '-Rule': 'binary',
    'Input': "binary'Zm8='",
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Binary'
    }
  },
  {
    '-Name': 'Binary - foo',
    '-Rule': 'binary',
    'Input': "binary'Zm9v'",
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Binary'
    }
  },
  {
    '-Name': 'Binary - foob',
    '-Rule': 'binary',
    'Input': "binary'Zm9vYg=='",
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Binary'
    }
  },
  {
    '-Name': 'Binary - fooba',
    '-Rule': 'binary',
    'Input': "binary'Zm9vYmE='",
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Binary'
    }
  },
  {
    '-Name': 'Binary - foobar',
    '-Rule': 'binary',
    'Input': "binary'Zm9vYmFy'",
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Binary'
    }
  },
  {
    '-Name': 'Date in URL or body',
    '-Rule': 'dateValue',
    'Input': '2012-09-03',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Date'
    }
  },
  {
    '-Name': 'Date',
    '-Rule': 'dateValue',
    'Input': '2012-09-10',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Date'
    }
  },
  {
    '-Name': 'Date',
    '-Rule': 'dateValue',
    'Input': '2012-09-20',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Date'
    }
  },
  {
    '-Name': 'Date',
    '-Rule': 'dateValue',
    'Input': '2012-09-03',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Date'
    }
  },
  {
    '-Name': 'Date: year zero',
    '-Rule': 'dateValue',
    'Input': '0000-01-01',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Date'
    }
  },
  {
    '-Name': 'Date: negative',
    '-Rule': 'dateValue',
    'Input': '-10000-04-01',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Date'
    }
  },
  {
    '-Name': 'DateTimeOffset: no seconds',
    '-Rule': 'dateTimeOffsetValue',
    'Input': '2012-09-03T13:52Z',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.DateTimeOffset'
    }
  },
  {
    '-Name': 'DateTimeOffset: seconds',
    '-Rule': 'dateTimeOffsetValue',
    'Input': '2012-09-03T08:09:02Z',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.DateTimeOffset'
    }
  },
  {
    '-Name': 'DateTimeOffset: subseconds',
    '-Rule': 'dateTimeOffsetValue',
    'Input': '2012-08-31T18:19:22.1Z',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.DateTimeOffset'
    }
  },
  {
    '-Name': 'DateTimeOffset: year zero',
    '-Rule': 'dateTimeOffsetValue',
    'Input': '0000-01-01T00:00Z',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.DateTimeOffset'
    }
  },
  {
    '-Name': 'DateTimeOffset: negative',
    '-Rule': 'dateTimeOffsetValue',
    'Input': '-10000-04-01T00:00Z',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.DateTimeOffset'
    }
  },
  {
    '-Name': 'DateTimeOffset: Midnight this day',
    '-Rule': 'dateTimeOffsetValue',
    '-FailAt': '12',
    'Input': '2011-12-31T24:00Z',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.DateTimeOffset'
    }
  },
  {
    '-Name': 'DateTimeOffset: Midnight this day with seconds',
    '-Rule': 'dateTimeOffsetValue',
    '-FailAt': '12',
    'Input': '2011-12-31T24:00:00Z',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.DateTimeOffset'
    }
  },
  {
    '-Name': 'DateTimeOffset: CEST',
    '-Rule': 'dateTimeOffsetValue',
    'Input': '2012-09-03T14:53+02:00',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.DateTimeOffset'
    }
  },
  {
    '-Name': 'DateTimeOffset: UTC',
    '-Rule': 'dateTimeOffsetValue',
    'Input': '2012-09-03T12:53Z',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.DateTimeOffset'
    }
  },
  {
    '-Name': 'DateTimeOffset: 24:00',
    '-Rule': 'dateTimeOffsetValue',
    '-FailAt': '12',
    'Input': '2012-09-03T24:00-03:00',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.DateTimeOffset'
    }
  },
  {
    '-Name': 'DateTimeOffset: 20th hour UTC',
    '-Rule': 'dateTimeOffsetValue',
    'Input': '2012-11-28T20:00:00.000Z',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.DateTimeOffset'
    }
  },
  {
    '-Name': 'Decimal',
    '-Rule': 'decimalValue',
    'Input': '3.14',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Decimal'
    }
  },
  {
    '-Name': 'Duration in body',
    '-Rule': 'durationValue',
    'Input': 'P6DT23H59M59.9999S',
    'result_error': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Duration'
    }
  },
  {
    '-Name': 'Duration in body: no years allowed',
    '-Rule': 'durationValue',
    '-FailAt': '2',
    'Input': 'P1Y6DT23H59M59.9999S',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Duration'
    }
  },
  {
    '-Name': 'Duration in body: no months allowed',
    '-Rule': 'durationValue',
    '-FailAt': '2',
    'Input': 'P1M6DT23H59M59.9999S',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Duration'
    }
  },
  {
    '-Name': 'Duration in URL',
    '-Rule': 'duration',
    'Input': "duration'P6DT23H59M59.9999S'",
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Duration'
    }
  },
  {
    '-Name': 'Decimal: integer',
    '-Rule': 'decimalValue',
    'Input': '-2',
    'result_error': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Decimal'
    }
  },
  {
    '-Name': 'Decimal: integer',
    '-Rule': 'decimalValue',
    '-FailAt': '4',
    'Input': '+42.',
    'result_error': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Decimal'
    }
  },
  {
    '-Name': 'Decimal: no digit before decimal point',
    '-Rule': 'decimalValue',
    '-FailAt': '0',
    'Input': '.1',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Decimal'
    }
  },
  {
    '-Name': 'Decimal in URL',
    '-Rule': 'decimalValue',
    'Input': '3.14',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Decimal'
    }
  },
  {
    '-Name': 'Double',
    '-Rule': 'doubleValue',
    'Input': '3.14',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Double'
    }
  },
  {
    '-Name': 'Double with exponent',
    '-Rule': 'doubleValue',
    'Input': '-0.314e1',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Double'
    }
  },
  {
    '-Name': 'Negative infinity',
    '-Rule': 'doubleValue',
    'Input': '-INF',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Double'
    }
  },
  {
    '-Name': 'Positive infinity',
    '-Rule': 'doubleValue',
    'Input': 'INF',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Double'
    }
  },
  {
    '-Name': 'Not a Number',
    '-Rule': 'doubleValue',
    'Input': 'NaN',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Double'
    }
  },
  {
    '-Name': 'Double in URL',
    '-Rule': 'doubleValue',
    'Input': '-0.314e1',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Double'
    }
  },
  {
    '-Name': 'Single in URL',
    '-Rule': 'singleValue',
    'Input': '-0.314e1',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Single'
    }
  },
  {
    '-Name': 'Byte',
    '-Rule': 'byteValue',
    'Input': '255',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Byte'
    }
  },
  {
    '-Name': 'SByte',
    '-Rule': 'sbyteValue',
    'Input': '-128',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.SByte'
    }
  },
  {
    '-Name': 'Int16',
    '-Rule': 'int16Value',
    'Input': '+32000',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Int16'
    }
  },
  {
    '-Name': 'Int32',
    '-Rule': 'int32Value',
    'Input': '-2000000000',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Int32'
    }
  },
  {
    '-Name': 'Int64',
    '-Rule': 'int64Value',
    'Input': '1234567890123456789',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Int64'
    }
  },
  {
    '-Name': 'Null: unqualified',
    '-Rule': 'nullValue',
    'Input': 'null',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'null'
    }
  },
  {
    '-Name': 'String',
    '-Rule': 'string',
    'Input': "'ABCDEFGHIHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~!$&('')*+,;=@'",
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.String'
    }
  },
  {
    '-Name': 'String',
    '-Rule': 'string',
    'Input': "'O''Neil'",
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.String'
    }
  },
  {
    '-Name': 'String',
    '-Rule': 'string',
    'Input': "%27O'%27Neil'",
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.String'
    }
  },
  {
    '-Name': 'String',
    '-Rule': 'string',
    '-FailAt': '3',
    'Input': "'O'Neil'",
    'result_error': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.String'
    }
  },
  {
    '-Name': 'String',
    '-Rule': 'string',
    '-FailAt': '5',
    'Input': "'O%27Neil'",
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.String'
    }
  },
  {
    '-Name': 'String',
    '-Rule': 'string',
    'Input': "'%26%28'",
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.String'
    }
  },
  {
    '-Name': 'primitive value in request body - enumeration member',
    '-Rule': 'primitiveValue',
    'Input': 'Yellow',
    'result_error': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.???'
    }
  },
  {
    '-Name': 'primitive value in request body - geo point',
    '-Rule': 'primitiveValue',
    'Input': 'SRID=0;Point(142.1 64.1)',
    'result_error': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.GeographyPoint'
    }
  },
  {
    '-Name': 'primitive value in request body - integer',
    '-Rule': 'primitiveValue',
    'Input': '0123456789',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Int32'
    }
  },
  {
    '-Name': 'primitive value in request body - guid',
    '-Rule': 'primitiveValue',
    'Input': '01234567-89ab-cdef-0123-456789abcdef',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Guid'
    }
  },
  {
    '-Name': 'primitive value in request body - binary',
    '-Rule': 'primitiveValue',
    'Input': 'a123456789abcdefABA=',
    'result_error': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Binary'
    }
  },
  {
    '-Name': 'primitive value in request body - binary with line breaks and spaces',
    '-Rule': 'primitiveValue',
    '-FailAt': '8',
    'Input': 'a1234567 89abcdefABA',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Binary'
    }
  },
  {
    '-Name': 'Key',
    '-Rule': 'string',
    'Input': "'Hugo''s%20Tavern'",
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.String'
    }
  },
  {
    '-Name': 'Correct Guid',
    '-Rule': 'guidValue',
    'Input': '01234567-89ab-cdef-0123-456789abcdef',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Guid'
    }
  },
  {
    '-Name': 'Guid with wrong character',
    '-Rule': 'guidValue',
    '-FailAt': '5',
    'Input': '01234g67-89ab-cdef-0123-456789abcdef',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Guid'
    }
  },
  {
    '-Name': 'Guid with less than 32 digits',
    '-Rule': 'guidValue',
    '-FailAt': '23',
    'Input': '01234567-89ab-cdef-456789abcdef',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Guid'
    }
  },
  {
    '-Name': 'TimeOfDay',
    '-Rule': 'timeOfDayValue',
    'Input': '11:22:33',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.TimeOfDay'
    }
  },
  {
    '-Name': 'TimeOfDay: no seconds',
    '-Rule': 'timeOfDayValue',
    'Input': '11:22',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.TimeOfDay'
    }
  },
  {
    '-Name': 'TimeOfDay: fractional seconds',
    '-Rule': 'timeOfDayValue',
    'Input': '11:22:33.4444444',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.TimeOfDay'
    }
  },
  {
    '-Name': 'TimeOfDay: 24:00',
    '-Rule': 'timeOfDayValue',
    '-FailAt': '1',
    'Input': '24:00:00',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.TimeOfDay'
    }
  },
  {
    '-Name': '5.1.1.1.1 boolean - only true and false',
    '-Rule': 'booleanValue',
    '-FailAt': '0',
    'Input': '0',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Boolean'
    }
  },
  {
    '-Name': '5.1.1.1.1 boolean - only true and false',
    '-Rule': 'booleanValue',
    '-FailAt': '0',
    'Input': '1',
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.Boolean'
    }
  },
  {
    '-Name': 'GeographyCollection',
    '-Rule': 'geographyCollection',
    'Input': "geography'SRID=0;Collection(LineString(142.1 64.1,3.14 2.78))'",
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.GeographyCollection'
    }
  },
  {
    '-Name': 'GeographyLineString',
    '-Rule': 'geographyLineString',
    'Input': "geography'SRID=0;LineString(142.1 64.1,3.14 2.78)'",
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.GeographyLineString'
    }
  },
  {
    '-Name': 'GeographyMultiLineString',
    '-Rule': 'geographyMultiLineString',
    'Input': "geography'SRID=0;MultiLineString((142.1 64.1,3.14 2.78),(142.1 64.1,3.14 2.78))'",
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.GeographyMultiLineString'
    }
  },
  {
    '-Name': 'GeographyMultiPoint',
    '-Rule': 'geographyMultiPoint',
    'Input': "geography'SRID=0;MultiPoint()'",
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.GeographyMultiPoint'
    }
  },
  {
    '-Name': 'GeographyMultiPoint',
    '-Rule': 'geographyMultiPoint',
    'Input': "geography'SRID=0;MultiPoint((142.1 64.1),(1 2))'",
    'result_error': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.GeographyMultiPoint'
    }
  },
  {
    '-Name': 'GeographyMultiPolygon',
    '-Rule': 'geographyMultiPolygon',
    'Input': "geography'SRID=0;MultiPolygon(((1 1,1 1),(1 1,2 2,3 3,1 1)))'",
    'result_error': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.GeographyMultiPolygon'
    }
  },
  {
    '-Name': 'GeographyPoint',
    '-Rule': 'geographyPoint',
    'Input': "geography'SRID=0;Point(142.1 64.1)'",
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.GeographyPoint'
    }
  },
  {
    '-Name': 'GeographyPolygon',
    '-Rule': 'geographyPolygon',
    'Input': "geography'SRID=0;Polygon((1 1,1 1),(1 1,2 2,3 3,1 1))'",
    'result_error': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.GeographyPolygon'
    }
  },
  {
    '-Name': 'GeometryCollection',
    '-Rule': 'geometryCollection',
    'Input': "geometry'SRID=0;Collection(LineString(142.1 64.1,3.14 2.78))'",
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.GeometryCollection'
    }
  },
  {
    '-Name': 'GeometryLineString',
    '-Rule': 'geometryLineString',
    'Input': "geometry'SRID=0;LineString(142.1 64.1,3.14 2.78)'",
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.GeometryLineString'
    }
  },
  {
    '-Name': 'GeometryMultiLineString',
    '-Rule': 'geometryMultiLineString',
    'Input': "geometry'SRID=0;MultiLineString((142.1 64.1,3.14 2.78),(142.1 64.1,3.14 2.78))'",
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.GeometryMultiLineString'
    }
  },
  {
    '-Name': 'GeometryMultiPoint',
    '-Rule': 'geometryMultiPoint',
    'Input': "geometry'SRID=0;MultiPoint()'",
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.GeometryMultiPoint'
    }
  },
  {
    '-Name': 'GeometryMultiPoint',
    '-Rule': 'geometryMultiPoint',
    'Input': "geometry'SRID=0;MultiPoint((142.1 64.1),(1 2))'",
    'result_error': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.GeometryMultiPoint'
    }
  },
  {
    '-Name': 'GeometryMultiPolygon',
    '-Rule': 'geometryMultiPolygon',
    'Input': "geometry'SRID=0;MultiPolygon(((1 1,1 1),(1 1,2 2,3 3,1 1)))'",
    'result_error': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.GeometryMultiPoint'
    }
  },
  {
    '-Name': 'GeometryPoint',
    '-Rule': 'geometryPoint',
    'Input': "geometry'SRID=0;Point(142.1 64.1)'",
    'result': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.GeometryPoint'
    }
  },
  {
    '-Name': 'GeometryPolygon',
    '-Rule': 'geometryPolygon',
    'Input': "geometry'SRID=0;Polygon((1 1,1 1),(1 1,2 2,3 3,1 1))'",
    'result_error': {
      'position': 0,
      'type': 'Literal',
      'value': 'Edm.GeometryPolygon'
    }
  }
];
