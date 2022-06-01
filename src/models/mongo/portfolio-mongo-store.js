import { Portfolio } from "./portfolio.js";
import { projectMongoStore } from "./project-mongo-store.js";

export const portfolioMongoStore = {
  async getAllPortfolios() {
    const portfolios = await Portfolio.find().lean();
    return portfolios;
  },

  async getPortfolioById(id) {
    if (id) {
      const portfolio = await Portfolio.findOne({ _id: id }).lean();
      if (portfolio) {
        portfolio.projects = await projectMongoStore.getProjectsByPortfolioId(portfolio._id);
      }
      return portfolio;
    }
    return null;
  },

  async addPortfolio(portfolio) {
    const newPortfolio = new Portfolio(portfolio);
    const portfolioObj = await newPortfolio.save();
    return this.getPortfolioById(portfolioObj._id);
  },

  async getUserPortfolios(id) {
    const portfolio = await Portfolio.find({ userid: id }).lean();
    return portfolio;
  },

  async deletePortfolioById(id) {
    try {
      await Portfolio.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPortfolios() {
    await Portfolio.deleteMany({});
  }
};