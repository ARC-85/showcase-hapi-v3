import { db } from "../models/db.js";


export const clientDashboardController = {
  index: {
    handler: async function (request, h) {
      const projects = await db.projectStore.getAllVisableProjects();
      const viewData = {
        title: "Showcase Client Dashboard",
        projects: projects,
      };
      console.log(projects);
      return h.view("client-dashboard-view", viewData);
    },
  },

  categoryFilter: {
    handler: async function (request, h) {
      const portfolioCategory = await request.payload.portfolioCategory;
      const projects = await db.projectStore.getProjectsByCategory(portfolioCategory);
      const viewData = {
        title: "Showcase Client Dashboard",
        projects: projects,
      };
      return h.view("client-dashboard-view", viewData);
    },
  },

};