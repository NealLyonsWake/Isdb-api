const mongoose = require("mongoose");

let albumSchema = new mongoose.Schema({
    AlbumId: Number,
    Title: String,
    ArtistId: Number
});

const Album = mongoose.model("Album", albumSchema);

module.exports = { Album };