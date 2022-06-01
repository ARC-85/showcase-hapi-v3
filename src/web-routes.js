import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { clientDashboardController } from "./controllers/client-dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { clientAboutController } from "./controllers/client-about-controller.js";
import { portfolioController } from "./controllers/portfolio-controller.js";
import { projectController } from "./controllers/project-controller.js";
import { clientProjectController } from "./controllers/client-project-controller.js";
import { favouritesController } from "./controllers/favourites-controller.js";
import { adminController } from "./controllers/admin-controller.js";
import { reviewsController } from "./controllers/reviews-controller.js";
import { projectReviewsController } from "./controllers/project-reviews-controller.js";
import { noticeController } from "./controllers/notice-controller.js";
import { noticeUpdateController } from "./controllers/notice-update-controller.js";
import { vendorNoticeController } from "./controllers/vendor-notice-controller.js";
import { vendorNoticeDetailsController } from "./controllers/vendor-notice-details-controller.js";
import { clientAnswerController } from "./controllers/client-answer-controller.js";
import { vendorAnswerController } from "./controllers/vendor-answer-controller.js";
import { vendorDiscussionController } from "./controllers/vendor-discussion-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  // { method: "GET", path: "/clientsignup", config: accountsController.showClientSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/clientlogin", config: accountsController.showClientLogin },
  { method: "GET", path: "/adminlogin", config: accountsController.showAdminLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  // { method: "POST", path: "/clientregister", config: accountsController.clientSignup },
  { method: "POST", path: "/authenticate", config: accountsController.login },
  { method: "POST", path: "/clientauthenticate", config: accountsController.clientLogin },
  { method: "POST", path: "/adminauthenticate", config: accountsController.adminLogin },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "GET", path: "/clientdashboard", config: clientDashboardController.index },
  { method: "POST", path: "/dashboard/addportfolio", config: dashboardController.addPortfolio },
  { method: "GET", path: "/about", config: aboutController.index },
  { method: "GET", path: "/clientabout", config: clientAboutController.index },
  { method: "GET", path: "/portfolio/{id}", config: portfolioController.index },
  { method: "POST", path: "/portfolio/{id}/addproject", config: portfolioController.addProject },
  { method: "GET", path: "/dashboard/deleteportfolio/{id}", config: dashboardController.deletePortfolio },
  { method: "GET", path: "/portfolio/{id}/deleteproject/{projectid}", config: portfolioController.deleteProject },
  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
  { method: "GET", path: "/project/{id}", config: projectController.index },
  { method: "GET", path: "/clientproject/{id}", config: clientProjectController.index },
  { method: "POST", path: "/project/{id}/updateproject", config: projectController.updateProject },
  { method: "POST", path: "/project/{id}/updateprojecttitle", config: projectController.updateProjectTitle },
  { method: "POST", path: "/project/{id}/updateimage1", config: projectController.updateImage1 },
  { method: "POST", path: "/project/{id}/updateimage2", config: projectController.updateImage2 },
  { method: "POST", path: "/project/{id}/updateimage3", config: projectController.updateImage3 },
  { method: "GET", path: "/admindashboard", config: adminController.index },
  { method: "GET", path: "/admindashboard/deleteuser/{id}", config: adminController.deleteUser },
  { method: "POST", path: "/userstats", config: adminController.userStats },
  { method: "POST", path: "/updateprofile", config: accountsController.updateProfile },
  { method: "GET", path: "/profile", config: accountsController.showProfile },
  { method: "GET", path: "/clientprofile", config: accountsController.showClientProfile },
  { method: "GET", path: "/favourites", config: favouritesController.index },
  { method: "GET", path: "/addfavourite/{id}", config: clientProjectController.addFavourite },
  { method: "GET", path: "/favourites/deletefavourite/{id}", config: favouritesController.deleteFavourite },
  { method: "POST", path: "/filterprojects", config: clientDashboardController.categoryFilter },
  { method: "POST", path: "/clientproject/{id}/addreview", config: clientProjectController.addReview },
  { method: "GET", path: "/reviews", config: reviewsController.index },
  { method: "GET", path: "/reviews/deletereview/{id}", config: reviewsController.deleteReview },
  { method: "GET", path: "/project/{id}/projectreviews", config: projectReviewsController.index },
  { method: "POST", path: "/project/{id}/updatereply/{reviewid}", config: projectReviewsController.updateReply },
  { method: "GET", path: "/notices", config: noticeController.index },
  { method: "POST", path: "/addnotice", config: noticeController.addNotice },
  { method: "GET", path: "/deletenotice/{id}", config: noticeController.deleteNotice },
  { method: "GET", path: "/noticeupdate/{id}", config: noticeUpdateController.index },
  { method: "POST", path: "/updatenotice/{id}", config: noticeUpdateController.updateNotice },
  { method: "GET", path: "/vendornotices", config: vendorNoticeController.index },
  { method: "GET", path: "/vendornotice/{id}", config: vendorNoticeDetailsController.index },
  { method: "POST", path: "/filternotices", config: vendorNoticeController.categoryFilter },
  { method: "GET", path: "/deletenoticevendor/{id}", config: vendorNoticeController.deleteNotice },
  { method: "POST", path: "/vendornotice/{id}/adddiscussion", config: vendorNoticeDetailsController.addDiscussion },
  { method: "GET", path: "/vendornotice/{id}/deletediscussion/{discussionid}", config: vendorNoticeDetailsController.deleteDiscussion },
  { method: "GET", path: "/clientnotice/{id}/deletediscussion/{discussionid}", config: noticeUpdateController.deleteDiscussion },
  { method: "GET", path: "/clientnotice/{noticeid}/clientanswers/{id}", config: clientAnswerController.index },
  { method: "POST", path: "/clientdiscussion/{id}/addanswer", config: clientAnswerController.addAnswer },
  { method: "GET", path: "/clientdiscussion/{id}/deleteanswer/{answerid}", config: clientAnswerController.deleteAnswer },
  { method: "GET", path: "/vendornotice/{noticeid}/vendoranswers/{id}", config: vendorAnswerController.index },
  { method: "POST", path: "/vendordiscussion/addanswer/{id}", config: vendorAnswerController.addAnswer },
  { method: "GET", path: "/vendordiscussion/{id}/deleteanswer/{answerid}", config: vendorAnswerController.deleteAnswer },
  { method: "GET", path: "/vendordiscussions", config: vendorDiscussionController.index },
  { method: "GET", path: "/deletediscussion/{id}", config: vendorDiscussionController.deleteDiscussion },
];
