
strip-outer-parens
==================
Strip pairs of outermost brackets (custom, round, curly, angle, braces,
parens, chevrons).

The definition of "pair" is that there's an opening bracket at the start of
the text, and its corresponding closing bracket at the end of the text.


Usage
-----
```javascript
var stripOuterParens = require('strip-outer-parens'),
  input = '{(<[[ ++ ]>)}',
  stripped = stripOuterParens(input, { keepOuter: 2 });
console.log(stripped);
```

### stripOuterParens(text[, options])

These properties are supported in the options object:
  * `keepOuter`: non-negative interger, default: 0<br>
    How many outer layers of brackets to preserve.
  * `pairs`: array or string, default: `'(){}[]<>'`<br>
    The bracket pairs catalog, as an array of bracket pairs (or string,
    see below). Each pair can be either an array or a string.
    * If a pair is an array, use its first element as the opeing bracket
      and the second element as the closing bracket.
    * If a pair is a string, use its first and second character.
    * If the catalog is given as just a string, use its even-indexed characters
      (first character = index 0 = even) as the opening brackets and its
      odd-indexed characters as closing brackets.
      If the catalog is of odd length, the last character will have no
      corresponding closing bracket, and is ignored because it's not a pair.


Caveats
-------
  * As a result of the "pair" definition, no attempt is made to guess the
    meaning of inner brackets, whether they may be plain text (potentially
    escaped), or might correspond to the brackets at the start and end of
    the text. To account for that, you'll need a parser that knows which
    language the text is meant to contain.
  * Make sure you understand the [test results](test.js).




License
-------
ISC
