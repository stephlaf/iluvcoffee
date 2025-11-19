import * as Joi from '@hapi/joi';

import { ConfigModule } from '@nestjs/config';
import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    // forRootAsync will load after all other module registered in the app has resolved
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +(process.env.DATABASE_PORT ?? '5433'),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        // synchronize: true, // Disable in production!!!
      }),
    }),
    ConfigModule.forRoot({
      // envFilePath: '.environment', // For custom file organization
      // ignoreEnvFile: true, // To completely ignore the .env file
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5433),
      }),
    }),
    CoffeesModule,
    CoffeeRatingModule,
    DatabaseModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Scoped to the app
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe,
    // },
  ],
})
export class AppModule {}
