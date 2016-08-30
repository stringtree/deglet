var Hath = require('hath');
var util = require('util');

var deglet = require('../');
var d, d1, d2;

function testIsLeapYear(t, done) {
    t.assert(deglet.isLeapYear(1996)), '1996';
    t.assert(deglet.isLeapYear(2000), '2000');
    t.assert(!deglet.isLeapYear(1900), '1900');
    t.assert(!deglet.isLeapYear(2001), '2001');

    d = deglet.createFromArgs(2016,8,27);
    t.assert(d.isLeapYear(), 'this(2016)');
    t.assert(d.isLeapYear(2000), 'this(2000)');
    t.assert(!d.isLeapYear(2001), 'this(2001)');

    done();
}

function testDaysInYear(t, done) {
    t.assert(366 === deglet.daysInYear(1996)), '1996';
    t.assert(366 === deglet.daysInYear(2000), '2000');
    t.assert(365 === deglet.daysInYear(1900), '1900');
    t.assert(365 === deglet.daysInYear(2001), '2001');

    d = deglet.createFromArgs(2016,8,27);
    t.assert(366 === d.daysInYear(), 'this(2016)');
    t.assert(366 === d.daysInYear(2000), 'this(2000)');
    t.assert(365 === d.daysInYear(2001), 'this(2001)');

    done();
}

function testDaysInMonth(t, done) {
    done();
}


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

//TODO should this roll over to next month, or clip to end of desired month?
// different languages and libraries have different policies
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

function testDateComparisonSimpleBefore(t, done) {
    t.assert(deglet.createFromArgs(2016,8,30).isBefore(deglet.createFromArgs(2016,8,31)));
    t.assert(!deglet.createFromArgs(2016,8,31).isBefore(deglet.createFromArgs(2016,8,30)));

    t.assert(deglet.createFromArgs(2016,7,30).isBefore(deglet.createFromArgs(2016,8,30)));
    t.assert(!deglet.createFromArgs(2016,8,30).isBefore(deglet.createFromArgs(2016,7,30)));

    t.assert(deglet.createFromArgs(2015,8,30).isBefore(deglet.createFromArgs(2016,8,30)));
    t.assert(!deglet.createFromArgs(2016,8,30).isBefore(deglet.createFromArgs(2015,8,30)));

    done();
}

function testDateComparisonSimpleAfter(t, done) {
    t.assert(!deglet.createFromArgs(2016,8,30).isAfter(deglet.createFromArgs(2016,8,31)));
    t.assert(deglet.createFromArgs(2016,8,31).isAfter(deglet.createFromArgs(2016,8,30)));

    t.assert(!deglet.createFromArgs(2016,7,30).isAfter(deglet.createFromArgs(2016,8,30)));
    t.assert(deglet.createFromArgs(2016,8,30).isAfter(deglet.createFromArgs(2016,7,30)));

    t.assert(!deglet.createFromArgs(2015,8,30).isAfter(deglet.createFromArgs(2016,8,30)));
    t.assert(deglet.createFromArgs(2016,8,30).isAfter(deglet.createFromArgs(2015,8,30)));

    done();
}

function testDateComparisonComplexBefore(t, done) {
    t.assert(deglet.createFromArgs(2016,7,31).isBefore(deglet.createFromArgs(2016,8,30)));
    t.assert(!deglet.createFromArgs(2016,8,30).isBefore(deglet.createFromArgs(2016,7,31)));

    t.assert(deglet.createFromArgs(2015,8,31).isBefore(deglet.createFromArgs(2016,7,30)));
    t.assert(!deglet.createFromArgs(2016,7,30).isBefore(deglet.createFromArgs(2015,8,31)));

    done();
}

function testDateComparisonComplexAfter(t, done) {
    t.assert(!deglet.createFromArgs(2016,7,31).isAfter(deglet.createFromArgs(2016,8,30)));
    t.assert(deglet.createFromArgs(2016,8,30).isAfter(deglet.createFromArgs(2016,7,31)));

    t.assert(!deglet.createFromArgs(2015,8,31).isAfter(deglet.createFromArgs(2016,7,30)));
    t.assert(deglet.createFromArgs(2016,7,30).isAfter(deglet.createFromArgs(2015,8,31)));

    done();
}

function testDaysBetween(t, done) {
    d1 = deglet.createFromArgs(2016,8,31);
    d2 = deglet.createFromArgs(2016,8,31);
    t.assert(0 === deglet.daysBetween(d1, d2));
    done();
}

module.exports = Hath.suite('Deglet', [
  testIsLeapYear,
  testDaysInYear,
//  testDaysInMonth,
  testSimpleCases,
  testRollBackToPreviousMonth,
  testRollForwardToNextMonth,
  testRollBackToPreviousYear,
  testRollForwardToNextYear,
  testMinusDaysOverLeapYear,
  testPlusDaysOverLeapYear,
  testMonthClipping,
  testDateComparisonSame,
  testDateComparisonSimpleBefore,
  testDateComparisonSimpleAfter,
  testDateComparisonComplexBefore,
  testDateComparisonComplexAfter,
  testDaysBetween,
  //TODO testToISOString,
  //TODO testCreateFromISOString
]);

if (module === require.main) {
  module.exports(new Hath());
}
