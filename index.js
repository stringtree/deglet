function Deglet(year, month, day) {
  this.year = year;
  this.month = month;
  this.day = day;
  this.normalise();
}

module.exports.createFromArgs = function createFromArgs(year,month,day) {
  return new Deglet(year, month, day); 
};

module.exports.createFromObject = function createFromObject(object) {
  return new Deglet(object.year, object.month, object.day); 
};

//TODO createFromISOString

const days_in_month = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const leap_years = [
  1904, 1908, 1912, 1916, 1920, 1924, 1928, 1932, 1936, 1940, 1944, 1948,
  1952, 1956, 1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992, 1996,
  2000, 2004, 2008, 2012, 2016, 2020, 2024, 2028, 2032, 2036, 2040, 2044, 2048,
  2052, 2056, 2060, 2064, 2068, 2072, 2076, 2080, 2084, 2088, 2092, 2096.
];

function ndays(year, month) {
  switch (month) {
  case 2:
    return -1 === leap_years.indexOf(year) ? 29 : 28
  default:
    return days_in_month[month];
  }
}

Deglet.prototype.normalise_month = function normalise_month() {
  while (this.month < 1) {
    --this.year;
    this.month += 12;
  }
  while (this.month > 12) {
    ++this.year;
    this.month -= 12;
  }
}

Deglet.prototype.normalise_day = function normalise_day() {
  while (this.day < 1) {
    --this.month;
    this.normalise_month();
    this.day += ndays(this.year, this.month);
  }
  while (this.day > ndays(this.year, this.month)) {
    ++this.month;
    this.normalise_month();
    this.day -= ndays(this.year, this.month);
  }
}

Deglet.prototype.normalise = function normalise() {
  this.normalise_month();
  this.normalise_day();
}

Deglet.prototype.plus = function plus(n, unit) {
  switch(unit) {
  case 'day':
    return new Deglet(this.year,this.month,this.day + n);
  case 'month':
    return new Deglet(this.year,this.month+n,this.day);
  case 'year':
    return new Deglet(this.year + n,this.month,this.day);
  default:
    throw new Error('Deglet.plus: unknown unit type "' + unit + '"');
  }
};

Deglet.prototype.minus = function minus(n, unit) {
  switch(unit) {
  case 'day':
    return new Deglet(this.year,this.month,this.day - n);
  case 'month':
    return new Deglet(this.year,this.month - n,this.day);
  case 'year':
    return new Deglet(this.year - n,this.month,this.day);
  default:
    throw new Error('Deglet.minus: unknown unit type "' + unit + '"');
  }
};
