import { db } from "../models/db.js";
import { DiscussionSpec } from "../models/joi-schemas.js";

export const vendorNoticeDetailsController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const notice = await db.noticeStore.getNoticeById(request.params.id);
      const discussions = await db.discussionStore.getVendorUserNoticeDiscussions(loggedInUser._id, notice._id);
      const viewData = {
        title: "Vendor Notice Details",
        user: loggedInUser,
        notice: notice,
        discussions: discussions,
      };
      return h.view("vendor-notice-details-view", viewData);
    },
  },

  addDiscussion: {
    validate: {
      payload: DiscussionSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("vendor-notice-details-view", { title: "Add Discussion error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const notice = await db.noticeStore.getNoticeById(request.params.id);
      const vendorFirstName = loggedInUser.firstName;
      const vendorLastName = loggedInUser.lastName;
      const discussionDate = new Date();

      const newDiscussion = {
        userid: loggedInUser._id,
        discussionTitle: request.payload.discussionTitle,
        noticeid: notice._id,
        vendorFirstName: vendorFirstName,
        vendorLastName: vendorLastName,
        discussionDate: discussionDate,
      };
      await db.discussionStore.addDiscussion(newDiscussion);
      console.log(newDiscussion);
      return h.redirect(`/vendornotice/${notice._id}`);
    },
  },

  deleteDiscussion: {
    handler: async function (request, h) {
      const notice = await db.noticeStore.getNoticeById(request.params.id);
      const discussion = await db.discussionStore.getDiscussionById(request.params.discussionid);
      await db.discussionStore.deleteDiscussionById(discussion._id);
      return h.redirect(`/vendornotice/${notice._id}`);
    },
  },

};