const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review.js');
const User = require('./user.js');

const listingSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,  // Automatically trims any surrounding whitespace
        minlength: [3, 'Title must be at least 3 characters long']
    },
    description: {
        type: String,
        trim: true  // Automatically trims any surrounding whitespace
    },
    image: {
        type: String,
        default: "https://plus.unsplash.com/premium_photo-1684470563670-a11e9fc64a53?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: v => v === "" ? "https://plus.unsplash.com/premium_photo-1684470563670-a11e9fc64a53?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v
    },
    price: {
        type: Number,
        min: [0, 'Price must be a positive number']
    },
    location: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
