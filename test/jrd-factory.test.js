var tap = require('tap');
var { expect } = require('chai');

var JrdFactory = require('../src/jrd-factory');

function ArgHolder() {
  this.inputs = arguments;
}

tap.test('JrdFactory', t => {
  tap.test('JrdFactory#makeJrd', t => {
    var factory = new JrdFactory(ArgHolder);
    var data = {};
    var jrd = factory.makeJrd(data);

    expect(jrd.inputs[0]).to.equal(data);
    expect(jrd.inputs[1]).to.not.equal(data);

    t.end();
  });

  tap.test('JrdFactory#makeJrdConfig', t => {
    var factory = new JrdFactory(ArgHolder);
    var jrd = factory.makeJrd({});
    var config = factory.makeJrdConfig();
    expect(jrd.inputs[1]).to.not.equal(config);
    expect(jrd.inputs[1]).to.deep.equal(config);
    t.end();
  });

  t.end();
});
