const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const Review = require('./models/review.js');
const path = require('path');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync.js')
const ExpressError = require('./utils/ExpressError.js')
const {listingSchema} = require('./views/includes/schema.js')

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));


const methodOverride = require('method-override');
app.use(methodOverride('_method'));


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const validateListing = (req , res, next) => {
    let { error } = listingSchema.validate(req.body);
    console.log(error);
    if(error) {
        throw new ExpressError(400, error);
    }
    else {
        next();
    }
}

app.get('/', (req, res) => {
    res.send("working");
});

// Index Route
app.get('/listings', wrapAsync ( async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
}));

// New Route
app.get('/listings/new', (req, res) => {
    res.render("listings/new");
});

// Show Route
app.get('/listings/:id', wrapAsync ( async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", { listing });
}));


//Create Route
app.post('/listings', validateListing , wrapAsync  (async (req, res) => {
    if(!req.body.listing) {
        throw new ExpressError(400 , "Send a valid data for listing")
    }
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    console.log(newListing);
    res.redirect('/listings');
}));

//Edit Route
app.get('/listings/:id/edit', wrapAsync ( async (req, res) => {
   
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
   
}));

// Update Route
app.put('/listings/:id', validateListing ,  wrapAsync (async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}));

//Delete Route
app.delete('/listings/:id' , wrapAsync (async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing); 
        res.redirect('/listings'); 
}));

//Error handling
// app.use((err,req,res,next) =>  {
//     res.send("something went wrong");
// });


app.all('*', (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err,req,res,next) => {
    let { statusCode=500, message="something went wrong?"} = err;
    res.status(statusCode).render("error.ejs" , {message});
});

//Reveiw Route
//Post Route
// app.post('/listings/:id/reviews' , async (req, res) => {
//    let listing = await Listing.findById(req.params.id);
//    let newReview = new Review(req.body.review);

//    listing.reviews.push(newReview);

//    await newReview.save();
//    await listing.save();

//    console.log("new review saved");
//    res.send("yes");
// });

app.post('/listings/:id/reviews', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }
    const newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log(newReview);
    res.redirect(`/listings/${id}` , {reviews});
}));

// Error handling for 404 and other errors

// Update Route
// app.put('/listings/:id', async (req, res) => {
//     const { id } = req.params;
//     console.log(`Updating listing with ID: ${id}`);
//     console.log(req.body);
//     await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//     res.redirect('/listings');
// });



// Uncomment and use this route for testing if needed
// app.get('/testListing', async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My new villa",
//         description: "by the beach",
//         price: 100000,
//         location: "Goa",
//         country: "India"
//     });
//     console.log(sampleListing);

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successfully testing");
// });

app.listen(8080, () => {
    console.log('Server started on port 8080');
});
