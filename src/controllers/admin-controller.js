import { db } from "../models/db.js";
import { adminAnalytics } from "../utils/user-analytics.js";
import { UserSpec, UserCredentialsSpec, ProjectSpec, PortfolioSpec, AdminUserSpec } from "../models/joi-schemas.js";

export const adminController = {
    index: {
      handler: async function (request, h) {
        const loggedInUser = request.auth.credentials;
        const users = await db.userStore.getAllUsers();
        const totalPortfolios = await adminAnalytics.getTotalPortfolios();
        const totalProjects = await adminAnalytics.getTotalProjects();
        const maxPortfolios = await adminAnalytics.getMaximumUserPortfolios();
        const maxUser = await adminAnalytics.getMaximumPortfolioUsers();
        const maxProjects = await adminAnalytics.getMaximumUserProjects();
        const maxProjectUser = await adminAnalytics.getMaximumProjectUsers();
        const maxCost = await adminAnalytics.getMostExpensiveProject();
        const maxCostUser = await adminAnalytics.getMostExpensiveUser();
        const maxArea = await adminAnalytics.getLargestAreaProject();
        const maxAreaUser = await adminAnalytics.getLargestAreaUser();
        const viewData = {
          title: "Showcase Admin Dashboard",
          user: loggedInUser,
          users: users,
          totalPortfolios: totalPortfolios,
          totalProjects: totalProjects,
          maxPortfolios: maxPortfolios,
          maxUser: maxUser,
          maxProjects: maxProjects,
          maxProjectUser: maxProjectUser,
          maxCost: maxCost,
          maxCostUser: maxCostUser,
          maxArea: maxArea, 
          maxAreaUser: maxAreaUser,
        };
        return h.view("admin-dashboard-view", viewData);
      },
    },

    deleteUser: {
        handler: async function (request, h) {
          const user = await db.userStore.getUserById(request.params.id);
          await db.userStore.deleteUserById(user._id);
          return h.redirect("/admindashboard");
        },
      },
    
    userStats: {
        validate: {
            payload: AdminUserSpec,
            options: { abortEarly: false },
            failAction: async function (request, h, error) {
                const loggedInUser = request.auth.credentials;
                const users = await db.userStore.getAllUsers();
                const portfolios = await db.portfolioStore.getAllPortfolios();
                const projects = await db.projectStore.getAllProjects();
                const viewData = {
                  title: "Showcase Admin Dashboard",
                  user: loggedInUser,
                  users: users,
                  portfolios: portfolios,
                  projects: projects,
                  errors: error.details,
                };
              return h.view("admin-dashboard-view", viewData).takeover().code(400);
            },
          },
        handler: async function (request, h) {
            try {
                
          const userEmail = await request.payload.userEmail;  
          const showcaseUser = await db.userStore.getUserByEmail(userEmail);
          const userPortfolios = await db.portfolioStore.getUserPortfolios(showcaseUser._id);
          const loggedInUser = request.auth.credentials;
          const users = await db.userStore.getAllUsers();
          const totalPortfolios = await adminAnalytics.getTotalPortfolios();
          const totalProjects = await adminAnalytics.getTotalProjects();
          const userProjects = await adminAnalytics.getUserProjects(userPortfolios);
          const maxPortfolios = await adminAnalytics.getMaximumUserPortfolios();
          const maxUser = await adminAnalytics.getMaximumPortfolioUsers();
          const maxProjects = await adminAnalytics.getMaximumUserProjects();
          const maxProjectUser = await adminAnalytics.getMaximumProjectUsers();
          const maxCost = await adminAnalytics.getMostExpensiveProject();
          const maxCostUser = await adminAnalytics.getMostExpensiveUser();
          const maxArea = await adminAnalytics.getLargestAreaProject();
          const maxAreaUser = await adminAnalytics.getLargestAreaUser();
          const viewData = {
            title: "Showcase Admin Dashboard",
            user: loggedInUser,
            users: users,
            totalPortfolios: totalPortfolios,
            totalProjects: totalProjects,
            userEmail: userEmail,
            userPortfolios: userPortfolios,
            userProjects: userProjects,
            maxPortfolios: maxPortfolios,
            maxUser: maxUser,
            maxProjects: maxProjects,
            maxProjectUser: maxProjectUser,
            maxCost: maxCost,
            maxCostUser: maxCostUser,
            maxArea: maxArea, 
            maxAreaUser: maxAreaUser,
          };
          console.log(userPortfolios);
          console.log(userProjects);
          console.log(maxPortfolios);
          console.log(maxUser);
          return h.view("admin-dashboard-view", viewData);
            } catch (error) {
                console.log("bad id");
                return h.redirect("/admindashboard");
              }
        },
      },  
  };