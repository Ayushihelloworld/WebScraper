# WebScraper
A webscraper  

How to run: 
  1. Install Node js
  2. Install MongoDB
  3. Now, the file structure will be in this manner:
  1 Main File Structure  
    1. views
        a. home.ejs
        b. submit.ejs
        c. login.ejs
        d. register.ejs
        1-A. partials
          1. header.ejs
          2. footer.ejs
    2.automation.py
    3.server.js
    4 .env  
Now go into your directory and run  
``` npm init -y```  
Now install all the required modules using the following commands:

``` npm install express body-parser request path passport-google-oauth20 mongoose ejs express-session passport passport-local-mongoose mongoose-findorcreate```

Make a new database  in mongoDB named userDB. Also, ensure that your mongo shell is working by running the "mongo command". To make things easier, install robo3T (which is a GUI for mongoDB).

Now, go your directory and run
```
node server.js
```

If all is working fine you will see a message from the MONGODB company and a printed message on the console:
 ``` 
Heyyyy there!!
hello
116385308444-oumu2cfqt8cgp8auucbsreno5dfds1gq.apps.googleusercontent.com
(node:10500) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
Server is running on port 3000 
```
 
 Now, enter the following in our Chrome browser:
 
 ``` http://localhost:3000/register ```
 
 Now,  enter all your details or sign in with Google as required. You will be redirected to the page "http://localhost:3000/index".'
 To make the thing work in the searchbox enter a string:  
 "Constitution of " +  CountryName + " pdf".  
 Voila!!
 After pressing the enter button a script(automation.py) will be run and in few seconds, the cmd will display the link to the website(Government approved) and it will have the pdf of the consitution to refer :-).
