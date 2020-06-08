const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const path = require("path");
const {spawn} = require("child_process");
// var PythonShell = require('python-shell');
// var pyshell = new PythonShell('automation.py');
// let p = require('python-shell');
// var myPythonScript = "automation.py";

// import {PythonShell} from 'python-shell';
// // var pythonExecutable = "python.exe";
// let pyshell = new PythonShell('automation.py');
//
let {PythonShell} = require('python-shell');

// /**
//  * Run python script, pass in `-u` to not buffer console output
//  * @return {ChildProcess}
//  */
// function runScript(){
//   return spawn('python', [
//     "-u",
//     path.join(__dirname, 'automation.py'),
//     "--foo", "some value for foo",
//   ]);
// }

// const spawn = require("child_process").spawn;
// const pythonProcess = spawn('python3', ["automation.py"]);
// //
// const subprocess = runScript()

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
  // var options = {
  //         args:
  //         [
  //           JSON.stringify()''
  //
  //         ]
  //       }
  //       p.PythonShell.run('automation.py', options, function  (err, results)  {
  //
  //
  //         console.log(results.toString())
  //
  //       });


});

app.post("/", function(req, res){
  var searchQuery = req.body.searchquery;
  console.log(searchQuery);
  let pyshell = new PythonShell('automation.py');
  var options = {
          args:
          [
            JSON.stringify(searchQuery)

          ]
        }
        console.log(options);
        pyshell.send(options);
        // p.PythonShell.run('automation.py', options, function  (err, results)  {
        //   console.log("Hello!!");
        //   console.log(results);
        // //  console.log(results.toString())
        //
        // });
        pyshell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement)
        console.log(message);
          });
          pyshell.end(function (err,code,signal) {
  if (err) throw err;
  console.log('The exit code was: ' + code);
  console.log('The exit signal was: ' + signal);
  console.log('finished');
});
 });

app.listen(3000, function(){
  console.log("Server is running on port 3000");

});
