import Mongoose from "mongoose";

const { Schema } = Mongoose;

const answerSchema = new Schema({
  answerDate: String,
  userFirstName: String,
  userLastName: String,
  answerContent: String, 
  discussionid: {
    type: Schema.Types.ObjectId,
    ref: "Discussion",
  },
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Answer = Mongoose.model("Answer", answerSchema);