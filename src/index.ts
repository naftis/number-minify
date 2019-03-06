/*
 Based on work by:
 - Ady Liu <imxylz@gmail.com>
 - Ahmad gharbeia <ahmad@arabdigitalexpression.org>
*/

const DEFAULT_OPTIONS = {
  characters: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_.'
};

interface IOptions {
  characters?: string;
}

/**
 * Converts integers to strings
 * @param largeInteger Number which is converted to string
 * @param options Options effecting the conversion
 */
export function encode(
  largeInteger: number,
  options: IOptions = DEFAULT_OPTIONS
) {
  if (!options.characters) {
    options.characters = DEFAULT_OPTIONS.characters;
  }

  if (!Number.isInteger(largeInteger)) {
    throw new Error(`Number '${largeInteger}' was not integer`);
  }

  if (!areAllCharactersUnique(options.characters)) {
    throw new Error(
      `All characters in character set '${options.characters}' were not unique`
    );
  }

  const isNegative = largeInteger < 0;
  let absoluteInt = Math.abs(largeInteger);

  if (absoluteInt === 0) {
    return options.characters[0];
  }

  const { length: radix } = options.characters;
  let output = '';

  while (absoluteInt !== 0) {
    output = options.characters[absoluteInt % radix] + output;
    absoluteInt = Math.floor(absoluteInt / radix);
  }

  return isNegative ? `-${output}` : output;
}

/**
 * Converts integers to strings
 * @param largeInteger Number which is converted to string
 * @param options Options effecting the conversion
 */
export function decode(
  shortString: string,
  options: IOptions = DEFAULT_OPTIONS
) {
  if (!options.characters) {
    options.characters = DEFAULT_OPTIONS.characters;
  }

  if (!areAllCharactersValid(shortString, options.characters)) {
    throw new Error(
      `All characters in '${shortString}' were not in character set '${
        options.characters
      }'`
    );
  }

  if (!areAllCharactersUnique(options.characters)) {
    throw new Error(
      `All characters in character set '${options.characters}' were not unique`
    );
  }

  const firstCharacter: string | undefined = shortString[0];
  const isNegative = firstCharacter === '-';

  if (isNegative) {
    shortString = shortString.slice(1);
  }

  let output = 0;
  let exp = 1;

  const reversedString = Array.from(shortString).reverse();
  const { length: radix } = options.characters;

  for (const character of reversedString) {
    output += exp * options.characters.indexOf(character);
    exp *= radix;
  }

  return isNegative ? -output : output;
}

function areAllCharactersValid(test: string, characters: string) {
  const firstCharacter: string | undefined = test[0];
  const isNegative = firstCharacter === '-';

  if (isNegative) {
    test = test.slice(1);
  }

  for (const character of test) {
    if (!characters.includes(character)) {
      return false;
    }
  }

  return true;
}

function areAllCharactersUnique(characters: string) {
  const newCharacters = Array.from(new Set(characters));
  return characters.length === newCharacters.length;
}
