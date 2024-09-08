import { forwardRef, Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { VehicleService } from './vehicle.service';
import { UserModule } from '../user/user.module';
import { LoggerModule } from 'src/utils/logger/logger.module';


@Module({
  imports: [PrismaModule, 
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => LoggerModule)
  ],
  providers: [VehicleService],
  controllers: [VehicleController],
  exports:[VehicleService]
})
export class VehicleModule {}
