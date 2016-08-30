var Hath = require('hath');
var util = require('util');

var deglet = require('../');
var d, d1, d2;

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

function testRollBackToPreviousMonth(t, done) {
  d = deglet.createFromArgs(2016,8,1);
  d = d.minus(1, 'day');
  t.assert(2016 === d.year);
  t.assert(7 === d.month);
  t.assert(31 === d.day);

  done();
}

function testRollForwardToNextMonth(t, done) {
  d = deglet.createFromArgs(2016,9,30);
  d = d.plus(1, 'day');
  t.assert(2016 === d.year);
  t.assert(10 === d.month);
  t.assert(1 === d.day);

  done();
}

function testRollBackToPreviousYear(t, done) {
  d = deglet.createFromArgs(2016,3,1);
  d = d.minus(3, 'month');
  t.assert(2015 === d.year);
  t.assert(12 === d.month);
  t.assert(1 === d.day);

  done();
}

function testRollForwardToNextYear(t, done) {
  d = deglet.createFromArgs(2016,11,30);
  d = d.plus(2, 'month');
  t.assert(2017 === d.year);
  t.assert(1 === d.month);
  t.assert(30 === d.day);

  done();
}

function testMinusDaysOverLeapYear(t, done) {
  d = deglet.createFromArgs(2016,3,15);
  d = d.minus(15, 'day');
  t.assert(2016 === d.year);
  t.assert(2 === d.month);
  t.assert(29 === d.day);

  done();
}

function testPlusDaysOverLeapYear(t, done) {
  d = deglet.createFromArgs(2016,2,15);
  d = d.plus(15, 'day');
  t.assert(2016 === d.year);
  t.assert(3 === d.month);
  t.assert(1 === d.day);

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

function testDateComparisonSame(t, done) {
    d1 = deglet.createFromArgs(2016,8,31);
    d2 = deglet.createFromArgs(2016,8,31);
    t.assert(d1.isSame(d2));
    t.assert(d2.isSame(d1));
    t.assert(d1.isSameOrAfter(d2));
    t.assert(d2.isSameOrAfter(d1));
    t.assert(d1.isSameOrBefore(d2));
    t.assert(d2.isSameOrBefore(d1));
    t.assert(! d1.isAfter(d2));
    t.assert(! d2.isAfter(d1));
    t.assert(! d1.isBefore(d2));
    t.assert(! d2.isBefore(d1));
    done();
}

module.exports = Hath.suite('Deglet', [
  testSimpleCases,
  testRollBackToPreviousMonth,
  testRollForwardToNextMonth,
  testRollBackToPreviousYear,
  testRollForwardToNextYear,
  testMinusDaysOverLeapYear,
  testPlusDaysOverLeapYear,
  testMonthClipping,
  testDateComparisonSame,
  //TODO testDateComparisonSimpleBefore,
  //TODO testDateComparisonSimpleAfter,
  //TODO testDateComparisonComplexBefore,
  //TODO testDateComparisonComplexAfter
  //TODO testToISOString
  //TODO testCreateFromISOString
]);

if (module === require.main) {
  module.exports(new Hath());
}
