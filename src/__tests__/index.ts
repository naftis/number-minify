import { encode, decode } from '../';

it('converts correctly without options', () => {
  let encoded = encode(1337);
  let decoded = decode(encoded);

  expect(decoded).toEqual(1337);

  encoded = encode(1938573912);
  decoded = decode(encoded);

  expect(decoded).toEqual(1938573912);

  encoded = encode(0);
  decoded = decode(encoded);

  expect(decoded).toEqual(0);
});

it('throws when encoding negative values without options', () => {
  expect(() => encode(-1234)).toThrow();
  expect(() => decode(encode(-1234))).toThrow();
  expect(() => decode('-1234')).toThrow();
});

it('throws when trying to encode a floating point number', () => {
  expect(() => encode(1.2)).toThrow();
  expect(() => encode(1.123124891)).toThrow();
});

it('converts correctly with allowing negative numbers', () => {
  let encoded = encode(-1337, {
    useNegativePrefix: true
  });
  let decoded = decode(encoded, {
    useNegativePrefix: true
  });

  expect(decoded).toEqual(-1337);

  encoded = encode(-1938573912, {
    useNegativePrefix: true
  });
  decoded = decode(encoded, {
    useNegativePrefix: true
  });

  expect(decoded).toEqual(-1938573912);

  encoded = encode(-0, {
    useNegativePrefix: true
  });
  decoded = decode(encoded, {
    useNegativePrefix: true
  });

  expect(decoded).toEqual(0);
});

it('converts correctly with different character set', () => {
  let encoded = encode(1337, { characters: 'abcd' });
  let decoded = decode(encoded, { characters: 'abcd' });

  expect(decoded).toEqual(1337);

  encoded = encode(1938573912, { characters: 'abcd' });
  decoded = decode(encoded, { characters: 'abcd' });

  expect(decoded).toEqual(1938573912);

  encoded = encode(0, { characters: 'abcd' });
  decoded = decode(encoded, { characters: 'abcd' });

  expect(decoded).toEqual(0);
});

it('uses the different character set', () => {
  const encoded = encode(1337, { characters: 'abcd' });
  const encodedNormally = encode(1337);

  expect(encoded).not.toEqual(encodedNormally);
});

it('converts correctly with different character and allowing negative numbers', () => {
  let encoded = encode(-1337, { characters: 'abcd', useNegativePrefix: true });
  let decoded = decode(encoded, {
    characters: 'abcd',
    useNegativePrefix: true
  });

  expect(decoded).toEqual(-1337);

  encoded = encode(-1938573912, {
    characters: 'abcd',
    useNegativePrefix: true
  });
  decoded = decode(encoded, { characters: 'abcd', useNegativePrefix: true });

  expect(decoded).toEqual(-1938573912);

  encoded = encode(-0, { characters: 'abcd', useNegativePrefix: true });
  decoded = decode(encoded, { characters: 'abcd', useNegativePrefix: true });

  expect(decoded).toEqual(0);
});

it('throws when character set has multiple same characters', () => {
  expect(() =>
    encode(-1337, { characters: 'aa', useNegativePrefix: true })
  ).toThrow();

  expect(() => encode(1337, { characters: 'aa' })).toThrow();
  expect(() => decode('aabb', { characters: 'aabb' })).toThrow();
});

it('converts to the correct character', () => {
  let encoded = encode(0, { characters: 'abcdef' });
  expect(encoded).toEqual('a');

  encoded = encode(1, { characters: 'abcdef' });
  expect(encoded).toEqual('b');

  encoded = encode(2, { characters: 'abcdef' });
  expect(encoded).toEqual('c');

  encoded = encode(3, { characters: 'abcdef' });
  expect(encoded).toEqual('d');
});
