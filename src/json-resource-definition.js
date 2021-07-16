function JSONResourceDefinition(data, config = {}) {
  if (!(this instanceof JSONResourceDefinition))
    return new JSONResourceDefinition(...arguments);

  Object.defineProperty(this, '_data', {
    // configurable: false,
    enumerable: true,
    value: data || {},
  });

  this.config = config;

  Object.seal(this);
}

var allowed = new Set([
  'subject',
  'aliases',
  'properties',
  'links',
]);

Object.defineProperty(JSONResourceDefinition.prototype, 'subject', {
  get: function() {
    return this.getField('subject');
  },
  set: function(value) {
    this.setField('subject', value);
  },
});

Object.defineProperty(JSONResourceDefinition.prototype, 'aliases', {
  get: function() {
    return this.getField('aliases');
  },
  set: function(value) {
    this.setField('aliases', value);
  },
});

Object.defineProperty(JSONResourceDefinition.prototype, 'properties', {
  get: function() {
    return this.getField('properties');
  },
  set: function(value) {
    this.setField('properties', value);
  },
});

Object.defineProperty(JSONResourceDefinition.prototype, 'links', {
  get: function() {
    return this.getField('links');
  },
  set: function(value) {
    this.setField('links', value);
  },
});

JSONResourceDefinition.prototype.getField = function(key) {
  return this._data && this._data[key] || null;
};

JSONResourceDefinition.prototype.setField = function(key, value) {
  if (this.config && this.config.immutable)
    return this;

  if (allowed.has(key))
    this._data[key] = value;

  return this;
};

module.exports = JSONResourceDefinition;
