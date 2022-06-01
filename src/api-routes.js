import { userApi } from "./api/user-api.js";
import { portfolioApi } from "./api/portfolio-api.js";
import { projectApi } from "./api/project-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/portfolios", config: portfolioApi.create },
  { method: "DELETE", path: "/api/portfolios", config: portfolioApi.deleteAll },
  { method: "GET", path: "/api/portfolios", config: portfolioApi.find },
  { method: "GET", path: "/api/portfolios/{id}", config: portfolioApi.findOne },
  { method: "DELETE", path: "/api/portfolios/{id}", config: portfolioApi.deleteOne },
  { method: "GET", path: "/api/projects", config: projectApi.find },
  { method: "GET", path: "/api/projects/{id}", config: projectApi.findOne },
  { method: "POST", path: "/api/portfolios/{id}/projects", config: projectApi.create },
  { method: "DELETE", path: "/api/projects", config: projectApi.deleteAll },
  { method: "DELETE", path: "/api/projects/{id}", config: projectApi.deleteOne },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
];