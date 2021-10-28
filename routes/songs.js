const express = require('express');
const passport = require('passport');

const { Album } = require('../models/album');
const { Artist } = require('../models/artist');
const { Genre } = require('../models/genre');
const { Track } = require('../models/track');

const router = express.Router();

const usersRouter = require('../routes/users');
router.use(usersRouter)

// get a track by id
router.get('/tracks/:id', passport.authenticate(
    "jwt", { session: false }),
    async function (req, res) {
        try {
            const track = await Track.findOne({ _id: req.params.id });
            return res.json(track);
        } catch {
            res.status(404).json(
                { message: "Oops, there is no track with that id." }
            )
        }
    });

// get all genres
router.get('/genres', passport.authenticate(
    "jwt", { session: false }),
    async function (req, res) {
        const genres = await Genre.find();
        return res.json(genres);
    });

// get an album by id
router.get('/albums/:id', passport.authenticate(
    "jwt", { session: false }),
    async function (req, res) {
        try {
            const album = await Album.findOne({ _id: req.params.id });
            return res.json(album);
        } catch {
            res.status(404).json(
                { message: "Oops, there is no album with that id." }
            )
        }
    });

// get an artist by id
router.get('/artists/:id', passport.authenticate(
    "jwt", { session: false }),
    async function (req, res) {
        try {
            const artist = await Artist.findOne({ _id: req.params.id });
            return res.json(artist);
        }
        catch {
            res.status(404).json(
                { message: "Oops, there is no artist with that id." }
            )
        }
    });

// post a track
router.post('/tracks', passport.authenticate(
    "jwt", { session: false }),
    async function (req, res) {
        const albumIdRequest = req.body.AlbumId;
        const genreIdRequest = req.body.GenreId;
        if (!albumIdRequest || isNaN(albumIdRequest) || !genreIdRequest || isNaN(genreIdRequest)) {
            res.status(400).json({
                message: "valid album id and genre id required."
            });
        } else {
            const albums = await Album.findOne({ AlbumId: albumIdRequest });
            if (albums) {
                const genres = await Genre.findOne({ GenreId: genreIdRequest });
                if (genres) {
                    try {
                        const track = new Track({
                            Name: req.body.Name,
                            AlbumId: albumIdRequest,
                            GenreId: genreIdRequest,
                            Composer: req.body.Composer,
                            Milliseconds: req.body.Milliseconds,
                            Bytes: req.body.Bytes,
                            unitPrice: req.body.unitPrice
                        });
                        await track.save();
                        res.send(track);
                    }
                    catch (err) {
                        console.log(err)
                        res.status(400).json({
                            message: `Oh dear, ${err}.`
                        });
                    }
                } else {
                    res.status(400).json({
                        message: "no genre with that id exists."
                    });
                }
            } else {
                res.status(400).json({
                    message: "no album with that id exists."
                });
            }
        }
    });

module.exports = router;