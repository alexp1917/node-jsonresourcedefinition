var tap = require('tap');
var { expect } = require('chai');

var JrdFactory = require('../src/jrd-factory');

function ArgHolder() {
  this.inputs = arguments;
}

tap.test('JrdFactory', t => {
  t.test('JrdFactory#makeJrd', t => {
    var factory = new JrdFactory(ArgHolder);
    var data = {};
    var jrd = factory.makeJrd(data);

    expect(jrd.inputs[0]).to.equal(data);
    expect(jrd.inputs[1]).to.not.equal(data);

    t.test('JrdFactory#makeJrd with static default Jrd', t => {
      var previous = JrdFactory.JSONResourceDefinition;
      delete JrdFactory.JSONResourceDefinition;

      var factory = new JrdFactory(false);

      var noJrdError = t.throws(() => factory.makeJrd({}));
      expect(noJrdError).to.be.ok
      expect(noJrdError).to.have.property('code', JrdFactory.NO_JRD_CLASS);

      JrdFactory.JSONResourceDefinition =
        function Fake() { this.inputs = arguments; };

      var jrd = factory.makeJrd({});
      expect(jrd).to.be.instanceOf(JrdFactory.JSONResourceDefinition);

      JrdFactory.JSONResourceDefinition = previous;

      t.end();
    });

    t.end();
  });

  t.test('JrdFactory#makeJrdConfig', t => {
    var factory = new JrdFactory(ArgHolder);
    var jrd = factory.makeJrd({});
    var config = factory.makeJrdConfig();
    expect(jrd.inputs[1]).to.not.equal(config);
    expect(jrd.inputs[1]).to.deep.equal(config);
    t.end();
  });

  t.end();
});
