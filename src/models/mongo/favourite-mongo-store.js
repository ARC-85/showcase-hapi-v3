import { Favourite } from "./favourite.js";

export const favouriteMongoStore = {
  async getAllFavourites() {
    const favourites = await Favourite.find().lean();
    return favourites;
  },

  async getFavouriteById(id) {
    if (id) {
      const favourite = await Favourite.findOne({ _id: id }).lean();
      return favourite;
    }
    return null;
  },

  async addFavourite(favourite) {
    const newFavourite = new Favourite(favourite);
    const favouriteObj = await newFavourite.save();
    return this.getFavouriteById(favouriteObj._id);
  },

  async getClientUserFavourites(id) {
    const favourite = await Favourite.find({ userid: id }).lean();
    return favourite;
  },

  async deleteFavouriteById(id) {
    try {
      await Favourite.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllFavourites() {
    await Favourite.deleteMany({});
  },

  async getClientUserProjectFavourite(id, projectid) {
    const favourite = await Favourite.find({ userid: id, projectid: projectid }).lean();
    return favourite;
  },
};