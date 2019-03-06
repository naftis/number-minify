import { decode, encode } from '../';

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

it('throws when trying to encode a floating point number', () => {
  expect(() => encode(1.2)).toThrow();
  expect(() => encode(1.123124891)).toThrow();
});

it('converts correctly with negative numbers', () => {
  let encoded = encode(-1337);
  let decoded = decode(encoded);

  expect(decoded).toEqual(-1337);

  encoded = encode(-1938573912);
  decoded = decode(encoded);

  expect(decoded).toEqual(-1938573912);

  encoded = encode(-0);
  decoded = decode(encoded);

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

it('throws when character set has multiple same characters', () => {
  expect(() => encode(1337, { characters: 'aa' })).toThrow();
  expect(() => encode(-1337, { characters: 'aa' })).toThrow();
  expect(() => decode('aabb', { characters: 'aabb' })).toThrow();
});
