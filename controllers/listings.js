const Listing = require('../models/listing');

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index', { allListings });
};

module.exports.renderNewListing = (req, res) => {
    res.render('listings/new');
};

module.exports.showListing = async (req, res) => {
    console.log(req.url, "Working");
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    
    if (!listing) {
        req.flash("error", "Listing you requested does not exist");
        return res.redirect('/listings');
    }

    console.log(listing);
    res.render('listings/show', { listing });
};

module.exports.createListing = async (req, res) => {
    console.log("Request Body: ", req.body);

    // ✅ store image as direct string (since frontend sends listing[image])
    const listingData = req.body.listing;

    const listing = new Listing(listingData);
    await listing.save();

    req.flash("success", "New Listing Added");
    console.log(listing);
    res.redirect('/listings');
};

module.exports.renderEditForm = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        req.flash("error", "Listing you requested does not exist");
        return res.redirect('/listings');
    }
    console.log(listing);
    res.render('listings/edit', { listing });
};

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    console.log('request body: ', req.body);

    const listingData = req.body.listing;

    // ✅ image is already a direct string now
    await Listing.findByIdAndUpdate(id, listingData, { new: true });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};
