import express from 'express';
// import controller
import { signup, accountActivation, signin } from '../controllers/auth';
import {addNotice, getNotices, getRoles, 
    getUserRoles, getRole, getGroups, 
    getPermissions, getUsers, getCurrUser, 
    getUserByID, getUserByTokenReq, applyLeader,
    getPending, approveLeader, deleteNotice
} from '../controllers/methods';


//import validators
import { userSignupValidator, userSigninValidator } from '../validators/auth';
import runValidation from '../validators';

const router = express.Router();

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/account-activation', accountActivation);
router.post('/signin', userSigninValidator, runValidation, signin);
//router.post('/signin', passport.authenticate('local'), signin);


router.post('/notices/new', addNotice);
router.post('/notices/delete', deleteNotice);

router.post('/applyleader', applyLeader);
router.post('/users/approve', approveLeader);

router.post('/users/pending', getPending);
router.post('/notices/all', getNotices);
router.get('/roles', getRoles);
router.get('/user/:id/roles', getUserRoles);

router.get('/role', getRole);
router.get('/groups', getGroups);



router.get('/permissions', getPermissions);
router.get('/users', getUsers);
router.post('/user', getUserByID);
router.post('/usertoken', getUserByTokenReq);

// router.all('*', (req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', '*');
//     next();
//   });








export default router;