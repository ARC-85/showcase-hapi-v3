import { User } from "./user.js";
import { portfolioMongoStore } from "./portfolio-mongo-store.js";
import { favouriteMongoStore } from "./favourite-mongo-store.js";

export const userMongoStore = {
  async getAllUsers() {
    const users = await User.find().lean();
    return users;
  },

  async getUserById(id) {
    if (id) {
      const user = await User.findOne({ _id: id }).lean();
      if (user) {
        user.portfolios = await portfolioMongoStore.getUserPortfolios(user._id);
      } 
      return user;
    }
    return null;
  },

  async addUser(user) {
    const newUser = new User(user);
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  async getUserByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
    if (user) {
      user.portfolios = await portfolioMongoStore.getUserPortfolios(user._id);
    } 
    return user;
  },

  async deleteUserById(id) {
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await User.deleteMany({});
  },

  async updateUser(user, updatedUser) {
    user.firstName = updatedUser.firstName;
    user.lastName = updatedUser.lastName;
    user.email = updatedUser.email;
    user.password = updatedUser.password;
    user.userType = updatedUser.userType;
    const query = { _id: user._id };
    const updatedValues = { $set: {firstName: user.firstName, lastName: user.lastName, email: user.email, password: user.password, userType: user.userType} };
    await User.updateOne(query, updatedValues);
  },
};