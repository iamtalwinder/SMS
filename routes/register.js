const router = require('express').Router();
const con = require('../public/javascript/config');
const { registerValidation } = require('../public/javascript/validation');
const {adminStaff, checkToken} = require('../public/javascript/verifyToken');
const bcrypt = require('bcryptjs');

router.post('/register', checkToken, adminStaff, async (req, res) => {

    //If user with staff privileges attempts to create admin user
    if (req.user.role === 'staff' && req.body.role === 'admin') return res.status(400).send('Sorry! You cannot create admin account');

    //Validate user information
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking password and confirm password is same
    if (req.body.password !== req.body.confirmPassword)
       return res.status(400).send('"Password" and "Confirm Password" fileds must be same');
    
    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create user
    const values = [
        [   
            req.body.fname, 
            req.body.lname, 
            req.body.email, 
            hashedPassword,
            req.body.role
        ]
    ];

    //Insert user in database
    con.query('INSERT INTO users (fname, lname, email, password, role) VALUES ?', [values], (err, result)=>{
        if (err) {
            //Email exists
            if (err.errno === 1062) return res.status(400).send('User with the same email already exists');
            //Other errors
            return res.status(400).send(err);
        }
        res.status(201).send('User has been created');
    });
});

module.exports = router;