const express = require('express');
const router = express.Router();
const Listing = require('../models/listing.js');
const Review = require('../models/review.js');
const User = require('../models/user.js');
const { isLoggedIn , isOwner } = require('../middelware.js');

const listingController = require('../controllers/listing.js')
const multer = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({ storage })



// Index Route
router.get('/', listingController.index);

// New Route
router.get('/new', isLoggedIn ,  listingController.renderNewForm);

// Show Route
router.get('/:id', listingController.showRoute);


//Create Route
router.post('/',  isLoggedIn , listingController.createNewPost);
// router.post('/',  isLoggedIn , upload.single("listing[image]"), (req,res)=> {
//     res.send(req.file);
// });

//Edit Route
router.get('/:id/edit',  isLoggedIn , isOwner , listingController.editRoute);

// Update Route
router.put('/:id',  isLoggedIn , isOwner , listingController.updateRoute);

//Delete Route
router.delete('/:id' ,  isLoggedIn , isOwner , listingController.deleteRoute);

module.exports = router;