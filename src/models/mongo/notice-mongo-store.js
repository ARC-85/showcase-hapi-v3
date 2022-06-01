import { Notice } from "./notice.js";

export const noticeMongoStore = {
  async getAllNotices() {
    const notices = await Notice.find().lean();
    return notices;
  },

  async addNotice(notice) {
    const newNotice = new Notice(notice);
    const noticeObj = await newNotice.save();
    return this.getNoticeById(noticeObj._id);
  },

  async getNoticeById(id) {
    if (id) {
      const notice = await Notice.findOne({ _id: id }).lean();
      return notice;
    }
    return null;
  },

  async getUserNotices(id) {
    const notices = await Notice.find({ userid: id }).lean();
    return notices;
  },

  async deleteNotice(id) {
    try {
      await Notice.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllNotices() {
    await Notice.deleteMany({});
  },

  async getNoticesByCategory(category) {
    const notices = await Notice.find({ noticeCategory: category }).lean();
    return notices;
  },


  async updateNotice(notice, updatedNotice) {
    notice.noticeTitle = updatedNotice.noticeTitle;
    notice.noticeLatitude = updatedNotice.noticeLatitude;
    notice.noticeLongitude = updatedNotice.noticeLongitude;
    notice.noticeCategory = updatedNotice.noticeCategory;
    notice.vendorCategory = updatedNotice.vendorCategory;
    notice.noticeStyle = updatedNotice.noticeStyle;
    notice.request = updatedNotice.request;
    console.log(notice._id)
    const query = { _id: notice._id };
    const updatedValues = { $set: {noticeTitle: notice.noticeTitle, noticeLatitude: notice.noticeLatitude, noticeLongitude: notice.noticeLongitude, noticeCategory: notice.noticeCategory, vendorCategory: notice.vendorCategory, noticeStyle: notice.noticeStyle, request: notice.request } };
    await Notice.updateOne(query, updatedValues);
  },

};
