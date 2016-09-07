/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var soPar = require('strip-outer-parens'), x, s,
  eq = require('assert').deepStrictEqual;

function f() { return 5; }

f.allTests = [

  function justDefaults() {
    x = '<b>hello</b>';
    s =  'b>hello</b';
    eq(s, soPar(x));

    x = '((a === 1) && (b === 2))';
    s =   'a === 1) && (b === 2';
    eq(s, soPar(x));

    x = '([(!((foo("<b>") instanceof Bar))])';
    s =    '!((foo("<b>") instanceof Bar)';
    eq(s, soPar(x));
    f.rxCnt(s, /\(/g, /\)/g, [3, 2]);
    f.rxCnt(x, /\(/g, /\)/g, [5, 4]);   // => wasn't balanced to begin with.
  },

  function parserRequiredToGuessMeaning() {
    eq(true,  (-1 < x[")("]) || (f(/></) > 2));
    eq(soPar('(-1 < x[")("]) || (f(/></) > 2)'),
              '-1 < x[")("]) || (f(/></) > 2');
  },

  function keepSomeOuterBrackets() {
    var opts = { keepOuter: 2 };
    x = f.noSpace('  {(<[[++]>)}  ');
    s = f.noSpace('  {(  [++  )}  ');
    eq(soPar(x, opts), s);

    x = f.noSpace('  <>()  ');
    s = f.noSpace('  <>()  ');
    eq(soPar(x, opts), s);

    x = f.noSpace('  [<>()]  ');
    s = f.noSpace('  [<>()]  ');
    eq(soPar(x, opts), s);

    opts = { keepOuter: 0 };
    x = f.noSpace('  [<>()]  ');
    s = f.noSpace('   <>()   ');
    eq(soPar(x, opts), s);
  },


  function customBracketPairs() {
    var unequalPairs = [
      ['<<', '>'],
      ['[', ']]'],
    ], opts = { keepOuter: 0, pairs: unequalPairs };

    x = f.noSpace('  << [ [ :: ]] > >  ');
    s = f.noSpace('     [ [ :: ]] >    ');
    eq(soPar(x, opts), s);

    opts.keepOuter = 2;
    x = f.noSpace('  << [ [ << :: > ]] ]] >  ');
    s = f.noSpace('  << [      ::      ]] >  ');
    eq(soPar(x, opts), s);
  },

  console.log.bind(console, '+OK tests passed')
];


f.rxCnt = function (t) {
  var rxs = Array.prototype.slice.call(arguments, 1), a = rxs.pop();
  eq(rxs.map(function (r) { return t.match(r).length; }), a);
};

f.noSpace = function (t) { return t.replace(/\s+/g, ''); };








f.allTests.forEach(function (t) { t(); });
