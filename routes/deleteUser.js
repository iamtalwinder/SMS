const router = require('express').Router();
const con = require('../public/javascript/config');
const {checkToken, adminStaff} = require('../public/javascript/verifyToken');

router.delete('/delete', checkToken, adminStaff, checkEmail, (req, res)=>{
    con.query(`DELETE FROM users WHERE email="${req.body.email}"`, (err, result)=>{
        if (err) return res.status(400).send(err);
        res.status(200).send('User has been deleted.');
    });
});

function checkEmail(req, res, next) {
    con.query(`SELECT * FROM users WHERE email="${req.body.email}"`, (err, result)=>{
        if (err) return res.status(400).send(err);
        if (result.length < 1) return  res.status(400).send('E-mail does not exist.');
        if (req.user.role === 'staff' && result[0].role === 'admin') return res.status(400).send('Sorry! You cannot delete admin account');
        next();
    });
}

module.exports = router;