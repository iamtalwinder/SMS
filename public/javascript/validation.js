const Joi = require('@hapi/joi')
    .extend(require('@hapi/joi-date'));

//Validation schema for register information
const registerValidation = (data) => {
    const schema = Joi.object({
        fname: Joi.string()
            .min(2)
            .max(20)
            .required(),
        lname: Joi.string()
            .min(2)
            .max(20)
            .required(),
        email: Joi.string()
            .min(6)
            .max(35)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .max(20)
            .required(),
        confirmPassword: Joi.string()
            .required(),
        role: Joi.string()
            .min(4)
            .required()
            .valid('admin', 'staff', 'student')
    });
    return schema.validate(data);
}

//Validation schema for login information
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .max(35)
            .required()
            .email(),
        password: Joi.string()
            .required(),
        role: Joi.string()
            .required()
            .valid('admin', 'staff', 'student')
    });
    return schema.validate(data);
}

//Validation schema for student information
const studentValidation = (data) => {
    const schema = Joi.object({
        id: Joi.number()
            .integer()
            .min(1)
            .required(),
        DOB: Joi.date()
            .format('YYYY-MM-DD')
            .required(),
        course: Joi.string()
            .required()
            .valid('BBA', 'BCA'),
        sem: Joi.string()
            .required()
            .valid('1', '2', '3', '4') 
    });
    return schema.validate(data);
}

//Validation schema for updating student information
const updateStudentValidation = (data) => {
    const schema = Joi.object({
        id: Joi.number()
            .integer()
            .min(1)
            .required(),
        fname: Joi.string()
            .min(2)
            .max(20)
            .required(),
        lname: Joi.string()
            .min(2)
            .max(20)
            .required(),
        email: Joi.string()
            .min(6)
            .max(35)
            .required()
            .email(),
        DOB: Joi.date()
            .format('YYYY-MM-DD')
            .required(),
        course: Joi.string()
            .required()
            .valid('BBA', 'BCA'),
        sem: Joi.string()
            .required()
            .valid('1', '2', '3', '4') 
    });
    return schema.validate(data);
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.studentValidation = studentValidation;
module.exports.updateStudentValidation = updateStudentValidation;