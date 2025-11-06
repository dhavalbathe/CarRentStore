const mongoose = require('mongoose');
const { Schema } = mongoose;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,   // fixed small typo: "require" → "required"
    },
    
    description: String,

    // ✅ Changed: image is now just a string, not an object
    image: {
        type: String,
        default: "https://via.placeholder.com/300x200.png?text=No+Image" // optional fallback
    },

    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
});

listingSchema.post('findOneAndDelete', async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
        console.log("This listing is deleting");
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
