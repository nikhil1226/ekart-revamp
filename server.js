var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('ekart', ['loginDetails', 'mobiles', 'cart']);
var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/newUser', function (req, res) {
    db.loginDetails.find(function (err, docs) {
        res.json(docs);
    });
});

app.post('/signUp', function (req, res) {
    let a = req.body.username;
    let b = req.body.password;
    db.loginDetails.insert({ emailId: a, password: b }, function (err, doc) {
        res.json(doc);
    });
});

app.post('/login', function (req, res) {
    var user = req.body;
    db.loginDetails.findOne({
        emailId: user.email,
        password: user.password
    }, function (err, docs) {
        if (err) {
            return next(err);
        } else {
            res.json(docs);
        }
    });
});

app.get('/mobiles', function (req, res) {
    db.mobiles.find(function (err, doc) {
        res.json(doc);
    });
});

app.post('/addToCart', function (req, res) {
    let a = req.body.mobileName;
    let b = req.body.mobilePrice;
    db.cart.insert({ mobileName: a, mobilePrice: b }, function (err, doc) {
        res.json(doc);
    });
});

app.get('/getCartDetails', function (req, res) {
    db.cart.find(function (err, doc) {
        res.json(doc);
    });
});

app.delete('/removeFromCart/mobileName=:mobileName&mobilePrice=:mobilePrice', function (req, res) {    
    console.log(req.body);
    // let a = req.body.mobileName;
    // let b = req.body.mobilePrice;    
    // db.cart.remove({ mobileName: a, mobilePrice: b }, function (err, doc) {
    //     res.json(doc);
    // });
});

app.listen(3000);
console.log("server running on port:3000"); 