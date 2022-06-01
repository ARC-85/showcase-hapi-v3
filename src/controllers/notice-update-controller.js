import { db } from "../models/db.js";
import { NoticeSpec } from "../models/joi-schemas.js";

export const noticeUpdateController = {
  index: {
    handler: async function (request, h) {
      const notice = await db.noticeStore.getNoticeById(request.params.id);
      const discussions = await db.discussionStore.getDiscussionsByNotice(notice._id);
      const viewData = {
        title: "Update Notice",
        notice: notice,
        discussions: discussions,
      };
      console.log(notice);
      return h.view("update-notice-view", viewData);
    },
  },

  updateNotice: {
    /* validate: {
      payload: NoticeSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const notice = await db.noticeStore.getNoticeById(request.params.id);
        const viewData = {
          title: "Notice",
          notice: notice,      
          errors: error.details
        };
        return h.view("update-notice-view", viewData).takeover().code(400);
      },
    }, */
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const notice = await db.noticeStore.getNoticeById(request.params.id);
      const updatedNotice = {
        userid: loggedInUser._id,
        noticeTitle: request.payload.noticeTitle,
        noticeLatitude: request.payload.noticeLatitude,
        noticeLongitude: request.payload.noticeLongitude,
        vendorCategory: request.payload.vendorCategory,
        noticeCategory: request.payload.noticeCategory,
        noticeStyle: request.payload.noticeStyle,
        request: request.payload.request,
      };
      await db.noticeStore.updateNotice(notice, updatedNotice);
      console.log(notice);
      return h.redirect("/notices");
    },
  },

  deleteDiscussion: {
    handler: async function (request, h) {
      const notice = await db.noticeStore.getNoticeById(request.params.id);
      const discussion = await db.discussionStore.getDiscussionById(request.params.discussionid);
      await db.discussionStore.deleteDiscussionById(discussion._id);
      return h.redirect(`/noticeupdate/${notice._id}`);
    },
  },
  
};