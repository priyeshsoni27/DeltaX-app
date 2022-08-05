import { Sequelize } from "sequelize";
import db from "./../config/database.js";

const { DataTypes } = Sequelize;

const song = db.define(
  "songs",
  {
    title: {
      type: DataTypes.STRING(1234),
    },
    date_of_release: {
      type: DataTypes.DATE,
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.STRING(1234),
    },
  },
  { timestamps: false },
  { freezeTableName: true }
);
const artist = db.define(
  "artists",
  {
    name: {
      type: DataTypes.STRING(1234),
    },
    dob: {
      type: DataTypes.DATE,
    },
    bio: {
      type: DataTypes.STRING(1234),
    },
  },
  { timestamps: false },
  { freezeTableName: true }
);

const user = db.define(
  "users",
  {
    name: {
      type: DataTypes.STRING(1234),
    },
    email: {
      type: DataTypes.STRING(1234),
    },
    password: {
      type: DataTypes.STRING(1234),
    },
  },
  { timestamps: false },
  { freezeTableName: true }
);

const userRating = db.define(
  "user_ratings",
  {
    userId: {
      type: DataTypes.INTEGER,
    },
    songId: {
      type: DataTypes.INTEGER,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: false },
  { freezeTableName: true }
);

const artistSong = db.define(
  "artist_songs",
  {
    songId: {
      type: DataTypes.INTEGER,
    },
    artistId: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: false },
  { freezeTableName: true }
);
export { song, artist, user, artistSong, userRating };
