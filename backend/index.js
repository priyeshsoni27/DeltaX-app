import cors from 'cors'
import express from 'express'
import db from './config/database.js'
import { artist, artistSong, song } from './models/infoModel.js'
import infoRoutes from './routes/index.js'

const app = express()

try {
  await db.authenticate()
  console.log('Database connected')
} catch (error) {
  console.log(error)
}

app.use(cors())
app.use(express.json())
app.use('/info', infoRoutes)

db.sync({ force: false }).then(() => {
  app.listen(5000, () => console.log('Server running at port 5000'))
})

db.songs = song
db.artists = artist
db.artistSongs = artistSong

db.songs.belongsToMany(db.artists, {
  through: 'artist_songs'
})
db.artists.belongsToMany(db.songs, {
  through: 'artist_songs'
})
