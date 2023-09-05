const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();


//importing database
const connectDB = require('./config/dbconfig');
const app = express();
const routes = require("./controllers/routes");

// importing my routes
const batteryRoutes = require("./controllers/batteryRoute");
const tyreRoutes = require("./controllers/tyreRoute");
const userRoutes = require("./controllers/userRoute");



app.use(express.urlencoded({extended: false}));
app.use(express.json()); 
app.engine("pug", require("pug").__express)


//calling the configuration to run
connectDB();
 
//setting up pug as our view engine
app.engine("pug",require("pug").__express);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views" ));

//seting up directories for static files
app.use(express.static(path.join(__dirname, "public")))

// using my routes
app.use("/",routes)
app.use("/api", batteryRoutes)
app.use("/api", tyreRoutes)
app.use("/api", userRoutes);



// HTTP server
const port =process.env.PORT ||8080;
 app.listen(port, () => {
 console.log(`Server is running at http://localhost:${port}`)
 })
 
