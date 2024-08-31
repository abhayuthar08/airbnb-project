if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const Review = require('./models/review.js');
const path = require('path');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
// const LocalStrategy = require('passport-local').Strategy;
// const bodyParser = require('body-parser');
const User = require('./models/user.js');
const MongoStore = require('connect-mongo');

const listingsRouter = require('./routes/listing.js')
const reviewsRouter = require('./routes/review.js')
const userRouter = require('./routes/user.js')

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));


const methodOverride = require('method-override');
app.use(methodOverride('_method'));


// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;


main()
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(dbUrl);
}

const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto : {
        secret : process.env.SECRET
    },
    touchAfter : 24 * 3600,
});

store.on("error" , () => {
    console.log("ERROR in MONGO SESSION STORE",err);
})

const sessionOptions = {
    store,
    secret : process.env.SECRET ,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now ()  + 7 * 24 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    }
};



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.get('/', (req, res) => {
    res.send("working");
});

// // Index Route
// app.get('/listings', async (req, res) => {
//     const allListings = await Listing.find({});
//     res.render("listings/index", { allListings });
// });

// // New Route
// app.get('/listings/new', (req, res) => {
//     res.render("listings/new");
// });

// // Show Route
// app.get('/listings/:id', async (req, res) => {
//     const { id } = req.params;
//     const listing = await Listing.findById(id).populate("reviews");
//     res.render("listings/show", { listing });
// });


// //Create Route
// app.post('/listings', async (req, res) => {
//     const newListing = new Listing(req.body.listing);
//     await newListing.save();
//     console.log(newListing);
//     res.redirect('/listings');
// });

// //Edit Route
// app.get('/listings/:id/edit', async (req, res) => {
//     const { id } = req.params;
//     const listing = await Listing.findById(id);
//     res.render("listings/edit.ejs", { listing });
// });

// // Update Route
// app.put('/listings/:id', async (req, res) => {
//     const { id } = req.params;
//     await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//     res.redirect(`/listings/${id}`);
// });

// //Delete Route
// app.delete('/listings/:id' , async (req, res) => {
//     let { id } = req.params;
//     let deletedListing = await Listing.findByIdAndDelete(id);
//     console.log(deletedListing); 
//         res.redirect('/listings'); 
// });

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

app.use((req,res,next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user;
    next();
})

app.get('/demousers' , async (req , res) => {
    let fakeUser = new User ({
        email : "student@gmail.com",
        username : "delta-student"
    })

    let registeredUser = await User.register(fakeUser , "helloworld");
    res.send(registeredUser);
})

app.use('/listings' , listingsRouter);
app.use('/listings/:id/reviews' , reviewsRouter);
app.use('/' , userRouter);

// app.post('/listings/:id/reviews', async (req, res) => {
//     try {
//         const listingId = req.params.id;
//         const { rating, comment } = req.body;

//         // Validate that the required fields are present in the request body
//         if (!rating) {
//             return res.status(400).send('Rating is required');
//         }

//         const newReview = new Review({
//             rating,
//             comment,
//             // Add any other fields that are part of the review schema
//         });

//         await newReview.save();

//         const listing = await Listing.findById(listingId).populate('reviews');
//         if (!listing) {
//             return res.status(404).send('Listing not found');
//         }

//         // Ensure the reviews array is initialized
//         if (!Array.isArray(listing.reviews)) {
//             listing.reviews = [];
//         }

//         listing.reviews.push(newReview);
//         await listing.save();

//         res.redirect(`/listings/${listing.id}`);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Something went wrong');
//     }
// });

// app.delete('/listings/:id/reviews/:reviewId' , async function (req, res) {
//     let { id , reviewId } = req.params;
//     await Listing.findByIdAndUpdate(id , {$pull : {reviews : reviewId}});
//     await Review.findByIdAndDelete(reviewId);

//     res.redirect(`/listings/${id}`);
// })


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
