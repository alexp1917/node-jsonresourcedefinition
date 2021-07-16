function JrdFactory(JSONResourceDefinition, config = {}) {
  this.Jrd = JSONResourceDefinition;
}

JrdFactory.prototype.makeJrd = function(data) {
  var Jrd = this.Jrd || JrdFactory.JSONResourceDefinition;

  return new Jrd(data, this.makeJrdConfig());
};

JrdFactory.prototype.makeJrdConfig = function() {
  return {};
};

module.exports = JrdFactory;
