// Generated by CoffeeScript 1.7.1
(function() {
  var config, crypto;

  crypto = require('crypto');

  config = {
    secret: crypto.randomBytes(128).toString("base64"),
    alers: {},
    notify: {}
  };

  module.exports = config;

}).call(this);

//# sourceMappingURL=global.map
