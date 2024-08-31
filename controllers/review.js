const Review = require('../models/review');
const Listing = require('../models/listing');

module.exports.postRouter = async (req, res) => {
    try {
        const listingId = req.params.id;
        const { rating, comment } = req.body;

        // Validate that the required fields are present in the request body
        if (!rating) {
            req.flash("error", "Rating is required");
            return res.redirect(`/listings/${listingId}`);
        }

        // Find the listing by ID
        const listing = await Listing.findById(listingId);
        if (!listing) {
            req.flash("error", "Listing not found");
            return res.redirect('/listings');
        }

        // Create a new review
        const newReview = new Review({
            rating,
            comment,
            author: req.user._id, // Ensure the author is set when creating the review
        });

        console.log(newReview);

        await newReview.save(); // Save the review

        // Add the review to the listing's reviews array
        listing.reviews.push(newReview._id);

        await listing.save(); // Save the updated listing

        req.flash("success", "New review created");
        res.redirect(`/listings/${listingId}`);
    } catch (error) {
        console.error(error);
        req.flash("error", "Something went wrong");
        res.status(500).redirect('/listings');
    }
}

module.exports.deleteRoute = async function (req, res) {
    let { id , reviewId } = req.params;
    await Listing.findByIdAndUpdate(id , {$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success" , "review deleted");


    res.redirect(`/listings/${id}`);
}