import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { Review } from 'src/models/review/review.schema';
import { ReviewService } from 'src/services/review/review.service';
import { instance as logger } from 'src/logger/winston.logger'
import { JwtAuthGuard } from 'src/auth/auth/jwt-auth.guard';
import { ReviewInterface } from 'src/models/interfaces/review/review.interface';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReviewDto } from 'src/models/dto/reviewDto/review.dto/review.dto';

@ApiTags('review')
@Controller('review')
export class ReviewController {

    constructor(private reviewService: ReviewService) { }

    @Get('/all')
    @ApiOperation({ summary: 'Fetch all reviews from database' })
    @ApiResponse({
        status: 200,
        description: 'Reviews found',
        type: ReviewDto,
        isArray: true
    })
    @ApiResponse({ status: 404, description: 'No stores found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async findAllReviews(): Promise<ReviewInterface[]> {
        logger.info("Fetching all reviews");
        const reviews = await this.reviewService.findAllReviews();
        if (reviews.length === 0) {
            logger.warn(`No reviews found`);
            throw new NotFoundException(`No reviews found`);
        }
        return reviews;
    }

    @Get('/top')
    @ApiOperation({ summary: 'Fetch top reviews from database' })
    @ApiResponse({
        status: 200,
        description: 'Top reviews found',
        type: ReviewDto,
        isArray: true
    })
    @ApiResponse({ status: 404, description: 'No top stores found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async getTopRatedReviews(): Promise<ReviewInterface[]> {
        logger.info('Fetching top rated reviews');
        const topRatedReviews = await this.reviewService.getTopRatedReviewsService();
        if (topRatedReviews.length === 0) {
            logger.warn(`No top reviews found`);
            throw new NotFoundException(`No top reviews found`);
        }
        return topRatedReviews;
    }


    @ApiBearerAuth()
    @Get('/recent')
    @ApiOperation({ summary: 'Fetch recent reviews from database' })
    @ApiResponse({
        status: 200,
        description: 'Recent reviews found',
        type: ReviewDto,
        isArray: true
    })
    @ApiResponse({ status: 404, description: 'No recent stores found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async getRecentReviews(): Promise<ReviewInterface[]> {
        logger.info('Fetching recent reviews');
        const recentReviews = await this.reviewService.getRecentReviews();
        if (recentReviews.length === 0) {
            logger.warn(`No recent reviews found`);
            throw new NotFoundException(`No recent reviews found`);
        }
        return recentReviews;
    }

    @Get('/find/:id')
    @ApiOperation({ summary: 'Fetch review by user id' })
    @ApiResponse({
        status: 200,
        description: 'Review by user found',
        type: ReviewDto
    })
    @ApiResponse({ status: 404, description: 'Review not found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @ApiParam({ name: 'id', required: true, description: 'Id of the user' })
    async findReviewByUserId(@Param('id') id: any): Promise<ReviewInterface[]> {
        logger.info(`Fetching reviews for user ID: ${id}`);
        const reviews = await this.reviewService.findReviewByUserId(id);
        if (reviews.length === 0) {
            logger.warn(`No reviews found for user ID: ${id}`);
            throw new NotFoundException(`No reviews found for user ID: ${id}`);
        }
        return reviews;
    }

    @Post('')
    @ApiOperation({ summary: 'Save a new review' })
    @ApiResponse({
        status: 201,
        description: 'Review successfully created',
        type: ReviewDto,
    })
    @ApiResponse({ status: 400, description: 'Invalid review data' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @ApiBody({ type: ReviewDto })
    async saveReview(@Body() review: ReviewInterface): Promise<ReviewInterface> {
        logger.info('Saving review: ' + JSON.stringify(review));
        return this.reviewService.saveReview(review);
    }

}
