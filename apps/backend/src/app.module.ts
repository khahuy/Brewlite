import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const uri = config.get<string>('MONGODB_URI') ?? process.env.MONGODB_URI;
        if (!uri) {
          throw new Error('MONGODB_URI is missing. Check apps/backend/.env');
        }
        return { uri, family: 4 };
      },
    }),
    ProductsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
