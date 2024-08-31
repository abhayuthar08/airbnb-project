const express = require('express');
const router = express.Router({mergeParams: true});
const Review = require('../models/review.js');
const Listing = require('../models/listing.js'); // Add this line
const {isLoggedIn , isOwner , isReviewAuthor} = require('../middelware.js');

const reviewControllers = require('../controllers/review.js')

// ... rest of the code remains the same ...


router.post('/', isLoggedIn, reviewControllers.postRouter);
 

router.delete('/:reviewId' ,isLoggedIn,isReviewAuthor, reviewControllers.deleteRoute)




module.exports = router;