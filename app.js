const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const Review = require('./models/review.js');
const path = require('path');
const ejsMate = require('ejs-mate');

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

app.get('/', (req, res) => {
    res.send("working");
});

// Index Route
app.get('/listings', async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
});

// New Route
app.get('/listings/new', (req, res) => {
    res.render("listings/new");
});

// Show Route
app.get('/listings/:id', async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", { listing });
});


//Create Route
app.post('/listings', async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    console.log(newListing);
    res.redirect('/listings');
});

//Edit Route
app.get('/listings/:id/edit', async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

// Update Route
app.put('/listings/:id', async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete('/listings/:id' , async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing); 
        res.redirect('/listings'); 
});

//Reviews Route
//Post
// app.post('/listings/:id/reviews', async (req, res) => {
//     let listing = Listing.findById(req.params.id);
//     let newReview = new Review(req.body.review);

//     listing.reviews.push(newReview);
    
//     await newReview.save();
//     await listing.save();

//     console.log("new review saved");
//     res.send("new review saved");
    


// })

app.post('/listings/:id/reviews', async (req, res) => {
    try {
        const listingId = req.params.id;
        const newReview = new Review(req.body);
        await newReview.save();

        const listing = await Listing.findById(listingId).populate('reviews');

        if (!listing) {
            return res.status(404).send('Listing not found');
        }

        // Ensure the reviews array is initialized
        if (!Array.isArray(listing.reviews)) {
            listing.reviews = [];
        }

        listing.reviews.push(newReview);
        await listing.save();

        res.redirect(`/listings/${listing.id}`)
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});





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
