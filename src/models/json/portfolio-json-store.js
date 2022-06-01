import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";
import { projectJsonStore } from "./project-json-store.js";

const db = new Low(new JSONFile("./src/models/json/portfolios.json"));
db.data = { portfolios: [] };

export const portfolioJsonStore = {
  async getAllPortfolios() {
    await db.read();
    return db.data.portfolios;
  },

  async addPortfolio(portfolio) {
    await db.read();
    portfolio._id = v4();
    db.data.portfolios.push(portfolio);
    await db.write();
    return portfolio;
  },

  async getPortfolioById(id) {
    await db.read();
    let list = db.data.portfolios.find((portfolio) => portfolio._id === id);
    if (list) {
      list.projects = await projectJsonStore.getProjectsByPortfolioId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserPortfolios(userid) {
    await db.read();
    return db.data.portfolios.filter((portfolio) => portfolio.userid === userid);
  },

  async deletePortfolioById(id) {
    await db.read();
    const index = db.data.portfolios.findIndex((portfolio) => portfolio._id === id);
    if (index !== -1) db.data.portfolios.splice(index, 1);
    await db.write();
  },

  async deleteAllPortfolios() {
    db.data.portfolios = [];
    await db.write();
  },
};