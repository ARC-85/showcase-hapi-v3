import { Project } from "./project.js";
import { Portfolio } from "./portfolio.js";

export const projectMongoStore = {
  async getAllProjects() {
    const projects = await Project.find().lean();
    return projects;
  },

  async addProject(portfolioId, project) {
    project.portfolioid = portfolioId;
    const newProject = new Project(project);
    const projectObj = await newProject.save();
    return this.getProjectById(projectObj._id);
  },

  async getProjectsByPortfolioId(id) {
    const projects = await Project.find({ portfolioid: id }).lean();
    return projects;
  },

  async getProjectById(id) {
    if (id) {
      const project = await Project.findOne({ _id: id }).lean();
      return project;
    }
    return null;
  },

  async deleteProject(id) {
    try {
      await Project.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllProjects() {
    await Project.deleteMany({});
  },

  async getAllVisableProjects() {
    const projects = await Project.find({ visability: "Public" }).lean();
    return projects;
  },

  async getProjectsByCategory(category) {
    const projects = await Project.find({ portfolioCategory: category, visability: "Public" }).lean();
    return projects;
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
    project.visability = updatedProject.visability;
    console.log(project._id)
    const query = { _id: project._id };
    const updatedValues = { $set: {projectTitle: project.projectTitle, latitude: project.latitude, longitude: project.longitude, styleDescription: project.styleDescription, projectDescription: project.projectDescription, areaSqM: project.areaSqM, priceEu: project.priceEu, image1: project.image1, image2: project.image2, image3: project.image3, visability: project.visability} };
    await Project.updateOne(query, updatedValues);
  },

  async updateProjectTitle(project, updatedProjectTitle) {
    project.projectTitle = updatedProjectTitle.projectTitle;
    const query = { _id: project._id };
    const updatedValues = { $set: {projectTitle: project.projectTitle} };
    await Project.updateOne(query, updatedValues);
  },

  async updateAverageRating(project, updatedAverageRating) {
    project.averageRating = updatedAverageRating;
    const query = { _id: project._id };
    const updatedValues = { $set: {averageRating: project.averageRating} };
    await Project.updateOne(query, updatedValues);
  },

  async updateLatitude(project, updatedLatitude) {
    project.latitude = updatedLatitude.latitude;
    const query = { _id: project._id };
    const updatedValues = { $set: {latitude: project.latitude} };
    await Project.updateOne(query, updatedValues);
  },

  async updateLongitude(project, updatedLongitude) {
    project.longitude = updatedLongitude.longitude;
    const query = { _id: project._id };
    const updatedValues = { $set: {longitude: project.longitude} };
    await Project.updateOne(query, updatedValues);
  },

  async updateStyle(project, updatedStyle) {
    project.styleDescription = updatedStyle.styleDescription;
    const query = { _id: project._id };
    const updatedValues = { $set: {styleDescription: project.styleDescription} };
    await Project.updateOne(query, updatedValues);
  },

  async updateDescription(project, updatedDescription) {
    project.projectDescription = updatedDescription.projectDescription;
    const query = { _id: project._id };
    const updatedValues = { $set: {projectDescription: project.projectDescription} };
    await Project.updateOne(query, updatedValues);
  },

  async updateArea(project, updatedArea) {
    project.areaSqM = updatedArea.areaSqM;
    const query = { _id: project._id };
    const updatedValues = { $set: {areaSqM: project.areaSqM} };
    await Project.updateOne(query, updatedValues);
  },

  async updatePrice(project, updatedPrice) {
    project.priceEu = updatedPrice.priceEu;
    const query = { _id: project._id };
    const updatedValues = { $set: {priceEu: project.priceEu} };
    await Project.updateOne(query, updatedValues);
  },

  async updateImage1(project, updatedImage1) {
    project.image1 = updatedImage1.image1;
    const query = { _id: project._id };
    const updatedValues = { $set: {image1: project.image1} };
    await Project.updateOne(query, updatedValues);
  },

  async updateImage2(project, updatedImage2) {
    project.image2 = updatedImage2.image2;
    const query = { _id: project._id };
    const updatedValues = { $set: {image2: project.image2} };
    await Project.updateOne(query, updatedValues);
  },

  async updateImage3(project, updatedImage3) {
    project.image3 = updatedImage3.image3;
    const query = { _id: project._id };
    const updatedValues = { $set: {image3: project.image3} };
    await Project.updateOne(query, updatedValues);
  },
};
