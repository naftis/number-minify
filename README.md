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

Negative numbers are prefixed with "-" character.
