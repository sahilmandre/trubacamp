var express = require("express");
(app = express()),
    (bodyParser = require("body-parser")),
    (mongoose = require("mongoose")),
    (flash      = require('connect-flash')),
    (passport = require("passport")),
    (LocalStrategy = require("passport-local")),
    (methodOverride = require("method-override")),
    (Campground = require('./models/campground')),
    (Comment = require('./models/comment')),
    (User = require("./models/user.ejs")),
    (seedDB = require('./seeds'));

var commentRoutes   = require("./routes/comments");
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")


var url = process.env.DATABASEURL   || "mongodb://localhost:27017/Yelp_camp_v12"
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();  //seed  the database

// Passpost configuration
app.use(require("express-session")({
    secret: "Once Lied to me ",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


// requiring routes 
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000 , function () {
    console.log("Truba Camp server started");
});

// app.listen(process.env.PORT , process.env.IP,  function () {
//     console.log("Yelp Camp server started");
// });
