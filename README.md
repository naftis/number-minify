# number-minify

## Usage

```
npm install number-minify
```

## Syntax

With default settings the conversion is made with characters `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_.`

```ts
encode(1234);
> "JI"

decode("JI");
> 1234
```

You can change the characters by providing a options object.

```ts
encode(1234, {
  characters: 'abcd'
});
> "badbac"

decode("badbac", {
  characters: 'abcd'
});
> 1234
```

## Negative numbers

```ts
encode(-1234, {
  useNegativePrefix: true
});
> "-JI"

decode("-JI", {
  useNegativePrefix: true
});
> -1234
```

By default number-minify doesn't handle negative numbers. If you wish to have a some solution, you can give options to `encode` and `decode` to have negative shortens prefixed with a minus sign (-) and then they can be decoded back to negative numbers.

You **should not** use minus sign (-) as a convertable character while using "useNegativePrefix".
