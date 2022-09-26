var express = require("express");
var router = express.Router();
var objectid = require("mongodb").ObjectId;
var bcrypt = require("bcrypt");
const bookhelpers = require("../helpers/bookhelpers");
const adminhelpers = require("../helpers/adminhelpers");
let verifyLogin = (req, res, next) => {
  if (req.session.adminLoggedIn) {
    next();
  } else {
    res.redirect("/admin/admin-login");
  }
};
router.get('/', async(req, res) => {
  res.render('login')
})

router.post('/loginAdmin', (req, res) => {
  adminhelpers.AdminLogin(req.body).then((response) => {
    if (response.status) {
      req.session.admin = response.admin;
      req.session.adminLoggedIn = true;
      res.redirect("/admin/Addbook");
    } else {
      req.session.adminLoginError = "Invalid username or Password";
      res.redirect("/admin/");
    }
 })
})
router.get("/admin-logout", (req, res) => {
  req.session.admin = null;
  req.session.adminLoggedIn = false;
  res.redirect("/admin/");
});
/* GET home page. */
router.get('/Addbook',verifyLogin, (req, res) => {
  bookhelpers.GetAllBook().then((Response) => {
    res.render('admin/home',{Response});
  })
});

router.post('/addBook', (req, res) => {
  bookhelpers.AddBook(req.body).then(() => {
   res.redirect('/admin/Addbook')
  })
})

router.post('/Update', (req, res) => {
  console.log(req.body);
  bookhelpers.UpdateBook(req.body).then(() => {
    res.redirect('/admin/Addbook')
  })
})
router.post('/deleteBook', (req, res) => {
  bookhelpers.DeleteBook(req.body.book).then(() => {
    res.redirect('/admin/Addbook')
  })
})
module.exports = router;
