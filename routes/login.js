const router = require('express').Router();
const con = require('../public/javascript/config');
const { loginValidation } = require('../public/javascript/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/login', (req, res)=>{
    //Validate user information
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Authenticate user
    con.query(`SELECT *FROM users WHERE email="${req.body.email}" AND role="${req.body.role}"`, async (err, result)=>{
        if (err) return res.status(400).send(err);

        //No email found
        if (!result.length) return res.status(400).send("E-mail with the given role doesn't exist!");

        //Compare password
        const validPass = await bcrypt.compare(req.body.password, result[0].password);

        //Incorrect password
        if (!validPass) return res.status(400).send('Incorrect password!');

        //Create and assign an token
        const token = jwt.sign(
                {
                    id: result[0].id, 
                    role: result[0].role,
                    fname: result[0].fname,
                    lname: result[0].lname,
                    email: result[0].email
                }, 
                process.env.TOKEN_SECRET);
        //Push token in database
        con.query(`INSERT INTO token VALUES ("${token}")`, (err, result)=>{
            if (err) return res.status(400).send(err);
        });
        res.header('auth-token', token).send(token);
    });
});

module.exports = router;