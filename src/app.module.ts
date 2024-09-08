import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AppService } from './app.service';
import { VehicleModule } from './modules/vehicles/vehicle.module';
import { LoggerModule } from './utils/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: Number(process.env.THROTTLE_TTL)*1000, 
        limit: Number(process.env.THROTTLE_LIMIT),
      },
    ]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => VehicleModule),
    LoggerModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }
