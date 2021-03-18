/** create a simple NodeJs server
 * 
 */

// get the http module
const http = require('http');

// custom file - getting the routes file
const routes = require('./routes');

console.log(routes.someText);
console.log(routes.someMoreText);

const server = http.createServer(routes.handler);

server.listen(3000);