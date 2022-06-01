export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "$2a$10$HnapEWWKQQ0.0Ft33nXxtuJ0fsmd9ywYswEzT4C.6Ul5y6cOU.UEa",
      userType: "Client"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "$2a$10$D3TWK8MSAh63Lhk4gIFSJ.ekM368J88qJRUYSbuBfzffex6B0dFwK",
      userType: "Client"
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "$2a$10$uqnPlgyVjBEOtcgMhn/WRO3FwW4T9gX36tTB4RqpGeB/LkCR3YQuO",
      userType: "Vendor"
    },
    admin: {
      firstName: "Admin",
      lastName: "Admin",
      email: "admin@email.ie",
      password: "$2a$10$6l8NZST9OmlNBakE/zIvzekX4aIXynvQud/0HT1zFdqAsMzaWJYba",
      userType: "Admin"
    }
  },
  portfolios: {
    _model: "Portfolio",
    budget: {
      title: "Budget",
      portfolioCategory: "Extensions",
      userid: "->users.bart"
    }
  },
  projects: {
    _model : "Project",
    project_1 : {
      projectTitle: "Cartoor Farmhouse",
      latitude: "53.3378",
      longitude: "-9.18",
      styleDescription: "Modern",
      projectDescription: "An old farmhouse in Moycullen area",
      areaSqM: 40,
      priceEu: 70000,
      image1: "https://res.cloudinary.com/whodunya/image/upload/v1648074501/showcase/house_icon_xtwll0.jpg",
      image2: "https://res.cloudinary.com/whodunya/image/upload/v1648074501/showcase/house_icon_xtwll0.jpg",
      image3: "https://res.cloudinary.com/whodunya/image/upload/v1648074501/showcase/house_icon_xtwll0.jpg",
      portfolioid: "->portfolios.budget",
      portfolioCategory: "Extensions",
      averageRating: "NaN",
      visability: "Public",
      vendorFirstName: "Bart",
      vendorLastName: "Simpson",
    },
  },
  favourites: {
    _model : "Favourite",
    favourite_1 : {
      favouriteProjectTitle: "Cartoor Farmhouse",
      favouriteLatitude: "53.3378",
      favouriteLongitude: "-9.18",
      favouriteStyleDescription: "Modern",
      favouriteProjectDescription: "An old farmhouse in Moycullen area",
      favouriteAreaSqM: 40,
      favouritePriceEu: 70000,
      favouriteImage1: "https://res.cloudinary.com/whodunya/image/upload/v1648074501/showcase/house_icon_xtwll0.jpg",
      favouriteImage2: "https://res.cloudinary.com/whodunya/image/upload/v1648074501/showcase/house_icon_xtwll0.jpg",
      favouriteImage3: "https://res.cloudinary.com/whodunya/image/upload/v1648074501/showcase/house_icon_xtwll0.jpg",
      projectid: "->projects.project_1",
      userid: "->users.homer",
    },
  },
  reviews: {
    _model : "Review",
    review_1 : {
      reviewDate: "Wed Jun 01 2022 12:47:51 GMT+0100 (Irish Standard Time)",
      clientFirstName: "Homer",
      vendorFirstName: "Bart",
      reviewTitle: "Looks Great!",
      rating: 4,
      comment: "How long did it take?",
      reply: "4 months.",
      projectid: "->projects.project_1",
      userid: "->users.homer"
    },
  },
  notices: {
    _model : "Notice",
    notice_1 : {
      noticeDate: "Wed Jun 01 2022 12:47:51 GMT+0100 (Irish Standard Time)",
      clientFirstName: "Homer",
      clientLastName: "Simpson",
      noticeTitle: "Architects wanted",
      noticeLatitude: "53.3378",
      noticeLongitude: "-9.18",
      vendorCategory: "Architect",
      noticeCategory: "Extensions",
      noticeStyle: "Modern",
      request: "We would like an architect to design our modern farmhouse extension",
      userid: "->users.homer"
    },
  },
  discussions: {
    _model : "Discussion",
    discussion_1 : {
      discussionTitle: "We think we can help!",
      vendorFirstName: "Bart",
      vendorLastName: "Simpson",
      discussionDate: "Wed Jun 01 2022 12:44:51 GMT+0100 (Irish Standard Time)",
      noticeid: "->notices.notice_1",
      userid: "->users.bart"
    },
  },
  answers: {
    _model : "Answer",
    answer_1 : {
      answerDate: "Wed Jun 01 2022 12:47:51 GMT+0100 (Irish Standard Time)",
      userFirstName: "Bart",
      userLastName: "Simpson",
      answerContent: "Thanks for posting, can you tell me more?",
      discussionid: "->discussions.discussion_1",
      userid: "->users.bart"
    },
    answer_2 : {
      answerDate: "Wed Jun 01 2022 12:47:51 GMT+0100 (Irish Standard Time)",
      userFirstName: "Homer",
      userLastName: "Simpson",
      answerContent: "We are after a good design within our budget.",
      discussionid: "->discussions.discussion_1",
      userid: "->users.homer"
    },
  },
};