import { Discussion } from "./discussion.js";

export const discussionMongoStore = {
  async getAllDiscussions() {
    const discussions = await Discussion.find().lean();
    return discussions;
  },

  async getDiscussionById(id) {
    if (id) {
      const discussion = await Discussion.findOne({ _id: id }).lean();
      return discussion;
    }
    return null;
  },

  async addDiscussion(discussion) {
    const newDiscussion = new Discussion(discussion);
    const discussionObj = await newDiscussion.save();
    return this.getDiscussionById(discussionObj._id);
  },

  async getVendorUserDiscussions(id) {
    const discussion = await Discussion.find({ userid: id }).lean();
    return discussion;
  },

  async getVendorUserNoticeDiscussions(id, noticeid) {
    const discussion = await Discussion.find({ userid: id, noticeid: noticeid }).lean();
    return discussion;
  },

  async getDiscussionsByNotice(id) {
    const discussion = await Discussion.find({ noticeid: id }).lean();
    return discussion;
  },

  async deleteDiscussionById(id) {
    try {
      await Discussion.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllDiscussions() {
    await Discussion.deleteMany({});
  },

};