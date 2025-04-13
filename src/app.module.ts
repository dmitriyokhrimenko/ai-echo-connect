import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
// import { I18nModule } from 'nestjs-i18n';
import { LoggerModule } from './modules/logger/logger.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { ChatgptModule } from './modules/chatgpt/chatgpt.module';
import { GeminiModule } from './modules/gemini/gemini.module';
import { dataSourceOptions } from '../db/data-source';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    // I18nModule.forRootAsync({
    //   useFactory: () => ({
    //     fallbackLanguage: 'en',
    //     loaderOptions: {
    //       path: './i18n',
    //       watch: true,
    //     },
    //   }),
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => dataSourceOptions,
    }),
    AuthModule,
    UsersModule,
    LoggerModule,
    ChatgptModule,
    GeminiModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
