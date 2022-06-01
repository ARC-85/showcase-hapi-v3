import bcrypt from "bcrypt";   
import { db } from "../models/db.js";
import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";

const saltRounds = 10;

export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to Portfolio" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for Portfolio" });
    },
  },
  /* showClientSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("client-signup-view", { title: "Sign up for Portfolio client portal" });
    },
  }, */
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function(request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      user.password = await bcrypt.hash(user.password, saltRounds);
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to Portfolio" });
    },
  },
  showAdminLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("admin-login-view", { title: "Admin Login to Portfolio" });
    },
  },
  showClientLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("client-login-view", { title: "Client Login to Portfolio" });
    },
  },
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      const passwordsMatch = await bcrypt.compare(password, user.password);  
      if (!user || !passwordsMatch || user.userType !== "Vendor") {                                    
        console.log("wrong");
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      console.log("normal signin");
      return h.redirect("/dashboard");
    },
  },
  adminLogin: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("admin-login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      const passwordsMatch = await bcrypt.compare(password, user.password);  
      if (!user || !passwordsMatch || user.userType !== "Admin") {
        console.log("wrong");
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      console.log("admin signin");
      return h.redirect("/admindashboard");
    },
  },
  clientLogin: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("client-login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      const passwordsMatch = await bcrypt.compare(password, user.password);  
      if (!user || !passwordsMatch || user.userType !== "Client") {
        console.log("wrong");
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      console.log("client signin");
      return h.redirect("/clientdashboard");
    },
  },
  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },
  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { valid: false };
    }
    return { valid: true, credentials: user };
  },
  showProfile: {
    handler: async function (request, h) {
      const user = request.auth.credentials;
      const viewData = {
        title: "User profile",
        user: user, 
      }
      return h.view("profile-view", viewData)
    },
  },
  showClientProfile: {
    handler: async function (request, h) {
      const user = request.auth.credentials;
      const viewData = {
        title: "Client user profile",
        user: user, 
      }
      return h.view("client-profile-view", viewData)
    },
  },
  updateProfile: {
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: async function(request, h, error) {
        const user = request.auth.credentials;
        const viewData = {
          title: "User profile",
          user: user, 
          errors: error.details
        }
        return h.view("profile-view", viewData).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.auth.credentials;
      const cleanPassword = request.payload.password;
      const encryptedPassword = await bcrypt.hash(cleanPassword, saltRounds);
      const updatedUser = {
        firstName: request.payload.firstName, 
        lastName: request.payload.lastName,
        email: request.payload.email,
        password: encryptedPassword,
      }
      await db.userStore.updateUser(user, updatedUser);
      return h.redirect("/");
    },
  },
};