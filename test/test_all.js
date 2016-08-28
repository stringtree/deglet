var Hath = require('hath');
var util = require('util');

var deglet = require('../');
var d;

function testSimpleCases(t, done) {
  d = deglet.createFromArgs(2016,8,27);
  t.assert(2016 === d.year);
  t.assert(8 === d.month);
  t.assert(27 === d.day);

  d = d.plus(1, 'day');
  t.assert(2016 === d.year);
  t.assert(8 === d.month);
  t.assert(28 === d.day);

  d = d.plus(2, 'month');
  t.assert(2016 === d.year);
  t.assert(10 === d.month);
  t.assert(28 === d.day);

  d = d.plus(4, 'year');
  t.assert(2020 === d.year);
  t.assert(10 === d.month);
  t.assert(28 === d.day);

  d = d.minus(1, 'year');
  t.assert(2019 === d.year);
  t.assert(10 === d.month);
  t.assert(28 === d.day);

  d = d.minus(4, 'month');
  t.assert(2019 === d.year);
  t.assert(6 === d.month);
  t.assert(28 === d.day);

  d = d.minus(12, 'day');
  t.assert(2019 === d.year);
  t.assert(6 === d.month);
  t.assert(16 === d.day);

  done(); 
}

function testMonthClipping(t, done) {
  d = deglet.createFromArgs(2016,8,31);
  d = d.plus(1, 'month');
  t.assert(2016 === d.year);
  t.assert(10 === d.month);
  t.assert(1 === d.day);

  done();
}

module.exports = Hath.suite('Deglet', [
  testSimpleCases,
  testMonthClipping
]);

if (module === require.main) {
  module.exports(new Hath());
}
