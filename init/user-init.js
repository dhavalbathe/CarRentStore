const mongoose = require('mongoose');
// const Listing = require('../models/listing.js');
const User = require('../models/user.js');
const initData = require('./user-data.js');

const MONGO_URL = "mongodb://127.0.0.1:27017/airbnb";

main().then(() => {
    console.log("MongoDB Connected Successfully");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await User.deleteMany({});
    await User.insertMany(initData.data);
    console.log("Data Initialization Success!");
}

initDB();