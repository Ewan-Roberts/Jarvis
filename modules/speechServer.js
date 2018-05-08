
// server set up
const   app     = require("express")(),
        express = require("express"),
        https   = require("https"),
        path    = require("path"),
        fs      = require("fs"),
        user    = require("./userInformation");

app.set("port", process.env.PORT || user.port);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"))
app.get("/", (req, res) => {res.sendfile("index.html", {"root": "../speech/public"})});

//sets up local certifications so Chrome doesnt throw an error
const options = {

    key: fs.readFileSync("./localhost.key"),
    cert: fs.readFileSync("./localhost.cert"),
    requestCert: false,
    rejectUnauthorized: false

};

//Create a global server to be accessed across the application
server = https.createServer(options, app).listen(app.get("port"), () => {
 
    console.log("Server listening on port " + app.get("port"));

})