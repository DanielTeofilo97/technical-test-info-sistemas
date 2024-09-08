import { PartialType } from '@nestjs/swagger';
import { CreateVehicleDTO } from './create-vehicle.dto';

export class UpdateVehicleDTO extends PartialType(CreateVehicleDTO) {}
