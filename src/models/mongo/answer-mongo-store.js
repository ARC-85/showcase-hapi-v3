import { Answer } from "./answer.js";

export const answerMongoStore = {
  async getAllAnswers() {
    const answers = await Answer.find().lean();
    return answers;
  },

  async getAnswerById(id) {
    if (id) {
      const answer = await Answer.findOne({ _id: id }).lean();
      return answer;
    }
    return null;
  },

  async addAnswer(answer) {
    const newAnswer = new Answer(answer);
    const answerObj = await newAnswer.save();
    return this.getAnswerById(answerObj._id);
  },

  async getUserAnswers(id) {
    const answers = await Answer.find({ userid: id }).lean();
    return answers;
  },

  async getUserDiscussionAnswers(id, discussionid) {
    const answer = await Answer.find({ userid: id, discussionid: discussionid }).lean();
    return answer;
  },

  async getAnswersByDiscussion(id) {
    const answers = await Answer.find({ discussionid: id }).lean();
    return answers;
  },

  async deleteAnswerById(id) {
    try {
      await Answer.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllAnswers() {
    await Answer.deleteMany({});
  },

};