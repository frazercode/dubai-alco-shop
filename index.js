require('dotenv').config();
const express = require('express');
const session = require('express-session');
const https = require('https');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const database = require('./src/utils/database');
const app = express();
var corsOptions = {
    credentials: true,
    origin: function(origin, callback) {
        callback(null, true);
    }
}

app.use(cors(corsOptions));
app.use('/',express.static('client'));
app.use('/admin',express.static('admin-panel/build'));
app.use(express.json());
app.use(session({
    secret: 'UBYVF*^&GUVYIF*GEUO',
    resave: true,
    saveUninitialized: true,
    cookie: {httpOnly: true, maxAge: 60*60*1000 },
}))

app.use('/drink', require('./src/routes/drink.route'));

app.use('/category', require('./src/routes/category.route'));

app.use('/auth', require('./src/routes/auth.route'));

database.run();
if (process.env.CERT_LOCATION) {
    var http = express();
    http.get('*', function (req, res) {
            res.redirect("https://" + req.headers.host + req.url);
    });
    
    http.listen(80);
    
    var key = fs.readFileSync(process.env.CERT_LOCATION + "/privkey.pem");
    var cert = fs.readFileSync(process.env.CERT_LOCATION + "/cert.pem");
    var bundle = fs.readFileSync(process.env.CERT_LOCATION + "/chain.pem");
    
    var options = {
        key: key,
        cert: cert,
        ca: bundle
    };
    
    var server = https.createServer(options, app);	
    server.listen(443, () => {
        console.log("Express server started listening on port " + 443);
    });
} else {
    app.listen(80);
}