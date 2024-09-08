import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleDTO } from './create-vehicle.dto';

export class PatchVehicleDTO extends PartialType(CreateVehicleDTO) {}
