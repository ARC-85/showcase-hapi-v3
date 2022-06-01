import { db } from "../models/db.js";
import { DiscussionSpec } from "../models/joi-schemas.js";

export const vendorDiscussionController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const discussions = await db.discussionStore.getVendorUserDiscussions(loggedInUser._id);
      const viewData = {
        title: "Vendor User Discussions",
        user: loggedInUser,
        discussions: discussions,
      };
      return h.view("vendor-discussions-view", viewData);
    },
  },


  deleteDiscussion: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const discussion = await db.discussionStore.getDiscussionById(request.params.id);
      await db.discussionStore.deleteDiscussionById(discussion._id);
      return h.redirect("/vendordiscussions");
    },
  },

};