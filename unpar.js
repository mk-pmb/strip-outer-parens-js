/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

module.exports = function stripOuterParens(expr, opts) {
  var pairs, depth = 0, matched,
    keepOuterLevels, keepOuterOpen = '', keepOuterClose = '';
  if ((typeof opts) === 'number') { opts = { keepOuter: opts }; }
  if (!opts) { opts = false; }
  keepOuterLevels = +(opts.keepOuter || 0);
  pairs = opts.pairs;
  if (!(pairs && pairs.length)) { pairs = '(){}[]<>'; }
  if ((typeof pairs) === 'string') { pairs = pairs.match(/[\S\s]{2}/g); }
  pairs = pairs.map(function measure(pair) {
    pair = [String(pair[0] || ''), String(pair[1] || '')];
    if (!(pair[0] && pair[1])) { throw new Error('bad bracket pair ' + pair); }
    pair.l0 = pair[0].length;
    pair.l1 = pair[1].length;
    pair.strlen = pair.l0 + pair.l1;
    return pair;
  });
  expr = String(expr);
  pairs.strip = function (pair) {
    if (pair.strlen > expr.length) { return; }
    if (!expr.startsWith(pair[0])) { return; }
    if (!expr.endsWith(pair[1])) { return; }
    if (depth < keepOuterLevels) {
      keepOuterOpen += expr.slice(0, pair.l0);
      keepOuterClose = expr.slice(-pair.l1) + keepOuterClose;
    }
    depth += 1;
    expr = expr.slice(pair.l0, -pair.l1);
    matched = true;
  };
  while (expr && (matched !== false)) {
    matched = false;
    pairs.forEach(pairs.strip);
  }
  return keepOuterOpen + expr + keepOuterClose;
};
