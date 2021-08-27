import { check } from 'express-validator';

const userSignupValidator = [
    check('first_name').not().isEmpty().withMessage('First Name is required'),
    check('last_name').not().isEmpty().withMessage('Last Name is required'),
    check('email').isEmail().withMessage('email is required'),
    check('email').custom(value => {
        let index = value.indexOf('@') + 1;
        let domain = value.slice(index);
        console.log(domain);
        if(domain == "costaatt.edu.tt" || domain == "my.costaatt.edu.tt"){
            return true
        }else{
            return false
        }
    }).withMessage("Not Of Our Organization"),
    check('password').isLength({ "min": 6 }).withMessage('Password must be at least 6 characters long')
];

const userSigninValidator = [
    check('email').isEmail().withMessage('email is required'),
    check('password').isLength({ "min": 6 }).withMessage('Password must be at least 6 characters long')
];


export { userSignupValidator, userSigninValidator};