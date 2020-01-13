
//Impoprt express package
const express = require("express");

//Import middleware logger
const morgan = require('morgan');

//Init express
const app = express();


function logger(req,resp,next){
    console.log(`Logger manual: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

//-------------------------------------------------------SETTINGS-------------------------------------------------------
app.set('port',3000);
app.set('appName',"Express basic");
app.set('view engine',"ejs");

//-------------------------------------------------------MIDLEWARES-------------------------------------------------------
app.use(express.json());
//LOG NORMAL
app.use(logger);
//LOG MORGAN
app.use(morgan('tiny'));

//-------------------------------------------------------ROUTERS-------------------------------------------------------
app.all("/",(req,resp)=>{
    console.log("URL: /");

    const uses = [{"userName":"Omar"},{"userName":"Martinez"}];

    resp.render('index.ejs', {users});
});


//Method Type: GET
//Result: Json
app.get("/getJson",(req,resp)=>{
    resp.json(
        {
            userName:"Omar",
            lastName:"Martinez"
        }
    );
});

//Method Type: POST
//Result: HTML
app.post("/sendJson",(req,resp)=>{
    console.log("JSON Body: " + req.body);
    resp.send("<h1>Datos recibidos para: " + req.body.userName +"</h1>");
});
//Method Type: GET
//Result: HTML
app.get("/user/:userId",(req,resp) => {
    console.log("JSON params: " + req.params);
    resp.send(`<h1>Usuario : ${req.params.userId}</h1>`);
});

app.get("/about",(req,resp)=>{
    console.log("URL: /");
    resp.send("<h2>This is URL: /about</h2>");
});

//-------------------------------------------------------MIDLEWARES STATIC-------------------------------------------------------
app.use(express.static('public'));


//Start listening server
app.listen(app.get('port'),()=> {
    console.log(`Server "${app.get('appName')}" listening in port: ${app.get('port')}`);
});