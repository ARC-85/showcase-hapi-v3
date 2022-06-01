import { v4 } from "uuid";
import { projectMemStore } from "./project-mem-store.js";

let portfolios = [];

export const portfolioMemStore = {
  async getAllPortfolios() {
    return portfolios;
  },

  async addPortfolio(portfolio) {
    portfolio._id = v4();
    portfolios.push(portfolio);
    return portfolio;
  },

  async getPortfolioById(id) {
    const list = portfolios.find((portfolio) => portfolio._id === id);
    if (list) {
      list.projects = await projectMemStore.getProjectsByPortfolioId(list._id);
      return list;
    }
    return null;
  },

  async deletePortfolioById(id) {
    const index = portfolios.findIndex((portfolio) => portfolio._id === id);
    if (index !== -1) portfolios.splice(index, 1);
  },   

  async deleteAllPortfolios() {
    portfolios = [];
  },

  async getUserPortfolios(userid) {
    return portfolios.filter((portfolio) => portfolio.userid === userid);
  },
};