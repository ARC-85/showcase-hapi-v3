import { v4 } from "uuid";

let projects = [];

export const projectMemStore = {
  async getAllProjects() {
    return projects;
  },

  async addProject(portfolioId, project) {
    project._id = v4();
    project.portfolioid = portfolioId;
    projects.push(project);
    return project;
  },

  async getProjectsByPortfolioId(id) {
    return projects.filter((project) => project.portfolioid === id);
  },

  async getProjectById(id) {
    return projects.find((project) => project._id === id);
  },

  async getPortfolioProjects(portfolioId) {
    return projects.filter((project) => project.portfolioid === portfolioId);
  },

  async deleteProject(id) {
    const index = projects.findIndex((project) => project._id === id);
    projects.splice(index, 1);
  },

  async deleteAllProjects() {
    projects = [];
  },

  async updateProject(project, updatedProject) {
    project.title = updatedProject.title;
    project.artist = updatedProject.artist;
    project.duration = updatedProject.duration;
  },
};
