import { db } from "../models/db.js";
import { Portfolio } from "../models/mongo/portfolio.js";

export const adminAnalytics = {

    async getUserPortfolios(id) {
        let userPortfolios = 0;
        const portfolios = await db.portfolioStore.getUserPortfolios(id);
        userPortfolios = portfolios.length;
        return userPortfolios;
      },

    async getUserProjects(userPortfolios) {
        let userProjects = 0;
        for (let i = 0; i < userPortfolios.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const projects = await db.projectStore.getProjectsByPortfolioId(userPortfolios[i]._id);
            userProjects += projects.length
        }
        return userProjects
    },

    async getTotalPortfolios() {
        let totalPortfolios = 0;
        const users = await db.userStore.getAllUsers();
        for (let i = 0; i < users.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const userPortfolios = await db.portfolioStore.getUserPortfolios(users[i]._id);
            totalPortfolios += userPortfolios.length;
        }
        return totalPortfolios
    },

    async getMaximumUserPortfolios() {
        let maxPortfolios = 0;
        let maxUser = null;
        const users = await db.userStore.getAllUsers();
        for (let i = 0; i < users.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const userPortfolios = await db.portfolioStore.getUserPortfolios(users[i]._id);
            if (userPortfolios.length > maxPortfolios) {
                maxPortfolios = userPortfolios.length;
                maxUser = users[i].email;
            }
        }
        return maxPortfolios
    },

    async getMaximumPortfolioUsers() {
        let maxPortfolios = 0;
        let maxUser = null;
        const users = await db.userStore.getAllUsers();
        const portfolios = await db.portfolioStore.getAllPortfolios();
        for (let i = 0; i < users.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const userPortfolios = await db.portfolioStore.getUserPortfolios(users[i]._id);
            if (userPortfolios.length > maxPortfolios) {
                maxPortfolios = userPortfolios.length;
                maxUser = users[i].email;
            }
        }
        return maxUser
    },

    async getTotalProjects() {
        let totalProjects = 0;
        const users = await db.userStore.getAllUsers();
        for (let i = 0; i < users.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const userPortfolios = await db.portfolioStore.getUserPortfolios(users[i]._id);
            for (let x = 0; x < userPortfolios.length; x += 1) {
                // eslint-disable-next-line no-await-in-loop
                const userProjects = await db.projectStore.getProjectsByPortfolioId(userPortfolios[x]._id);
                totalProjects += userProjects.length;
            }
        }
        return totalProjects
    },

    async getMaximumUserProjects() {
        let maxProjects = 0;
        let maxProjectUser = null;
        const users = await db.userStore.getAllUsers();
        const portfolios = await db.portfolioStore.getAllPortfolios();
        for (let i = 0; i < users.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const userPortfolios = await db.portfolioStore.getUserPortfolios(users[i]._id);
            for (let x = 0; x < userPortfolios.length; x += 1) {
                // eslint-disable-next-line no-await-in-loop
                const userProjects = await db.projectStore.getProjectsByPortfolioId(userPortfolios[x]._id);
                if (userProjects.length > maxProjects) {
                    maxProjects = userProjects.length;
                    maxProjectUser = users[i].email;
                }
            }
        }
        return maxProjects
    },

    async getMaximumProjectUsers() {
        let maxProjects = 0;
        let maxProjectUser = null;
        const users = await db.userStore.getAllUsers();
        const portfolios = await db.portfolioStore.getAllPortfolios();
        for (let i = 0; i < users.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const userPortfolios = await db.portfolioStore.getUserPortfolios(users[i]._id);
            for (let x = 0; x < userPortfolios.length; x += 1) {
                // eslint-disable-next-line no-await-in-loop
                const userProjects = await db.projectStore.getProjectsByPortfolioId(userPortfolios[x]._id);
                if (userProjects.length > maxProjects) {
                    maxProjects = userProjects.length;
                    maxProjectUser = users[i].email;
                }
            }
        }
        return maxProjectUser
    },

    async getMostExpensiveProject() {
        let maxCost = 0;
        let maxCostUser = null;
        const users = await db.userStore.getAllUsers();
        for (let i = 0; i < users.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const userPortfolios = await db.portfolioStore.getUserPortfolios(users[i]._id);
            for (let x = 0; x < userPortfolios.length; x += 1) {
                // eslint-disable-next-line no-await-in-loop
                const userProjects = await db.projectStore.getProjectsByPortfolioId(userPortfolios[x]._id);
                for (let y = 0; y < userProjects.length; y += 1) {
                    console.log(userProjects[y]._id);
                    // eslint-disable-next-line no-await-in-loop
                    // const userProject = await db.projectStore.getProjectById(userProjects[y].id);
                     if (userProjects[y].priceEu > maxCost) {
                        maxCost = userProjects[y].priceEu;
                        maxCostUser = users[i].email;
                    } 
                }
            }
        }
        return maxCost
    },

    async getMostExpensiveUser() {
        let maxCost = 0;
        let maxCostUser = null;
        const users = await db.userStore.getAllUsers();
        for (let i = 0; i < users.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const userPortfolios = await db.portfolioStore.getUserPortfolios(users[i]._id);
            for (let x = 0; x < userPortfolios.length; x += 1) {
                // eslint-disable-next-line no-await-in-loop
                const userProjects = await db.projectStore.getProjectsByPortfolioId(userPortfolios[x]._id);
                for (let y = 0; y < userProjects.length; y += 1) {
                    console.log(userProjects[y]._id);
                    // eslint-disable-next-line no-await-in-loop
                    // const userProject = await db.projectStore.getProjectById(userProjects[y].id);
                     if (userProjects[y].priceEu > maxCost) {
                        maxCost = userProjects[y].priceEu;
                        maxCostUser = users[i].email;
                    } 
                }
            }
        }
        return maxCostUser
    },

    async getLargestAreaProject() {
        let maxArea = 0;
        let maxAreaUser = null;
        const users = await db.userStore.getAllUsers();
        for (let i = 0; i < users.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const userPortfolios = await db.portfolioStore.getUserPortfolios(users[i]._id);
            for (let x = 0; x < userPortfolios.length; x += 1) {
                // eslint-disable-next-line no-await-in-loop
                const userProjects = await db.projectStore.getProjectsByPortfolioId(userPortfolios[x]._id);
                for (let y = 0; y < userProjects.length; y += 1) {
                    // eslint-disable-next-line no-await-in-loop
                     if (userProjects[y].areaSqM > maxArea) {
                        maxArea = userProjects[y].areaSqM;
                        maxAreaUser = users[i].email;
                    } 
                }
            }
        }
        return maxArea
    },

    async getLargestAreaUser() {
        let maxArea = 0;
        let maxAreaUser = null;
        const users = await db.userStore.getAllUsers();
        for (let i = 0; i < users.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const userPortfolios = await db.portfolioStore.getUserPortfolios(users[i]._id);
            for (let x = 0; x < userPortfolios.length; x += 1) {
                // eslint-disable-next-line no-await-in-loop
                const userProjects = await db.projectStore.getProjectsByPortfolioId(userPortfolios[x]._id);
                for (let y = 0; y < userProjects.length; y += 1) {
                    // eslint-disable-next-line no-await-in-loop
                     if (userProjects[y].areaSqM > maxArea) {
                        maxArea = userProjects[y].areaSqM;
                        maxAreaUser = users[i].email;
                    } 
                }
            }
        }
        return maxAreaUser
    },



  };