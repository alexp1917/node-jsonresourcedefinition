var tap = require('tap');
var { expect } = require('chai');

var JSONResourceDefinition = require('../src/json-resource-definition');

tap.test('JSONResourceDefinition', t => {
  t.test('JSONResourceDefinition#constructor', t => {
    var newJrd = new JSONResourceDefinition();
    expect(newJrd).to.be.instanceOf(JSONResourceDefinition);

    var justJrd = JSONResourceDefinition();
    expect(justJrd).to.be.instanceOf(JSONResourceDefinition);

    var newArgs = new JSONResourceDefinition(null, { immutable: 1, });
    var justArgs = JSONResourceDefinition(null, { immutable: 1, });

    expect(justArgs).to.have.nested.property('config.immutable', 1);
    expect(newArgs).to.have.nested.property('config.immutable', 1);

    t.end();
  });

  t.test('JSONResourceDefinition getters and setters', t => {
    var jrd = new JSONResourceDefinition({});

    // https://datatracker.ietf.org/doc/html/rfc7033#section-4.4
    var subject = 'https://example.com/';
    var aliases = ['alias1', 'alias2', 'alias3', 'alias4', 'alias5', ];
    var properties = {
      'key1': 'value1',
      'key2': 'value2',
      'key3': 'value3',
      'key4': 'value4',
      'key5': 'value5',
    };

    // valid keys: 'rel', 'type', 'href', 'titles', 'properties',
    // https://datatracker.ietf.org/doc/html/rfc7033#section-4.4.4
    var links = [
      {
        rel: 'http://example.com/rel/profile',
        href: 'http://example.com/profiles/' +
          'profile-00000000-0000-0000-0000-000000000001',
      },
    ];

    var notAJrdField = 'some-value';

    jrd.subject = subject;
    jrd.aliases = aliases;
    jrd.properties = properties;
    jrd.links = links;
    jrd.notAJrdField = notAJrdField;

    expect(jrd.subject).to.equal(subject);
    expect(jrd.aliases).to.equal(aliases);
    expect(jrd.properties).to.equal(properties);
    expect(jrd.links).to.equal(links);
    expect(jrd.notAJrdField).to.not.be.ok;

    jrd.setField('notAJrdField', notAJrdField);
    expect(jrd.notAJrdField).to.not.be.ok;

    t.end();
  });

  t.test('JSONResourceDefinition immutablity', t => {
    var jrdImm = new JSONResourceDefinition({}, { immutable: true });
    var jrdImm2 = jrdImm.setSubject('http://example.com');

    expect(jrdImm.isImmutable()).to.be.ok;
    expect(jrdImm2.isImmutable()).to.be.ok;

    var jrdNonImm = new JSONResourceDefinition({});
    var jrdNonImm2 = jrdNonImm.setSubject('http://example.com');

    expect(jrdNonImm.isImmutable()).to.not.be.ok;
    expect(jrdNonImm2.isImmutable()).to.not.be.ok;

    expect(jrdImm).not.to.equal(jrdImm2);
    expect(jrdNonImm).to.equal(jrdNonImm2);

    t.end();
  });

  t.test('JSONResourceDefinition#setAliases (validation)', t => {
    var jrd = new JSONResourceDefinition();
    var aliases = ['a', 'b'];

    var jrd2 = jrd.setAliases(aliases);
    expect(jrd).to.equal(jrd2);
    expect(jrd.aliases).to.equal(aliases);

    t.throws(() => jrd.setAliases(null));
    t.throws(() => jrd.setAliases('abc'));
    t.throws(() => jrd.setAliases([1]));

    t.end();
  });

  t.test('JSONResourceDefinition#clearAliases', t => {
    var jrd = new JSONResourceDefinition();
    expect(jrd.aliases).to.not.be.ok;
    jrd.clearAliases();
    expect(jrd.aliases).to.be.ok;
    expect(jrd.aliases).to.have.length(0);
    jrd.setAliases(['a']);
    expect(jrd.aliases).to.be.ok;
    expect(jrd.aliases).to.have.length(1);
    jrd.clearAliases();
    expect(jrd.aliases).to.have.length(0);

    t.end();
  });

  t.test('JSONResourceDefinition immutable disables setters', t => {
    var jrd = new JSONResourceDefinition({}, { immutable: true, });
    jrd.subject = 'newsubject';
    expect(jrd.subject).to.not.be.ok;

    t.end();
  });

  t.ok(true);
  t.end();
});
