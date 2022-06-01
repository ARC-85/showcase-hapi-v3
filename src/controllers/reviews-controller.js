import { db } from "../models/db.js";

export const reviewsController = {
  index: {
    handler: async function (request, h) {
      const loggedInClientUser = request.auth.credentials;
      const reviews = await db.reviewStore.getClientUserReviews(loggedInClientUser._id);
      const viewData = {
        title: "Showcase Client Reviews",
        clientUser: loggedInClientUser,
        reviews: reviews,
      };
      return h.view("reviews-view", viewData);
    },
  },

  deleteReview: {
    handler: async function (request, h) {
      const review = await db.reviewStore.getReviewById(request.params.id);
      await db.reviewStore.deleteReviewById(review._id);
      return h.redirect("/reviews");
    },
  },
};