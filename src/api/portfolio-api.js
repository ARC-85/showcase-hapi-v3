import Boom from "@hapi/boom";
import { IdSpec, PortfolioArraySpec, PortfolioSpec, PortfolioSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const portfolioApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const portfolios = await db.portfolioStore.getAllPortfolios();
        return portfolios;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: PortfolioArraySpec, failAction: validationError },
    description: "Get all portfolios",
    notes: "Returns all portfolios",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const portfolio = await db.portfolioStore.getPortfolioById(request.params.id);
        if (!portfolio) {
          return Boom.notFound("No Portfolio with this id");
        }
        return portfolio;
      } catch (err) {
        return Boom.serverUnavailable("No Portfolio with this id");
      }
    },
    tags: ["api"],
    description: "Find a Portfolio",
    notes: "Returns a portfolio",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PortfolioSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const portfolio = request.payload;
        const newPortfolio = await db.portfolioStore.addPortfolio(portfolio);
        if (newPortfolio) {
          return h.response(newPortfolio).code(201);
        }
        return Boom.badImplementation("error creating portfolio");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Portfolio",
    notes: "Returns the newly created portfolio",
    validate: { payload: PortfolioSpec, failAction: validationError },
    response: { schema: PortfolioSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const portfolio = await db.portfolioStore.getPortfolioById(request.params.id);
        if (!portfolio) {
          return Boom.notFound("No Portfolio with this id");
        }
        await db.portfolioStore.deletePortfolioById(portfolio._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Portfolio with this id");
      }
    },
    tags: ["api"],
    description: "Delete a portfolio",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.portfolioStore.deleteAllPortfolios();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all PortfolioApi",
  },
};