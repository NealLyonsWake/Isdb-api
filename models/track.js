const mongoose = require("mongoose");

let trackSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, "track name required"]
    },
    AlbumId: {
        type: Number,
        required: true
    },
    GenreId: {
        type: Number,
        required: true
    },
    Composer: {
        type: String,
        required: true
    },
    Milliseconds: {
        type: Number,
        required: true
    },
    Bytes: {
        type: Number,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    }
});

const Track = mongoose.model("Track", trackSchema);

module.exports = { Track };





