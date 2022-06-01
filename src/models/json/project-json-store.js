import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/projects.json"));
db.data = { projects: [] };

export const projectJsonStore = {
  async getAllProjects() {
    await db.read();
    return db.data.projects;
  },

  async addProject(portfolioId, project) {
    await db.read();
    project._id = v4();
    project.portfolioid = portfolioId;
    db.data.projects.push(project);
    await db.write();
    return project;
  },

  async getProjectsByPortfolioId(id) {
    await db.read();
    return db.data.projects.filter((project) => project.portfolioid === id);
  },

  async getProjectById(id) {
    await db.read();
    return db.data.projects.find((project) => project._id === id);
  },

  async deleteProject(id) {
    await db.read();
    const index = db.data.projects.findIndex((project) => project._id === id);
    db.data.projects.splice(index, 1);
    await db.write();
  },

  async deleteAllProjects() {
    db.data.projects = [];
    await db.write();
  },

  async updateProject(project, updatedProject) {
    project.projectTitle = updatedProject.projectTitle;
    project.latitude = updatedProject.latitude;
    project.longitude = updatedProject.longitude;
    project.styleDescription = updatedProject.styleDescription;
    project.projectDescription = updatedProject.projectDescription;
    project.areaSqM = updatedProject.areaSqM;
    project.priceEu = updatedProject.priceEu;
    project.image1 = updatedProject.image1;
    project.image2 = updatedProject.image2;
    project.image3 = updatedProject.image3;
    await db.write();
  },

  async updateProjectTitle(project, updatedProjectTitle) {
    project.projectTitle = updatedProjectTitle.projectTitle;
    await db.write();
  },

  async updateLatitude(project, updatedLatitude) {
    project.latitude = updatedLatitude.latitude;
    await db.write();
  },

  async updateLongitude(project, updatedLongitude) {
    project.longitude = updatedLongitude.longitude;
    await db.write();
  },

  async updateStyle(project, updatedStyle) {
    project.styleDescription = updatedStyle.styleDescription;
    await db.write();
  },

  async updateDescription(project, updatedDescription) {
    project.projectDescription = updatedDescription.projectDescription;
    await db.write();
  },

  async updateArea(project, updatedArea) {
    project.areaSqM = updatedArea.areaSqM;
    await db.write();
  },

  async updatePrice(project, updatedPrice) {
    project.priceEu = updatedPrice.priceEu;
    await db.write();
  },

  async updateImage1(project, updatedImage1) {
    project.image1 = updatedImage1.image1;
    await db.write();
  },

  async updateImage2(project, updatedImage2) {
    project.image2 = updatedImage2.image2;
    await db.write();
  },

  async updateImage3(project, updatedImage3) {
    project.image3 = updatedImage3.image3;
    await db.write();
  },
};