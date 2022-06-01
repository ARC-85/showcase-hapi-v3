import { db } from "../models/db.js";
import { ProjectSpec } from "../models/joi-schemas.js";
import { projectAnalytics } from "../utils/project-analytics.js";

export const projectController = {
  index: {
    handler: async function (request, h) {
      const project = await db.projectStore.getProjectById(request.params.id);
      const reviews = await db.reviewStore.getReviewsByProject(project._id);
      const viewData = {
        title: "Project",
        project: project,
        reviews: reviews,
      };
      return h.view("project-view", viewData);
    },
  },

  updateProject: {
    validate: {
      payload: ProjectSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
      const project = await db.projectStore.getProjectById(request.params.id);
      const viewData = {
          title: "Project",
          project: project,      
          errors: error.details
        };
        return h.view("project-view", viewData).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const project = await db.projectStore.getProjectById(request.params.id);
      const updatedProject = {
        projectTitle: request.payload.projectTitle,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
        styleDescription: request.payload.styleDescription,
        projectDescription: request.payload.projectDescription,
        areaSqM: Number(request.payload.areaSqM),
        priceEu: Number(request.payload.priceEu),
        image1: request.payload.image1,
        image2: request.payload.image2,
        image3: request.payload.image3,
        visability: request.payload.visability,
      };
      await db.projectStore.updateProject(project, updatedProject);
      return h.redirect(`/project/${project._id}`);
    },
  },

  updateProjectTitle: {
    handler: async function (request, h) {
      const project = await db.projectStore.getProjectById(request.params.id);
      const updatedProjectTitle = {
        projectTitle: request.payload.projectTitle,
      };
      await db.projectStore.updateProjectTitle(project, updatedProjectTitle);
      return h.redirect(`/project/${project._id}`);
    },
  },

  updateLatitude: {
    handler: async function (request, h) {
      const project = await db.projectStore.getProjectById(request.params.id);
      const updatedLatitude = {
        latitude: request.payload.latitude,
      };
      await db.projectStore.updateLatitude(project, updatedLatitude);
      return h.redirect(`/project/${project._id}`);
    },
  },

  updateLongitude: {
    handler: async function (request, h) {
      const project = await db.projectStore.getProjectById(request.params.id);
      const updatedLongitude = {
        longitude: request.payload.longitude,
      };
      await db.projectStore.updateLongitude(project, updatedLongitude);
      return h.redirect(`/project/${project._id}`);
    },
  },

  updateStyle: {
    handler: async function (request, h) {
      const project = await db.projectStore.getProjectById(request.params.id);
      const updatedStyle = {
        styleDescription: request.payload.styleDescription,
      };
      await db.projectStore.updateStyle(project, updatedStyle);
      return h.redirect(`/project/${project._id}`);
    },
  },

  updateDescription: {
    handler: async function (request, h) {
      const project = await db.projectStore.getProjectById(request.params.id);
      const updatedDescription = {
        projectDescription: request.payload.projectDescription,
      };
      await db.projectStore.updateDescription(project, updatedDescription);
      return h.redirect(`/project/${project._id}`);
    },
  },

  updateArea: {
    handler: async function (request, h) {
      const project = await db.projectStore.getProjectById(request.params.id);
      const updatedArea = {
        areaSqM: Number(request.payload.areaSqM),
      };
      await db.projectStore.updateArea(project, updatedArea);
      return h.redirect(`/project/${project._id}`);
    },
  },

  updatePrice: {
    handler: async function (request, h) {
      const project = await db.projectStore.getProjectById(request.params.id);
      const updatedPrice = {
        priceEu: Number(request.payload.priceEu),
      };
      await db.projectStore.updatePrice(project, updatedPrice);
      return h.redirect(`/project/${project._id}`);
    },
  },

  updateImage1: {
    handler: async function (request, h) {
      const project = await db.projectStore.getProjectById(request.params.id);
      const updatedImage1 = {
        image1: request.payload.image1,
      };
      await db.projectStore.updateImage1(project, updatedImage1);
      return h.redirect(`/project/${project._id}`);
    },
  },

  updateImage2: {
    handler: async function (request, h) {
      const project = await db.projectStore.getProjectById(request.params.id);
      const updatedImage2 = {
        image2: request.payload.image2,
      };
      await db.projectStore.updateImage2(project, updatedImage2);
      return h.redirect(`/project/${project._id}`);
    },
  },

  updateImage3: {
    handler: async function (request, h) {
      const project = await db.projectStore.getProjectById(request.params.id);
      const updatedImage3 = {
        image3: request.payload.image3,
      };
      await db.projectStore.updateImage3(project, updatedImage3);
      return h.redirect(`/project/${project._id}`);
    },
  },

  



};