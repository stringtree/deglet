var Hath = require('hath');

var deglet = require('../');
var d;

function testSimpleCases(t, done) {
  d = deglet.createFromArgs(2016,8,27) 
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

  done(); 
}

module.exports = Hath.suite('Deglet', [
  testSimpleCases
]);

if (module === require.main) {
  module.exports(new Hath());
}
