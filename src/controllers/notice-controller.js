import { db } from "../models/db.js";
import { NoticeSpec } from "../models/joi-schemas.js";

export const noticeController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const notices = await db.noticeStore.getUserNotices(loggedInUser._id);
      const viewData = {
        title: "Client User Notices",
        user: loggedInUser,
        notices: notices,
      };
      return h.view("client-notice-view", viewData);
    },
  },

  addNotice: {
    validate: {
      payload: NoticeSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("client-notice-view", { title: "Add Notice error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newNotice = {
        userid: loggedInUser._id,
        noticeDate: new Date(),
        clientFirstName: loggedInUser.firstName,
        clientLastName: loggedInUser.lastName,
        noticeTitle: request.payload.noticeTitle,
        noticeLatitude: request.payload.noticeLatitude,
        noticeLongitude: request.payload.noticeLongitude,
        vendorCategory: request.payload.vendorCategory,
        noticeCategory: request.payload.noticeCategory,
        noticeStyle: request.payload.noticeStyle,
        request: request.payload.request,
      };
      await db.noticeStore.addNotice(newNotice);
      return h.redirect("/notices");
    },
  },
  
  deleteNotice: {
    handler: async function (request, h) {
      const notice = await db.noticeStore.getNoticeById(request.params.id);
      await db.noticeStore.deleteNotice(notice._id);
      return h.redirect("/notices");
    },
  },
};