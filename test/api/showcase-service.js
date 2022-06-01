import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const showcaseService = {
  showcaseUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.showcaseUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.showcaseUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.showcaseUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.showcaseUrl}/api/users`);
    return res.data;
  },

  async createPortfolio(portfolio) {
    const res = await axios.post(`${this.showcaseUrl}/api/portfolios`, portfolio);
    return res.data;
  },

  async deleteAllPortfolios() {
    const response = await axios.delete(`${this.showcaseUrl}/api/portfolios`);
    return response.data;
  },

  async deletePortfolio(id) {
    const response = await axios.delete(`${this.showcaseUrl}/api/portfolios/${id}`);
    return response;
  },

  async getAllPortfolios() {
    const res = await axios.get(`${this.showcaseUrl}/api/portfolios`);
    return res.data;
  },

  async getPortfolio(id) {
    const res = await axios.get(`${this.showcaseUrl}/api/portfolios/${id}`);
    return res.data;
  },

  async getAllProjects() {
    const res = await axios.get(`${this.showcaseUrl}/api/projects`);
    return res.data;
  },

  async createProject(id, project) {
    const res = await axios.post(`${this.showcaseUrl}/api/portfolios/${id}/projects`, project);
    return res.data;
  },

  async deleteAllProjects() {
    const res = await axios.delete(`${this.showcaseUrl}/api/projects`);
    return res.data;
  },

  async getProject(id) {
    const res = await axios.get(`${this.showcaseUrl}/api/projects/${id}`);
    return res.data;
  },

  async deleteProject(id) {
    const res = await axios.delete(`${this.showcaseUrl}/api/projects/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.showcaseUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common.Authorization = `Bearer ${  response.data.token}`;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  }
};
