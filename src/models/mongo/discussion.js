import Mongoose from "mongoose";

const { Schema } = Mongoose;

const discussionSchema = new Schema({
  discussionTitle: String, 
  vendorFirstName: String,
  vendorLastName: String,
  discussionDate: String,
  noticeid: {
    type: Schema.Types.ObjectId,
    ref: "Notice",
  },
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Discussion = Mongoose.model("Discussion", discussionSchema);