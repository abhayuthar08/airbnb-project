const Listing = require('../models/listing');

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
}

module.exports.renderNewForm = (req, res) => {
   
    res.render("listings/new");
}

module.exports.showRoute =  async (req, res) => {
    const { id } = req.params;

    try {
        const listing = await Listing.findById(id)
            .populate({ path : "reviews", 
                populate : {
                    path: "author",
                },
            })
            .populate("owner");

        console.log('Listing:', listing); // Log the entire listing object
        console.log('Owner:', listing.owner); // Log the owner object

        // Check if owner is populated and has a username
        if (listing.owner) {
            console.log('Owner Username:', listing.owner.username);
        } else {
            console.error('Owner is not populated');
        }

        res.render("listings/show", { listing });
    } catch (error) {
        console.error('Error fetching listing:', error);
        res.status(500).send('Internal server error');
    }
}

module.exports.createNewPost = async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success" , "new listing created");
    console.log(newListing);
    res.redirect('/listings');
}

module.exports.editRoute = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
}

module.exports.updateRoute = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}

module.exports.deleteRoute = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success" , "listing deleted");

    console.log(deletedListing); 
        res.redirect('/listings'); 
}