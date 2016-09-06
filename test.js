/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var soPar = require('strip-outer-parens'), x = 0,
  eq = require('assert').deepStrictEqual;
function f() { return 5; }

(function justDefaults() {
  eq(soPar('<b>hello</b>'),
            'b>hello</b');
  eq(soPar('((a === 1) && (b === 2))'),
             'a === 1) && (b === 2');
  eq(soPar('([(!((foo("<b>") instanceof Bar))])'),
              '!((foo("<b>") instanceof Bar)');
}());

(function parserRequiredToGuessMeaning() {
  eq(true,  (-1 < x[")("]) || (f(/></) > 2));
  eq(soPar('(-1 < x[")("]) || (f(/></) > 2)'),
            '-1 < x[")("]) || (f(/></) > 2');
}());

(function keepSomeOuterBrackets() {
  var opts = { keepOuter: 2 };
  eq(soPar('{(<[[ ++ ]>)}',     opts), '{([ ++ )}');
  eq(soPar('<>()',              opts), '<>()');
  eq(soPar('[<>()]',            opts), '[<>()]');
  opts = { keepOuter: 0 };
  eq(soPar('[<>()]',            opts), '<>()');
}());


(function customBracketPairs() {
  var unequalPairs = [
    ['<<', '>'],
    ['[', ']]'],
  ], opts = { keepOuter: 0, pairs: unequalPairs };
  eq(soPar('<<[[::]]>>', opts),
             '[[::]]>');
  opts.keepOuter = 2;
  eq(soPar('<<[[<<::>]]]]>', opts),
           '<<[::]]>');
}());





console.log('+OK tests passed');
