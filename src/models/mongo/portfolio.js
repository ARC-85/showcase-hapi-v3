import Mongoose from "mongoose";

const { Schema } = Mongoose;

const portfolioSchema = new Schema({
  title: String,
  portfolioCategory: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Portfolio = Mongoose.model("Portfolio", portfolioSchema);