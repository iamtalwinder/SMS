const jwt = require('jsonwebtoken');
const con = require('./config');

function admin(req, res, next) {
    const token = req.header('auth-token');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if (verified.role !== 'admin') return res.status(400).send('You cannot access this route');
        req.user = verified;
        next();
    } catch(err) {
        return res.status(400).send('Invalid token!');
    }
}

function adminStaff(req, res, next) {
    const token = req.header('auth-token');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if (verified.role === 'student') return res.status(400).send('You cannot access this route');
        req.user = verified;
        next();
    } catch(err) {
         res.status(400).send('Invalid token!');
    }
}

function all(req, res, next) {
    const token = req.header('auth-token');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch(err) {
        res.status(400).send('Invalid token!');      
    }
}

//Check if token exists in database
function checkToken(req, res, next) {
    const token = req.header('auth-token');

    //No token found
    if (!token) return res.status(401).send('Access denied!');

    con.query(`SELECT *FROM token WHERE auth_token="${token}"`, (err, result)=>{
        if (err) return res.status(400).send(err);
        if (result.length ===  0) return res.status(400).send('Token has been expired');
        next();
    });
    
}

module.exports.admin = admin;
module.exports.adminStaff = adminStaff;
module.exports.all = all;
module.exports.checkToken = checkToken;