import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user/user.schema';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { Category, CategorySchema } from './models/category/category.schema';
import { CategoryController } from './controllers/category/category.controller';
import { CategoryService } from './services/category/category.service';
import { Store, StoreSchema } from './models/store/store.schema';
import { StoreController } from './controllers/store/store.controller';
import { StoreService } from './services/store/store.service';
import { ReviewService } from './services/review/review.service';
import { ReviewController } from './controllers/review/review.controller';
import { Review, ReviewSchema } from './models/review/review.schema';
import { AuthModule } from './auth/auth/auth.module';
import { ApiController } from './controllers/api/api/api.controller';
import { ApiService } from './services/api/api/api.service';
import { HttpModule } from '@nestjs/axios';
import { CustomLoggerService } from './logger/logger-service/logger-service.service';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    isGlobal: true,
  }),
  MongooseModule.forRoot(process.env.DATABASE_URL),
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
  MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
  MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
    AuthModule,
    HttpModule
  ],
  controllers: [AppController, UserController, CategoryController, StoreController, ReviewController, ApiController],
  providers: [AppService, UserService, CategoryService, StoreService, ReviewService, CustomLoggerService, ApiService]
})
export class AppModule { }
