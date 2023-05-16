const {registerUser,loginUser,forgotPassword ,
    getUserProfile,logoutUser,updatePassword,
    updateProfile,allUsers,getUserDetails,
    updateUser,deleteUser,resetPassword}=require('../controller/authController');

const {isAuthenticatedUser,AuthorizeRoles} =require('../middlewares/auth')
const express=require('express');
const router=express.Router();


router.route('/register').post(registerUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword)
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser)
router.route('/me').get(isAuthenticatedUser,getUserProfile)
router.route('/password/update').put(isAuthenticatedUser,updatePassword)
router.route('/update').put(isAuthenticatedUser,updateProfile)

router.route('/admin/users').get(isAuthenticatedUser,AuthorizeRoles('admin'),allUsers)
router.route('/admin/users/:id')
    .get(isAuthenticatedUser,AuthorizeRoles('admin'),getUserDetails)
    .put(isAuthenticatedUser, AuthorizeRoles('admin'), updateUser)
    .delete(isAuthenticatedUser, AuthorizeRoles('admin'), deleteUser)

module.exports=router;