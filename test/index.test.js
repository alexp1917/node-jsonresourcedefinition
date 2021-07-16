var tap = require('tap');

tap.test('package exists', t => {
  t.ok(require('../'));

  t.end();
});
