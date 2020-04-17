const router = require('express').Router();
const con = require('../public/javascript/config');
const {all, checkToken} = require('../public/javascript/verifyToken');

router.delete('/logout', checkToken, all, (req, res)=>{
    const token = req.header('auth-token');
    con.query(`DELETE FROM token WHERE auth_token="${token}"`, (err, result)=>{
        if (err) return res.status(400).send(err);
        res.send('Logged out');
    }); 
});

module.exports = router;