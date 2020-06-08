const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
// var PythonShell = require('python-shell');
// var pyshell = new PythonShell('automation.py');
var myPythonScript = "automation.py";
var pythonExecutable = "python.exe";


const spawn = require("child_process").spawn;
const pythonProcess = spawn('python3', ["automation.py"]);


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");



});

app.post("/", function(req, res){
  var searchQuery = req.body.searchquery;
  console.log(searchQuery);
  var spawn = require("child_process").spawn;
  const scriptExecution = spawn(pythonExecutable, ["automation.py", searchQuery]);
  scriptExecution.stdout.on('data', (data) => {
    console.log(uint8arrayToString(data));
});
  pyshell.end(function(err){
  	if (err){
  		throw err;
  };
  console.log('finished');
});
 });

app.listen(3000, function(){
  console.log("Server is running on port 3000");

});
