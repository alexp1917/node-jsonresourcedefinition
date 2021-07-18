var cloneDeep = require('lodash.clonedeep');

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

JSONResourceDefinition.prototype.isImmutable = function() {
  return this.config && this.config.immutable;
};

JSONResourceDefinition.prototype.cloneDeep = function() {
  return new JSONResourceDefinition(cloneDeep(this._data), this.config);
};

JSONResourceDefinition.prototype._getEditable = function() {
  return this.isImmutable() ? this.cloneDeep() : this;
};

JSONResourceDefinition.prototype._edit = function(transform) {
  var jrd = this._getEditable();
  transform(jrd._data);
  return jrd;
};

JSONResourceDefinition.prototype.setSubject = function(subject) {
  return this._edit(data => {
    data.subject = subject;
  });
};

JSONResourceDefinition.prototype.clearAliases = function() {
  return this._edit(data => {
    data.aliases = data.aliases || [];
    data.aliases.length = 0;
  });
}

function isArray(maybeArray) {
  return Array.isArray(maybeArray);
}

function isStringsArray(maybeStringArray) {
  return isArray(maybeStringArray) &&
    maybeStringArray.filter(s => typeof s !== 'string').length == 0;
}

JSONResourceDefinition.prototype.setAliases = function(aliases) {
  return this._edit(data => {
    if (!isArray(aliases))
      throw new TypeError('\'aliases\' must be an Array');

    if (!isStringsArray(aliases))
      throw new TypeError('\'aliases\' must be an Array of strings');

    data.aliases = aliases;
  });
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
