import { db } from "../models/db.js";
import { AnswerSpec } from "../models/joi-schemas.js";

export const vendorAnswerController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const notice = await db.noticeStore.getNoticeById(request.params.noticeid);
      const discussion = await db.discussionStore.getDiscussionById(request.params.id);
      const answers = await db.answerStore.getAnswersByDiscussion(discussion._id);
      const viewData = {
        title: "Vendor Notice Details",
        user: loggedInUser,
        answers: answers,
        discussion: discussion,
        notice: notice,
      };
      return h.view("vendor-answers-view", viewData);
    },
  },

  addAnswer: {
    validate: {
      payload: AnswerSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("vendor-answers-view", { title: "Add Answer error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const discussion = await db.discussionStore.getDiscussionById(request.params.id);
      const newAnswer = {
        userid: loggedInUser._id,
        answerDate: new Date(),
        userFirstName: loggedInUser.firstName,
        userLastName: loggedInUser.lastName,
        answerContent: request.payload.answerContent,
        discussionid: discussion._id,
      };
      await db.answerStore.addAnswer(newAnswer);
      console.log("this is discussion");
      console.log(newAnswer);
      return h.redirect(`/vendornotice/${discussion.noticeid}/vendoranswers/${discussion._id}`); 
    },
  },

  deleteAnswer: {
    handler: async function (request, h) {
      const discussion = await db.discussionStore.getDiscussionById(request.params.id);
      const answer = await db.answerStore.getAnswerById(request.params.answerid);
      await db.answerStore.deleteAnswerById(answer._id);
      return h.redirect(`/vendornotice/${discussion.noticeid}/vendoranswers/${discussion._id}`);
    },
  },

};