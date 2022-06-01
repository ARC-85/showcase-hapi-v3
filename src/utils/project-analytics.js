import { db } from "../models/db.js";


export const projectAnalytics = {


    async getAverageRating(project) {
        let totalRatings = 0;
        let averageRating = 0;
        const reviews = await db.reviewStore.getReviewsByProject(project);
        for (let i = 0; i < reviews.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const review = await db.reviewStore.getReviewById(reviews[i]._id);
            totalRatings += review.rating;
        }
        averageRating = totalRatings / reviews.length

        return averageRating
    },



  };