User Form

REQUIREMENTS:
- git
- npm / node

BREIF:
This is a development environment to build out a user form and api connection. This is half code we use, and half thrown together to make work. Even though it is a good idea to read through all source files, it is not the goal of this excerise to have full understanding of the whole project. As guidence comments are left in areas that you should know about and will help you modify the progect. If there are any questions throughout you can reach out to me and I will update the repo with further explanation/hint/fix.

TASKS:
- setup environment
  * test server
  * test page
- connect page to server
- add to page
- style page


- SETUP SERVER  -
Command into the '/server' folder and 'npm install' to install all dependencies. From there run 'npm run server' to start the server. If the server started successfully the message 'listening on port: 8080' will show. After confirmation the server is listening, paste 'http://localhost:8080/ping' into your favorite browser and you should get a response of 'msg:ping'. The server is now ready and waiting. If there is a need to restart the server for any reason it can be first stop by 'CTL C' twice, and the 'npm run server' again.

There is an alternate command ('npm run dev') to start the server that will restart the server if it a file is changed. This is handy when developing, but tends to drag the performance down and has acted up in the past. If you are using this start method and something weird is happening, it is good to start the server normally and see if the problem persist.

command reference
  cmd->npm install
  cmd->npm run server
  cmd->npm run dev (option)

  browser->http://localhost:8080/ping

- SETUP PAGE -
This will require some sort of mock server. If you do not already have a method, we use downloaded "live servers" through our IDE (atom and VSC).
Once you find a "live server" that works, run it on the '/page' folder. If everything works the form should show in the browser.

- CONNECTING PAGE->SERVER -
This should be as simple as starting them at the same time. If the two are connected, the page will display some users in a list and a form. Depending on your 'live server' setup you may need to change the port the server is listening on. The browser will have the host and port the live server uses. If its a match you can change the port of the server by changeing the variable 'port'->/server/server.js = 3000.

In the event it is not working, feel free to modify any of the files to fix but dont get stuck on it. Reach out to me and we will get it working. This is not meant to be an excerise on debugging.

- MODIFICATIONS TO PAGE/SERVER -
  + add one (or more) input(s) to the form. reflect on table.
  + add properties to the server to match the above inputs so it saves properly
  + apply style to page

  + (extra credit) add one feature to improve user flow

It is not important what types of inputs you add, just that it is reflected in the form, table, and being communicated to the api properly. This excercise is more focused on the front-end, so I tried to make it easy to modify the backend user object. As far as styling, a general layout was applied to have the page better understood for first view. Feel free to change anything and everything about the styles.

- CLOSING -
The above can be used as a checklist. You are free to do/change whatever you have to to accomplish the task. Though you have freedom, please comment your changes as you go and periodically 'commit' your changes to the repo. The goal is to assess your comfortability and communication through git, how you approach and learn existing code/project, and for you to show your skills, so have fun with it.

Happy Hunting
