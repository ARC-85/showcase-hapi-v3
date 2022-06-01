import { Review } from "./review.js";

export const reviewMongoStore = {
  async getAllReviews() {
    const reviews = await Review.find().lean();
    return reviews;
  },

  async getReviewById(id) {
    if (id) {
      const review = await Review.findOne({ _id: id }).lean();
      return review;
    }
    return null;
  },

  async addReview(review) {
    const newReview = new Review(review);
    const reviewObj = await newReview.save();
    return this.getReviewById(reviewObj._id);
  },

  async getClientUserReviews(id) {
    const review = await Review.find({ userid: id }).lean();
    return review;
  },

  async getClientUserProjectReviews(id, projectid) {
    const review = await Review.find({ userid: id, projectid: projectid }).lean();
    return review;
  },

  async getReviewsByProject(id) {
    const review = await Review.find({ projectid: id }).lean();
    return review;
  },

  async deleteReviewById(id) {
    try {
      await Review.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllReviews() {
    await Review.deleteMany({});
  },

  async updateReply(review, updatedReply) {
    review.reply = updatedReply.reply;
    review.vendorFirstName = updatedReply.vendorFirstName;
    const query = { _id: review._id };
    const updatedValues = { $set: {reply: review.reply, vendorFirstName: review.vendorFirstName} };
    await Review.updateOne(query, updatedValues);
  },
};