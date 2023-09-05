const express = require('express');
const session = require('express-session');
const router = express.Router();
const Battery = require('../models/batteryModel'); 



router.use(
  session({
    secret:process.env.JWT_SECRET_KEY, 
    resave: false,
    saveUninitialized: false,
  })
);



const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    next(); 
  } else {
    res.redirect('/login'); 
  }
};

const isUser = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'user') {
    next(); 
  } else {
    res.redirect('/login');  // unauthorized users
  }
};

const authenticateUser = (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.role === 'admin') {
      res.redirect('/dashboard');
    } else if (req.session.user.role === 'user') {
      res.redirect('/services');
    }
  } else {
    next(); 
  }
};


router.get('/dashboard', isAdmin, async (req, res) => {
  try{
      let items= await Battery.find();

res.render('../views/pug/dashboard.pug',{batteries:items})
  }
  catch(error){
      return res.status(400).send({message:'sorry could not get employees'});
      console.log(error);
  }
})



router.get("/", (req, res) => {
  res.render("../views/pug/index.pug");
});
router.get("/login", authenticateUser, (req, res) => {
  res.render("../views/pug/parkingLogin.pug");
});

router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    // Redirect to the login page after logout
    res.redirect('/login');
  });
});
 
router.get("/signUp", authenticateUser, (req, res) => {
  res.render("../views/pug/parkingRegister.pug");
});
router.get("/personal-car", (req, res) => {
  res.render("../views/pug/personal-car.pug");
});
router.get("/battery", (req, res) => {
  res.render("../views/pug/batterysection.pug");
});
router.get("/bodaboda", (req, res) => {
  res.render("../views/pug/bodaboda.pug");
});
router.get("/tyre", (req, res) => {
  res.render("../views/pug/cartyreclinic.pug");
});
router.get("/parking", (req, res) => {
  res.render("../views/pug/parking.pug");
});
router.get("/coaster", (req, res) => {
  res.render("../views/pug/coaster.pug");
});
router.get("/services", isUser, (req, res) => {
  res.render("../views/pug/services.pug");
});
router.get("/taxis", (req, res) => {
  res.render("../views/pug/taxis.pug");
});
router.get("/trucks", (req, res) => {
  res.render("../views/pug/trucks.pug");
});

router.get("/receipt", (req, res) =>{
  const userQueryParam = req.query.battery;
  const battery = JSON.parse(decodeURIComponent(userQueryParam));
  res.render("../views/pug/receipt.pug", { battery});

})

module.exports = router;