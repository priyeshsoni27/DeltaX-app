import express from 'express'
import {
  addArtist,
  addArtistSong,
  addSong,
  createUser,
  getAllArtist,
  getArtistSong,
  getTop10Artist,
  getTop10Songs,
  getUser,
  updateSongRating,
  addRating
} from './../controllers/info.js'

const router = express.Router()

router.get('/top10songs', getTop10Songs)
router.get('/top10artist', getTop10Artist)
router.get('/allartist', getAllArtist)
router.post('/song', addSong)
router.post('/artist', addArtist)
router.patch('/updaterating', addRating)
router.post('/getuser', getUser)
router.post('/adduser', createUser)
router.post('/artistsong', addArtistSong)
router.post('/artistsongids', getArtistSong)

export default router
