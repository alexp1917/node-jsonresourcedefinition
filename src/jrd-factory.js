function JrdFactory(JSONResourceDefinition, config = {}) {
  this.Jrd = JSONResourceDefinition;
}

JrdFactory.NO_JRD_CLASS = 'NO_JRD_CLASS';

JrdFactory.prototype.makeJrd = function(data) {
  var Jrd = this.Jrd || JrdFactory.JSONResourceDefinition;

  if (!Jrd) {
    var err = new Error('No JSONResourceDefinition function defined');
    err.code = JrdFactory.NO_JRD_CLASS;
    throw err;
  }

  return new Jrd(data, this.makeJrdConfig());
};

JrdFactory.prototype.makeJrdConfig = function() {
  return {};
};

module.exports = JrdFactory;
