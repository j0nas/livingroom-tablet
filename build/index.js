var server = require('pushstate-server');
 
server.start({
  port: process.env.port || 3000,
  directory: './build'
});