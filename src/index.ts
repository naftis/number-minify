/*
 Based on work by:
 - Ady Liu <imxylz@gmail.com>
 - Ahmad gharbeia <ahmad@arabdigitalexpression.org>
*/

const DEFAULT_OPTIONS = {
  characters:
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_.',
  useNegativePrefix: false
};

interface IOptions {
  characters?: string;
  useNegativePrefix?: boolean;
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
  if (isNegative && !options.useNegativePrefix) {
    throw new Error(
      `Negative number '${largeInteger}' used without option 'useNegativePrefix' set to 'true'`
    );
  }

  if (largeInteger === 0) {
    return options.characters[0];
  }

  const needsToBePrefixed = isNegative && options.useNegativePrefix;
  if (needsToBePrefixed) {
    largeInteger *= -1;
  }

  const { length: radix } = options.characters;
  let output = '';

  while (largeInteger !== 0) {
    output = options.characters[largeInteger % radix] + output;
    largeInteger = Math.floor(largeInteger / radix);
  }

  return needsToBePrefixed ? `-${output}` : output;
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

  if (
    !areAllCharactersValid(
      shortString,
      options.characters,
      options.useNegativePrefix
    )
  ) {
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
  const needsToBePrefixed = options.useNegativePrefix && firstCharacter === '-';

  if (needsToBePrefixed) {
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

  return needsToBePrefixed ? -output : output;
}

function areAllCharactersValid(
  test: string,
  characters: string,
  useNegativePrefix?: boolean
) {
  const hasAllowedNegativePrefix = useNegativePrefix && test[0] === '-';
  if (hasAllowedNegativePrefix) {
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
