import { db } from "../models/db.js";
import { PortfolioSpec } from "../models/joi-schemas.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const portfolios = await db.portfolioStore.getUserPortfolios(loggedInUser._id);
      const viewData = {
        title: "Showcase Dashboard",
        user: loggedInUser,
        portfolios: portfolios,
      };
      console.log("this is vendor portfolios");
      console.log(portfolios);
      return h.view("dashboard-view", viewData);
    },
  },

  addPortfolio: {
    validate: {
      payload: PortfolioSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Portfolio error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPortfolio = {
        userid: loggedInUser._id,
        title: request.payload.title,
        portfolioCategory: request.payload.portfolioCategory,
      };
      await db.portfolioStore.addPortfolio(newPortfolio);
      return h.redirect("/dashboard");
    },
  },
  
  deletePortfolio: {
    handler: async function (request, h) {
      const portfolio = await db.portfolioStore.getPortfolioById(request.params.id);
      await db.portfolioStore.deletePortfolioById(portfolio._id);
      return h.redirect("/dashboard");
    },
  },
};