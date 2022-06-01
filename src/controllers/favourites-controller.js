import { db } from "../models/db.js";

export const favouritesController = {
  index: {
    handler: async function (request, h) {
      const loggedInClientUser = request.auth.credentials;
      const favourites = await db.favouriteStore.getClientUserFavourites(loggedInClientUser._id);
      const viewData = {
        title: "Showcase Client Favourites",
        clientUser: loggedInClientUser,
        favourites: favourites,
      };
      console.log("this is user favourites");
      console.log(favourites);
      return h.view("favourites-view", viewData);
    },
  },

  deleteFavourite: {
    handler: async function (request, h) {
      const favourite = await db.favouriteStore.getFavouriteById(request.params.id);
      await db.favouriteStore.deleteFavouriteById(favourite._id);
      return h.redirect("/favourites");
    },
  },
};