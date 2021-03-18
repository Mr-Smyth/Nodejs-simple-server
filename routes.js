/**
 * Handle the route logic - called from the server code - app.js
 */

const fs = require('fs');

const requestHandler = (req, res) => {

    // -2- this will check if url has a trailing / which the homepage will have by default
    // once form has been submitted will return user to /message.

    const url = req.url;
    const method = req.method; 
    
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
            fs.writeFile('./messages.txt', message, error => {
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
}



//module.exports = requestHandler;
// as an example we will do it this way - but for one function - you can do as above.

module.exports = {
    handler: requestHandler,
    someText: 'Some Hard Assed Text right here!!'
};

// also can be added on the fly for example
module.exports.someMoreText = 'This is even harder assed code';