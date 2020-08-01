// npm install express 
// We do not have to do manual url parshing and write custom backend express will handle it
// npm install pug ==> to install pug
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving static file
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine','pug'); // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')); // Set the view directory

// ENDPOINTS
app.get("/", (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely";
    const params = {'title': 'Fitness Website', "content": con}
    res.status(200).render("index.pug", params);
});

app.post("/", (req, res) => {
    name = req.body.name
    age = req.body.age
    gender = req.body.gender
    address = req.body.address
    email = req.body.email
    phoneNo = req.body.phoneNo
    let outputToWrite = `The name of the client is ${name}, ${age} years old, ${gender}, residing at ${address}. 
Mail id : ${email}, Contact no. ${phoneNo}`
    fs.writeFileSync('output.txt', outputToWrite)
    const params = {'message': 'Your form has been submitted succesfully'}
    res.status(200).render("index.pug", params);
});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`This application started successfully on port ${port}`);
});