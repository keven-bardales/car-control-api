// src/modules/vehicles/domain/repositories/vehicle.repository.ts

import { BaseRepository } from '@modules/shared/domain/repositories/base.repository';
import { VehicleEntity } from '@modules/vehicles/features/vehicle/domain/entities/vehicle.entity';

export interface VehicleRepository extends BaseRepository<VehicleEntity, number> {
  findByPlate(plate: string): Promise<VehicleEntity | null>;
  findByVin(vin: string): Promise<VehicleEntity | null>;
}
