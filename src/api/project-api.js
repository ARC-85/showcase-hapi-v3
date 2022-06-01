import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, ProjectSpec, ProjectSpecPlus, ProjectArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const projectApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const projects = await db.projectStore.getAllProjects();
        return projects;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: ProjectArraySpec, failAction: validationError },
    description: "Get all projectApi",
    notes: "Returns all projectApi",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const project = await db.projectStore.getProjectById(request.params.id);
        if (!project) {
          return Boom.notFound("No project with this id");
        }
        return project;
      } catch (err) {
        return Boom.serverUnavailable("No project with this id");
      }
    },
    tags: ["api"],
    description: "Find a Project",
    notes: "Returns a project",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: ProjectSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const project = await db.projectStore.addProject(request.params.id, request.payload);
        if (project) {
          return h.response(project).code(201);
        }
        return Boom.badImplementation("error creating project");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a project",
    notes: "Returns the newly created project",
    validate: { payload: ProjectSpec },
    response: { schema: ProjectSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.projectStore.deleteAllProjects();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all projectApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const project = await db.projectStore.getProjectById(request.params.id);
        if (!project) {
          return Boom.notFound("No Project with this id");
        }
        await db.projectStore.deleteProject(project._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Project with this id");
      }
    },
    tags: ["api"],
    description: "Delete a project",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};