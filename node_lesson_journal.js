/**
 * This file was simply used as a journal to save various states of the server creation
 * 
 */


/**
 * code from creation of server to console.logging out the response
 * steps 1-9 in readme.
 */

/** create a server
 * 
 */

// get the http module
const http = require('http');

rqListener = (req, res) => {

}

/** this create server method takes a request listener function as an arg.
 * a request listener, that executes for every incomming request.
 *  we created a function above 
 *  we just want to reference it - not execute it - 
 *  it tells our server that this function shall be run with every incomming request
 * 
 * we must sore this sever inside a variable - we will call server
 * 
 * edit changed this to an anonymous function call as seen below
 * */

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);
});

// set node.js to listen for incomming requests
// see more - https://youtu.be/C7TFgfY7JdE?t=3062
server.listen(3000);


//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Code at stage when we are getting string back from user and saving to a txt file
 * 
 */

/** create a server
 * 
 */

// get the http module
const http = require('http');

// get file system
const fs = require('fs');

rqListener = (req, res) => {

}

/** this create server method takes a request listener function as an arg.
 * a request listener, that executes for every incomming request.
 *  we created a function above 
 *  we just want to reference it - not execute it - 
 *  it tells our server that this function shall be run with every incomming request
 * 
 * we must sore this sever inside a variable - we will call server
 * 
 * edit changed this to an anonymous function call as seen below
 * */

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    // -2- this will check if url has a trailing / which the homepage will have by default
    // once form has been submitted will return user to /message.
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>My FirstNode Page</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button>Send</button></form></body>');
        res.write('</html>');

        // if we make it in here we must return back out of the function as we dont want the below code to execute
        return res.end();
    }
    // -3- here we handle the what if url = /message
    // return user to / page and store their message in a local file.
    if (url === '/message' && method === 'POST') {

        // get the response content - use another event listener to listen for the data event
        // the data event will be fired whenever a new chunk is ready to be read
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        // once all chunks have been pushed the end event will happen and activate this listener
        req.on('end', () => {
            // use the buffer object to concatinate all these chunks inside the body array
            // and convert them to a string
            // Buffer is available globally by Node.js
            const parsedBody = Buffer.concat(body).toString();
            
            // because this will return in the format 'message=howdy' - we will split at the = and take the 2nd index
            const message = parsedBody.split('=')[1];
            message.replace('+', ' ');
            fs.writeFileSync('static/js/node/messages.txt', message);
        });

        res.statusCode = 302;
        res.setHeader('Location', '/');

        // if we make it in here we must return back out of the function as we dont want the below code to execute
        return res.end();
    }

    // -1- create a simple response
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My FirstNode Page</title></head>');
    res.write('<body><h1>Hello from my Node Server</h1></body>');
    res.write('</html>');
    // call an end to the result - no valid code can be written to the response after this.
    res.end();
});

// set node.js to listen for incomming requests
// see more - https://youtu.be/C7TFgfY7JdE?t=3062
server.listen(3000);


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * Here is the complete working code before being modulized into seperate files
 */

/** create a server
 * 
 */

// get the http module
const http = require('http');

// get file system
const fs = require('fs');

rqListener = (req, res) => {

}

/** this create server method takes a request listener function as an arg.
 * a request listener, that executes for every incomming request.
 *  we created a function above 
 *  we just want to reference it - not execute it - 
 *  it tells our server that this function shall be run with every incomming request
 * 
 * we must sore this sever inside a variable - we will call server
 * 
 * edit changed this to an anonymous function call as seen below
 * */

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    // -2- this will check if url has a trailing / which the homepage will have by default
    // once form has been submitted will return user to /message.
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>My FirstNode Page</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button>Send</button></form></body>');
        res.write('</html>');

        // if we make it in here we must return back out of the function as we dont want the below code to execute
        return res.end();
    }
    // -3- here we handle the what if url = /message
    // return user to / page and store their message in a local file.
    if (url === '/message' && method === 'POST') {

        // get the response content - use another event listener to listen for the data event
        // the data event will be fired whenever a new chunk is ready to be read
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            // we can do nothing with a chunk - so we push it to an array called body for later parsing
            body.push(chunk);
        });
        // once all chunks have been pushed the end event will happen and activate this listener
        // we will return this req.on() checker or else the code section below at -1- will be ran.
        return req.on('end', () => {
            // use the buffer object to concatinate all these chunks inside the body array
            // and convert them to a string
            // Buffer is available globally by Node.js
            const parsedBody = Buffer.concat(body).toString();
            
            // because this will return in the format 'message=howdy' - we will split at the = and take the 2nd index
            const message = parsedBody.split('=')[1];
            message.replace('+', ' ');

            // change fs.writeFileSync('static/js/node/messages.txt', message); to an asynchronous operation
            // which takes a 3rd parameter - a callback function that receives an error if something goes wrong
            fs.writeFile('static/js/node/messages.txt', message, error => {
                // the following 3 lines originally lay outside this function, but it would be bad practice to return a response
                // when nothing had actually happened. Now it is inside, and also inside the write event callback - 
                // it will only run once the message has been stored in the txt file, and if there were no errors..
                res.statusCode = 302;
                res.setHeader('Location', '/');
                // if we make it in here we must return back out of the function as we dont want the below code to execute
                return res.end();
            });
        });
    }

    // -1- create a simple response
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My FirstNode Page</title></head>');
    res.write('<body><h1>Hello from my Node Server</h1></body>');
    res.write('</html>');
    // call an end to the result - no valid code can be written to the response after this.
    res.end();
});

// set node.js to listen for incomming requests
// see more - https://youtu.be/C7TFgfY7JdE?t=3062
server.listen(3000);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////