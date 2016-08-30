var util = require('util');

function Deglet(year, month, day) {
  this.internal = { year: year, month: month-1, day: day-1 }
  this.normalise();
}

module.exports.createFromArgs = function createFromArgs(year,month,day) {
  return new Deglet(year, month, day); 
};

module.exports.createFromObject = function createFromObject(object) {
  return new Deglet(object.year, object.month, object.day); 
};

const days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const leap_years = [
  1904, 1908, 1912, 1916, 1920, 1924, 1928, 1932, 1936, 1940, 1944, 1948,
  1952, 1956, 1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992, 1996,
  2000,
  2004, 2008, 2012, 2016, 2020, 2024, 2028, 2032, 2036, 2040, 2044, 2048,
  2052, 2056, 2060, 2064, 2068, 2072, 2076, 2080, 2084, 2088, 2092, 2096.
];

function ndays(year, month) {
  switch (month) {
  case 1: // February where January := 0
    return -1 === leap_years.indexOf(year) ? 28 : 29;
  default:
    return days_in_month[month];
  }
}

function normalise_month(fields) {
  while (fields.month < 0) {
    --fields.year;
    fields.month += 12;
  }
  while (fields.month >= 12) {
    ++fields.year;
    fields.month -= 12;
  }
}

function normalise_day(fields) {
  while (fields.day < 0) {
    --fields.month;
    normalise_month(fields);
    fields.day += ndays(fields.year, fields.month);
  }
  while (fields.day >= ndays(fields.year, fields.month)) {
    fields.day -= ndays(fields.year, fields.month);
    ++fields.month;
    normalise_month(fields);
  }
}

function expand(d) {
  d.year = d.internal.year;
  d.month = d.internal.month + 1;
  d.day = d.internal.day + 1;
}

Deglet.prototype.normalise = function normalise() {
  normalise_month(this.internal);
  normalise_day(this.internal);
  expand(this)
}

function alter(d, n, unit, name) {
  switch(unit) {
  case 'day':
    return new Deglet(d.year,d.month,d.day + n);
  case 'month':
    return new Deglet(d.year,d.month+n,d.day);
  case 'year':
    return new Deglet(d.year + n,d.month,d.day);
  default:
    throw new Error('Deglet.' + (name || 'alter') + ': unknown unit type "' + unit + '"');
  }
};

Deglet.prototype.plus = function plus(n, unit) {
  var ret = alter(this, n, unit, 'plus');
  return ret;
};

Deglet.prototype.minus = function minus(n, unit) {
  return alter(this, -n, unit, 'minus');
};

Deglet.prototype.isSame = function isSame(d) {
  return this.year === d.year && this.month === d.month && this.day === d.day;
};

Deglet.prototype.isSameOrAfter = function isSameOrAfter(d) {
  return this.year >= d.year && this.month >= d.month && this.day >= d.day;
};

Deglet.prototype.isSameOrBefore = function isSameOrBefore(d) {
  return this.year <= d.year && this.month <= d.month && this.day <= d.day;
};

Deglet.prototype.isAfter = function isAfter(d) {
  return this.year > d.year || this.year === d.year && (this.month > d.month || this.month === d.month && this.day > d.day);
};

Deglet.prototype.isBefore = function isBefore(d) {
  return this.year < d.year || this.year === d.year && (this.month < d.month || this.month === d.month && this.day < d.day);
};
