import { db } from "../models/db.js";

export const projectReviewsController = {
  index: {
    handler: async function (request, h) {
      const project = await db.projectStore.getProjectById(request.params.id);
      const reviews = await db.reviewStore.getReviewsByProject(project._id);
      const viewData = {
        title: "Showcase Vendor Reviews",
        project: project,
        reviews: reviews,
      };
      return h.view("vendor-reviews-view", viewData);
    },
  },

  updateReply: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const project = await db.projectStore.getProjectById(request.params.id);
      const review = await db.reviewStore.getReviewById(request.params.reviewid);
      const updatedReply = {
        vendorFirstName: loggedInUser.fisrtName,
        reply: request.payload.reply,
      };
      await db.reviewStore.updateReply(review, updatedReply);
      return h.redirect(`/project/${project._id}/projectreviews`);
    },
  },
};