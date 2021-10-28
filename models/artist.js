const mongoose = require("mongoose");

let artistSchema = new mongoose.Schema({
    ArtistId: Number,
    Name: String
});

const Artist = mongoose.model("Artist", artistSchema);

module.exports = { Artist };