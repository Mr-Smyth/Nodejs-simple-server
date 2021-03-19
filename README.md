# Nodejs-simple-server
An example of a simple server written using Node.js

Below code can be viewed on Youtube credit: 
[Academind](https://youtu.be/C7TFgfY7JdE)



# Node 

## What is node

### A javascript runtime:
Allows us to run js code on a server or any device outside of the browser. uses v8 - which is what google use as a js engine. And v8 - which was written in c++, takes the js code and compiles it to machine code.

Some features differe between vanilla js and node js, for example in node there is no attached DOM, as the code can simply run on the machine - so there is no getElementById etc...

It will mostly be used on the server side to create a server and also listen and route incomming requests. It is not limited to running on a server - it can wun anywhere.




## Installation

### To check if node is on your computer
node --version

### Install
+ Goto [nodejs](https://nodejs.org/en/)
+ click on the latest stable version link (LTS)

## The REPL

***Read Evaluate, Print, Loop***   

In the terminal, type node to enter the node repl. Here you can execute code and have it parsed by Node on the fly.

Exit REPL with control C.

## Core Modules
+ http
+ https
fs
path
os

[See more here](https://youtu.be/C7TFgfY7JdE?t=2613)

## How the web works
**Credit: AcadeMind for the image:**

![How web works image](https://i.ibb.co/Ybvg5cX/image.png)


## Create a server with Node Js

1.  Create a file called server or main or app.js.
2.  import http module using the global variable require.
3.  Create a server variable equal to the http.createServer() method.
4.  Inside the createServer method place an anonymous function call that takes request and response (req, res).
5.  console.log the response object inside the anonymous function.
6.  Start the server listening and pick a port - 3000 for dem purposes.
7.  Run file in terminal.
8.  Start a browser and goto localhost:3000. [See more](https://youtu.be/C7TFgfY7JdE?t=3094).

You will see a blank page - but if you go back to the terminal - you will see that the response object has been printed and the code is still running.   
It is still in the loop - where the server is continually looking for requests to handle.

If we add the line process.exit(); after the console.log, the code will terminate onth the console.log is done. But typically we would not do that, as we would need our server to start and to continue to run.

9.   Now to examine our object more closely, console.log out the req.url, req.method, req.headers

### Setup a response from the server

10. Insert the following code inside the response function handler:

    ```res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My FirstNode Page</title></head>');
        res.write('<body><h1>Hello from my Node Server</h1></body>');
        res.write('</html>');
        // call an end to the result - no valid code can be written to the response after this.
        res.end();```   

11. As you can see from above block:
+   we tell the browser what the response contains by using the setHeader method
+   We use the write method to include the html we want the browser to render.
+   We then use the end method to complete the response and return it to the client.


### Linking it all together - Using the request to set a response

12. We want to get the url, so setup a variable equal to the req.url
13. Also setup a method variable equal to req.method.
14. Now we have those we can check for a url and create a response see app.js for examples.
15. To get the content of the response from the user we interact with the buffer and use an event listener - on(). [More see here..](https://youtu.be/C7TFgfY7JdE?t=4696).
16. We listen for the data event - the data event will be fired whenever a new chunk is ready to be read.
17. We also add the function that should be executed for each data event, and include chunk as a arg because each time the listener is fired - we receive a chunk of data.
18. Push each chunk into an array called body.
19. Add another listener req.on('end') - that listens to the event - end.
20. Once the end has been fired we can use the buffer to concatinate each chunk and convert it to a string.
21. At this stage we will have message=whatever the message is.
22. So now we split at the ='s and take the 2nd element of the split - which is the actual message.
23. We can now send this to the txt file using writeFileSync.

At this point the user can enter a message into the input and the message will be returned to the server and store it in the txt file. See the code in the node_lesson_journal.

### Some refactoring

Because of the Asynchronous nature of node.js, some code gets ran before others. For example the code in the two on() listeners waits for the triggering event. But the server will not wait and will continue to run whatever other code it can and will execute the code inside the listeners - when triggered. 

So, as the code is it sends a response before the parsing is actually performed - this is not ideal. So we move the response code inside the end function block.

This of course causees a problem - it will now execute the original write code before any of the on() listeners can get triggered, and will end in errors. To avoid this we will return the on() listener that is listening for the 'end' event, that way it will break out of the function and wont render the original html we wrote at the start.

Another change needed is to the writeFileSync. writeFileSync is a synchronous method and will wait to write to the file, this would be ok for tiny comments, but what about large files? This would hold up the server until write was complete

### Fix writeFileSync

As mentioned writeFileSync is a synchronous blocking operation - whereas we need an asynchronous Non-Blocking operation. So change:    `fs.writeFileSync('static/js/node/messages.txt', message);`.   
To an asynchronous operation:  `fs.writeFileSync('static/js/node/messages.txt', message (error) => {});` which takes a 3rd parameter - a callback function that receives an error if something goes wrong.

Now we can move the rest of the response up inside this function.

[See here for more information on this topic](https://youtu.be/C7TFgfY7JdE?t=5691)


## Modularizing the code

### routes.js

To check the url - and do whatever.
1.  create a file routes.js
2.  Create/move all the logic that handles the request to this new file.
3.  Create a function called requestHandler, pass in (req, res) and move all the logic inside it.
4.  export the file:

+ [More info: click here..](https://youtu.be/C7TFgfY7JdE?t=6893)

+ At the bottom of the routes.js file enter: module.exports = requestHandler. - (module is a node.js global object and requestHandler is the function we want to export) registering our function in module.exports allows us to require it in another file, using the local path.

+ in the receiving file type: const routes = require(./routes). - we can leave out the file extension, or include it - it does not matter. But the main thing is that because this is not a global module, we must enter a local path to it - like ./routes for example.

+ Then in the createServer function we can add routes as a handler - do not add parenthesis - we do not want to execute it - just pass it in. This tells the file that for incomming requests please execute the function stored in routes.


## Summary

[click Here..](https://youtu.be/C7TFgfY7JdE?t=7326)


# NPM
Node package manager

## Commands

+ run - runs a script
+ install - installs a 3rd party package.   


## Installation
NPM is automatically installed with nodejs.

## Setup packages.json file
+ In the terminal - in the base folder of your project - type `npm init`.
+ Follow the prompts to enter information relating to the project.
+ Pressing enter will select a default - but these can all be edited after, directly in the file.

## Setup a script within the packages.json file to run the server
A reserved name is available for this "start" - its conventional and short so its good to use.


+ Add the following to the scripts key in the packages.json file.
    + "start": "node app.js" - or whatever the path is to your js file.
+ now to run the application in the terminal type: `npm start`

However if you want to use a different script name - You can and you can use whatever you like, but there is a difference. Because "start" is a special reserved conventional script name all we need to do to run it is type npm start.   
If we called the script "start-app" then we would need to type this in the terminal to run it: `npm run start-app`.


## Using npm packages

Search [NPM](https://www.npmjs.com/) for the package you want - to find out more about it.

### Install a package

**Example** Install nodemon - which allows refreshing of browser during development without restarting server after each change.

**In the Terminal** Type `npm install nodemon --save-dev`.   

    +   `--save-dev` tells node this is just something to use during development.
    +   `--save` would install it as a production package.
    +   `-g` will not install it in this project, but installs it globally on your machine.

This will:
    +   Update packages.json - with dependencies.
    +   Create package-lock.json - this holds the current versions of packages. This means that if you share your project - the person getting the project will be able to install the same version of the packages.
    +   Installs the package in node-modules - which is also created automatically when you install a package. It stores the package and all of its dependencies which also automatically get installed. The folder can be deleted to save space and siply install the packages again when required.

#### How to use this nodemon package

nodemon will run our app.js file for us, it will also monitor the file for changes and restart our server automatically so we can view the changes inside the browser.   

So to get this working:
+   Goto our packages.json file
+   Goto the script we created called "start"
+   Change value to "nodemon app.js".
+   Note: we cannot run nodemon app.js directly in the terminal, as it looks for nodemon globally - and nodemon is only installed locally in the folder structure. Always use the usual npm start, and npm will look locally for nodemon.

Now your projects server will be running and will automatically restart when some saved change is detected.


### updating packages

In the terminal type npm install. - this will go through all your packages and update them to the latest version.

# Sharing your project
When you share your projects without the node_modules folder (where local Dependencies are stored) and you can run npm install in a project to then re-create that node_modules folder. This allows you to share only your source code, hence reducing the size of the shared project vastly.
Doing a npm install draws the info required for the installations from package.json and uses the exact version information from package-lock.json to install the correct versions.

## Should i Gitignore node_modules folder?

### Pros
+ Keeps the size of the repo down
+ Avoids unwanted branch conflicts when working with others
+ You can install them anytime using npm install - and npm will use the package-lock.json file to get correct versions.

### Cons
+ npm might not be around forever - so would be nice to have complete code base committed.
+ An npm package might be removed by its author - leaving you with a possible big problem.

### My Conclusion
I will not commit the node_module for these lesson projects and would reccomend saving a local of cloud based backup of the node_modules for more dependant packages when doing a production project.


# Glossary

## Global Features vs Core Modules vs Third-Party Modules

You can basically differentiate between:

**Global features:** Keywords like const or function but also some global objects like process

**Core Node.js Modules:** Examples would be the file-system module ("fs"), the path module ("path") or the Http module ("http")

**Third-party Modules:** Installed via npm install - you can add any kind of feature to your app via this way

+   Global features are always available, you don't need to import them into the files where you want to use them.

+   Core Node.js Modules don't need to be installed (NO npm install is required) but you need to import them when you want to use features exposed by them.

    Example:

    ```const fs = require('fs');```   
    You can now use the fs object exported by the "fs" module.

+   Third-party Modules need to be installed (via npm install in the project folder) AND imported.

## Global & Local npm Packages

The good thing about local dependencies is that you can share projects without the node_modules folder (where they are stored) and you can run npm install in a project to then re-create that node_modules folder. This allows you to share only your source code, hence reducing the size of the shared project vastly.

The attached course code snippets also are shared in that way, hence you need to run npm install in the extracted packages to be able to run my code!

I showed that nodemon app.js would not work in the terminal or command line because we don't use local dependencies there but global packages.

You could install nodemon globally if you wanted (this is NOT required though - because we can just run it locally): npm install -g nodemon would do the trick. Specifically the -g flag ensures that the package gets added as a global package which you now can use anywhere on your machine, directly from inside the terminal or command prompt.