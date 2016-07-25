var faye = require('faye');

var client = new faye.Client('http://localhost:8000');

module.exports = client;
