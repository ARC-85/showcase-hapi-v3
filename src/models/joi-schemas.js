import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
  userType: Joi.string().example("Client").optional(),
  portfolios: Joi.array().optional().example([]),
  favourites: Joi.array().optional().example([]),
  reviews: Joi.array().optional().example([]),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const ProjectSpec = Joi.object()
  .keys({
    projectTitle: Joi.string().required().example("Cartoor Farmhouse"),
    latitude: Joi.string().required().example("53.02"),
    longitude: Joi.string().required().example("-9.38"),
    styleDescription: Joi.string().allow("").optional().example("Modern"),
    projectDescription: Joi.string().required().example("An old farmhouse extension"),
    areaSqM: Joi.number().allow("").optional().example("40"),
    priceEu: Joi.number().allow("").optional().example("80000"),
    image1: Joi.string().allow("").optional().example("https://res.cloudinary.com/whodunya/image/upload/v1648074501/showcase/house_icon_xtwll0.jpg"),
    image2: Joi.string().allow("").optional().example("https://res.cloudinary.com/whodunya/image/upload/v1648074501/showcase/house_icon_xtwll0.jpg"),
    image3: Joi.string().allow("").optional().example("https://res.cloudinary.com/whodunya/image/upload/v1648074501/showcase/house_icon_xtwll0.jpg"),
    portfolioid: IdSpec,
    portfolioCategory: Joi.string().optional().example("Extensions"),
    averageRating: Joi.number().allow("").optional().example("4"),
    reviews: Joi.array().optional().example([]),
    visability: Joi.string().required().example("Private"),
    vendorFirstName: Joi.string().optional().example("Bart"),
    vendorLastName: Joi.string().optional().example("Simpson"),
  })
  .label("Project");

export const ProjectSpecPlus = ProjectSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("ProjectPlus");

export const ProjectArraySpec = Joi.array().items(ProjectSpecPlus).label("ProjectArray");

export const PortfolioSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Budget"),
    portfolioCategory: Joi.string().required().example("Extensions"),
    userid: IdSpec,
    projects: ProjectArraySpec,
  })
  .label("Portfolio");

export const PortfolioSpecPlus = PortfolioSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PortfolioPlus");

export const PortfolioArraySpec = Joi.array().items(PortfolioSpecPlus).label("PortfolioArray");

export const FavouriteSpec = Joi.object()
  .keys({
    favouriteProjectTitle: Joi.string().required().example("Cartoor Farmhouse"),
    favouriteLatitude: Joi.string().required().example("53.02"),
    favouriteLongitude: Joi.string().required().example("-9.38"),
    favouriteStyleDescription: Joi.string().allow("").optional().example("Modern"),
    favouriteProjectDescription: Joi.string().required().example("An old farmhouse extension"),
    favouriteAreaSqM: Joi.number().allow("").optional().example("40"),
    favouritePriceEu: Joi.number().allow("").optional().example("80000"),
    favouriteImage1: Joi.string().allow("").optional().example("https://res.cloudinary.com/whodunya/image/upload/v1648074501/showcase/house_icon_xtwll0.jpg"),
    favouriteImage2: Joi.string().allow("").optional().example("https://res.cloudinary.com/whodunya/image/upload/v1648074501/showcase/house_icon_xtwll0.jpg"),
    favouriteImage3: Joi.string().allow("").optional().example("https://res.cloudinary.com/whodunya/image/upload/v1648074501/showcase/house_icon_xtwll0.jpg"),
    userid: IdSpec,
    projectid: IdSpec,
  })
  .label("Favourite");

export const FavouriteSpecPlus = FavouriteSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("FavouritePlus");

export const FavouriteArraySpec = Joi.array().items(FavouriteSpecPlus).label("FavouriteArray");

export const ReviewSpec = Joi.object()
  .keys({
    reviewDate: Joi.string().allow("").optional().example("Wed Jun 01 2022 12:47:51 GMT+0100 (Irish Standard Time)"),
    clientFirstName: Joi.string().allow("").optional().example("Homer"),
    vendorFirstName: Joi.string().allow("").optional().example("Bart"),
    reviewTitle: Joi.string().allow("").optional().example("Looks Great!"),
    rating: Joi.number().required().example("5"),
    comment: Joi.string().allow("").optional().example("How long did it take?"),
    reply: Joi.string().allow("").optional().example("About 4 months."),
    userid: IdSpec,
    projectid: IdSpec,
  })
  .label("Review");

export const ReviewSpecPlus = ReviewSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("ReviewPlus");

export const ReviewArraySpec = Joi.array().items(ReviewSpecPlus).label("ReviewArray");

export const NoticeSpec = Joi.object()
  .keys({
    noticeDate: Joi.string().allow("").optional().example("Wed Jun 01 2022 12:47:51 GMT+0100 (Irish Standard Time)"),
    clientFirstName: Joi.string().allow("").optional().example("Homer"),
    clientLastName: Joi.string().allow("").optional().example("Simpson"),
    noticeTitle: Joi.string().allow("").optional().example("Looking for architects"),
    noticeLatitude: Joi.string().required().example("53.02"),
    noticeLongitude: Joi.string().required().example("-9.38"),
    noticeCategory: Joi.string().required().example("Extensions"),
    vendorCategory: Joi.string().allow("").optional().example("Architects"),
    noticeStyle: Joi.string().allow("").optional().example("Modern"),
    request: Joi.string().required().example("We're looking for architects to apply an extension to our old farmhouse"),
    userid: IdSpec,
  })
  .label("Review");

export const NoticeSpecPlus = NoticeSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("NoticePlus");

export const NoticeArraySpec = Joi.array().items(NoticeSpecPlus).label("NoticeArray");

export const DiscussionSpec = Joi.object()
  .keys({
    discussionTitle: Joi.string().required().example("We'd like to help."),
    discussionDate: Joi.string().allow("").optional().example("Wed Jun 01 2022 12:47:51 GMT+0100 (Irish Standard Time)"),
    vendorFirstName: Joi.string().allow("").optional().example("Bart"),
    vendorLastName: Joi.string().allow("").optional().example("Simpson"),
    userid: IdSpec,
    noticeid: IdSpec,
  })
  .label("Discussion");

export const DiscussionSpecPlus = DiscussionSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("DiscussionPlus");

export const DiscussionArraySpec = Joi.array().items(DiscussionSpecPlus).label("DiscussionArray");

export const AnswerSpec = Joi.object()
  .keys({
    answerDate: Joi.string().allow("").optional().example("Wed Jun 01 2022 12:47:51 GMT+0100 (Irish Standard Time)"),
    userFirstName: Joi.string().allow("").optional().example("Bart"),
    userLastName: Joi.string().allow("").optional().example("Simpson"),
    answerContent: Joi.string().required().example("Thanks for posting, can you tell me more?"),
    userid: IdSpec,
    discussionid: IdSpec,
  })
  .label("Answer");

export const AnswerSpecPlus = AnswerSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("AnswerPlus");

export const AnswerArraySpec = Joi.array().items(AnswerSpecPlus).label("AnswerArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");

  export const AdminUserSpec = Joi.object()
  .keys({
    userEmail: Joi.string().email().example("homer@simpson.com").required(),
  })
  .label("AdminUserSpec");