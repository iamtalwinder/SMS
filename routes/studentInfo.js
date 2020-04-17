const router = require('express').Router();
const con = require('../public/javascript/config');
const { studentValidation, updateStudentValidation } = require('../public/javascript/validation');
const { adminStaff, checkToken} = require('../public/javascript/verifyToken');


router.post('/insert-info', checkToken, adminStaff, validateBody, checkDuplicate, (req, res)=>{

    const values = [
       [   
           req.body.id, 
           req.body.DOB, 
           req.body.course, 
           req.body.sem
       ]
   ];

   //Insert values in database
    con.query(`INSERT INTO student VALUES ?`, [values], (err, result)=>{
        if (err) return res.status(400).send(err);
        res.status(200).send(values);
    });
});

router.put('/update-info', checkToken, adminStaff, (req, res)=>{
    //Validate update information
    const {error} = updateStudentValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

   const updateUserTable = `
        UPDATE user SET 
        fname="${req.body.fname}",
        lname="${req.body.lname}",
        email="${req.body.email}"
        WHERE id=${req.body.id}
    `;

    const updateStudentTable = `
        UPDATE student SET 
        DOB="${req.body.DOB}",
        course="${req.body.course}",
        sem="${req.body.sem}"
        WHERE id=${req.body.id}
    `;

    const resultQuery = `
        SELECT user.fname, user.lname, user.email,
        student.DOB, student.course, student.sem
        FROM user
        INNER JOIN student ON user.id = student.id;
    `;

   //Update user table
    con.query(updateUserTable, (err, result)=>{
        if (err) return res.status(400).send(err);
        //Update student table
        con.query(updateStudentTable, (err, result)=>{
            if (err) return res.status(400).send(err);
            //Return join
            con.query(resultQuery, (err, result)=>{
                if (err) return res.status(400).send(err);
                res.status(400).send(result);
            });
        });
    });
});

//Validates the student information
function validateBody(req, res, next) {
    const {error} = studentValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
} 

//Check for duplicate entry in student table
function checkDuplicate(req, res, next) {
    con.query(`SELECT *FROM STUDENT WHERE id="${req.body.id}"`, (err, result)=>{
        if (err) return res.status(400).send(err);
        if (result.length > 0) return res.status(400).send('Record already exists.');
        next();
    });
}

module.exports = router;