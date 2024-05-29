const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");

// controllers
const {
    updateProfile,
    updateUserProfileImage,
    getUserDetails,
    deleteAccount,
} = require('../controllers/profile');


// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

// Delete User Account
router.delete('/deleteProfile', auth, deleteAccount);
router.put('/updateProfile', auth, updateProfile);
router.get('/getUserDetails', auth, getUserDetails);


// update profile image
router.put('/updateUserProfileImage', auth, updateUserProfileImage);


module.exports = router;
