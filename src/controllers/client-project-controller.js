import { db } from "../models/db.js";
import { ReviewSpec } from "../models/joi-schemas.js";
import { projectAnalytics } from "../utils/project-analytics.js";

export const clientProjectController = {
  index: {
    handler: async function (request, h) {
      const loggedInClientUser = request.auth.credentials;
      const project = await db.projectStore.getProjectById(request.params.id);
      const reviews = await db.reviewStore.getReviewsByProject(project._id);
      const averageRating = await projectAnalytics.getAverageRating(project._id);
      const clientReviews = await db.reviewStore.getClientUserReviews(loggedInClientUser._id);
      const clientProjectReviews = await db.reviewStore.getClientUserProjectReviews(loggedInClientUser._id, project._id);
      const clientProjectFavourite = await db.favouriteStore.getClientUserProjectFavourite(loggedInClientUser._id, project._id);
      const viewData = {
        title: "Project",
        project: project,
        reviews: reviews,
        clientUser: loggedInClientUser,
        averageRating: averageRating,
        clientReviews: clientReviews,
        clientProjectReviews: clientProjectReviews,
        clientProjectFavourite: clientProjectFavourite,
      };
      await db.projectStore.updateAverageRating(project, averageRating);
      console.log(project);
      return h.view("client-project-view", viewData);
    },
  },




  addFavourite: {
    /* validate: {
      payload: FavouriteSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("client-dashboard-view", { title: "Add Favourite error", errors: error.details }).takeover().code(400);
      },
    }, */
    handler: async function (request, h) {
      const loggedInClientUser = request.auth.credentials;
      const project = await db.projectStore.getProjectById(request.params.id);
      const newFavourite = {
        userid: loggedInClientUser._id,
        projectid: project._id,
        favouriteProjectTitle: project.projectTitle,
        favouriteLatitude: project.latitude,
        favouriteLongitude: project.longitude,
        favouriteStyleDescription: project.styleDescription,
        favouriteProjectDescription: project.projectDescription,
        favouriteAreaSqM: project.areaSqM,
        favouritePriceEu: project.priceEu,
        favouriteImage1: project.image1,
        favouriteImage2: project.image2,
        favouriteImage3: project.image3,
      };
      await db.favouriteStore.addFavourite(newFavourite);
      return h.redirect("/favourites");
    },
  },

  addReview: {
      validate: {
      payload: ReviewSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("client-dashboard-view", { title: "Add Review error", errors: error.details }).takeover().code(400);
      },
    }, 
    handler: async function (request, h) {
      const loggedInClientUser = request.auth.credentials;
      const project = await db.projectStore.getProjectById(request.params.id);
      const newReview = {
        userid: loggedInClientUser._id,
        projectid: project._id,
        reviewDate: new Date(),
        clientFirstName: loggedInClientUser.firstName,
        reviewTitle: request.payload.reviewTitle,
        rating: Number(request.payload.rating), 
        comment: request.payload.comment,
        reply: request.payload.reply,
      };
      await db.reviewStore.addReview(newReview);
      console.log(newReview);
      return h.redirect(`/clientproject/${project._id}`);
    },
  },

};