const express       = require("express");
const bodyParser    = require("body-parser");
const passport      = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const app           = express();
const mongoose      = require("mongoose");
const User          = require("./models/user");

// connecting to mongoose
mongoose.connect("mongodb+srv://avin:Mongodb%4012345@cluster0-ltttm.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true})
mongoose.set('useNewUrlParser',true)
mongoose.set('useCreateIndex',true)

app.use(bodyParser.urlencoded({extended:true}));

// passport configuration
app.use(require("express-session")({
    secret:"whitepanda",
    resave:false,
    saveUninitialized:true
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// passing info to all pages
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
})
// getting all the routes
const user = require("./routes/user");
const car = require("./routes/car");
const admin = require("./routes/admin");
app.use("/user",user);
app.use("/car",car);
app.use("/admin",admin)

app.get("/",(req,res)=>{
	res.send({
			message:"Testing....."
		})
})

app.listen(process.env.PORT, process.env.IP);