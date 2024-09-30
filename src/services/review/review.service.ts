import { BadRequestException, Injectable, LoggerService, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CustomLoggerService } from 'src/logger/logger-service/logger-service.service';
import { ReviewInterface } from 'src/models/interfaces/review/review.interface';
import { Review } from 'src/models/review/review.schema';
import { Store } from 'src/models/store/store.schema';
import { User } from 'src/models/user/user.schema';


@Injectable()
export class ReviewService {

    constructor(@InjectModel(Review.name) private reviewModel: Model<Review>,
        private readonly logger: CustomLoggerService,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Store.name) private storeModel: Model<Store>) { }

    async findAllReviews(): Promise<ReviewInterface[]> {
        const reviews = await this.reviewModel.find();
        if (reviews.length == 0) {
            this.logger.warn("No reviews found");
            throw new NotFoundException("No reviews found");
        }
        return reviews;
    }

    async saveReview(review: Review): Promise<ReviewInterface> {
        if (review.rating < 1 || review.rating > 5) {
            this.logger.warn("Invalid rating attempted: " + review.rating);
            throw new BadRequestException("Rating MUST be between 1 and 5")
        }
        const savedReview = this.reviewModel.create(review);
        this.logger.log('info', 'Review saved successfully');
        return savedReview;
    }

    async findReviewByUserId(userId: any): Promise<ReviewInterface[]> {
        if (!Types.ObjectId.isValid(userId)) {
            throw new BadRequestException('Invalid ID format');
        }
        const userReviews = await this.reviewModel.find({ userId: userId });
        if (userReviews.length === 0) {
            this.logger.warn("No reviews found for user ID: " + userId);
            throw new NotFoundException("Error, user with id: " + userId + " not found");
        }
        return userReviews;
    }

    async getRecentReviews(): Promise<ReviewInterface[]> {
        const recentReviews = await this.reviewModel.find().sort({ createdAt: -1 });
        const users = await this.userModel.find({ _id: { $in: recentReviews.map(comment => comment.userId) } })
        const userMap = new Map(users.map(user => [user._id.toString(), user.username]))
        this.logger.log('info', 'Fetching recent reviews from service...');
        if (recentReviews.length === 0) {
            this.logger.warn("No recent reviews found");
            throw new NotFoundException("No recent reviews");
        }
        return recentReviews.map(data => ({
            ...data.toObject(),
            username: userMap.get(data.userId.toString())
        }));;
    }

    async getTopRatedReviewsService(): Promise<ReviewInterface[]> {
        const topRatedReviews = await this.reviewModel.find().sort({ rating: -1 }).limit(3);
        const stores = await this.storeModel.find({ _id: { $in: topRatedReviews.map(review => review.storeId) } })
        const storeMap = new Map(stores.map(store => [store._id.toString(), store]))
        this.logger.log('info', 'Fetching top rated reviews from service...');
        if (topRatedReviews.length === 0) {
            this.logger.warn("No top rated reviews found");
            throw new NotFoundException("No top rated reviews");
        }
        return topRatedReviews.map(data => {
            const oneStore = storeMap.get(data.storeId.toString());
            return {
                ...data.toObject(),
                name: oneStore.name,
                description: oneStore.description,
                logo: oneStore.logo
            }
        });
    }

    async deleteReview(id: any) {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid ID format');
        }
        const deletedReview = await this.reviewModel.findByIdAndDelete(id);
        if (deletedReview) {
            this.logger.log("info", "Review deleted successfully");
        } else {
            this.logger.warn("Review not found for deletion with ID: " + id);
            throw new NotFoundException("Review not found");
        }
    }
}
