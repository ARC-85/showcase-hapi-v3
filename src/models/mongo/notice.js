import Mongoose from "mongoose";

const { Schema } = Mongoose;

const noticeSchema = new Schema({
  noticeDate: String,
  clientFirstName: String,
  clientLastName: String,
  noticeTitle: String,
  noticeLatitude: String,
  noticeLongitude: String,
  vendorCategory: String,
  noticeCategory: String,
  noticeStyle: String,
  request: String,  
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Notice = Mongoose.model("Notice", noticeSchema);