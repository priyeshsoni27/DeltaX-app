import {
  artist,
  artistSong,
  song,
  user,
  userRating
} from './../models/infoModel.js'

export const addArtistSong = async (req, res) => {
  try {
    await artistSong.create(req.body)
  } catch (error) {
    res.json({ message: error.message })
  }
}
export const getArtistSong = async (req, res) => {
  if (req.body.song_id) {
    try {
      const artist_ids = await artistSong.findAll({
        where: {
          songId: req.body.songId
        }
      })
      res.json(artist_ids)
    } catch (error) {
      res.json({ message: error.message })
    }
  } else {
    try {
      const song_ids = await artistSong.findAll({
        where: {
          artistId: req.body.artistId
        }
      })
      res.json(song_ids)
    } catch (error) {
      res.json({ message: error.message })
    }
  }
}

export const addRating = async (req, res) => {
  try {
    const isUserRate = await userRating.findAll({
      where: {
        songId: req.body.songId,
        userId: req.body.userId
      }
    })
    console.log(isUserRate)
    if (isUserRate.length) {
      await userRating.update(
        { rating: req.body.rating },
        { where: { songId: req.body.songId, userId: req.body.userId } }
      )
    } else {
      await userRating.create({
        songId: req.body.songId,
        userId: req.body.userId,
        rating: req.body.rating
      })
    }
    res.json({ message: 'Succeeded' })
  } catch (error) {
    console.log(error)
  }
}

export const addSong = async (req, res) => {
  try {
    const newSong = await song.create({
      title: req.body.title,
      date_of_release: req.body.date_of_release
    })
    res.json(newSong)
  } catch (error) {
    res.json({ message: error.message })
  }
}
export const getTop10Songs = async (req, res) => {
  try {
    let songs = await song.findAll({
      include: [
        {
          model: artist
        }
      ],
      order: [['rating', 'DESC']]
    })
    console.log(songs)
    res.json(songs)
  } catch (error) {
    res.json({ message: error.message })
  }
}
export const addArtist = async (req, res) => {
  try {
    const newArtist = await artist.create(req.body)
    res.json(newArtist)
  } catch (error) {
    res.json({ message: error.message })
  }
}
export const getTop10Artist = async (req, res) => {
  try {
    const artists = await artist.findAll({
      include: [
        {
          model: song
        }
      ]
    })
    res.json(artists)
  } catch (error) {
    res.json({ message: error.message })
  }
}
export const getAllArtist = async (req, res) => {
  try {
    const artists = await artist.findAll()
    res.json(artists)
  } catch (error) {
    res.json({ message: error.message })
  }
}

export const updateSongRating = async (req, res) => {
  try {
    const currSong = await song.findAll({
      where: {
        id: req.body.id
      }
    })
    const updatedRating = currSong[0].dataValues.rating + req.body.rating
    await song.update(
      {
        rating: updatedRating
      },
      {
        where: {
          id: req.body.id
        }
      }
    )
    req.json({ message: 'Succeeded' })
  } catch (error) {
    res.json({ message: error.message })
  }
}
export const createUser = async (req, res) => {
  try {
    let users = await user.findAll({
      where: {
        email: req.body.email
      }
    })
    if (users.length == 0) {
      const newUser = await user.create(req.body)
      res.json(newUser)
    } else {
      res.json({ userExist: true })
    }
  } catch (error) {
    res.json({ message: error.message })
  }
}
export const getUser = async (req, res) => {
  try {
    const users = await user.findAll({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    })
    if (users.length == 0) {
      res.json({ userExist: false })
    } else {
      res.json(users)
    }
  } catch (error) {
    res.json({ message: error.message })
  }
}
