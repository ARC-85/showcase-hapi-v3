import Mongoose from "mongoose";

const { Schema } = Mongoose;

const favouriteSchema = new Schema({
  favouriteProjectTitle: String,
  favouriteLatitude: String,
  favouriteLongitude: String,
  favouriteStyleDescription: String, 
  favouriteProjectDescription: String, 
  favouriteAreaSqM: Number,
  favouritePriceEu: Number,
  favouriteImage1: String, 
  favouriteImage2: String, 
  favouriteImage3: String, 
  projectid: {
    type: Schema.Types.ObjectId,
    ref: "Project",
  },
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Favourite = Mongoose.model("Favourite", favouriteSchema);