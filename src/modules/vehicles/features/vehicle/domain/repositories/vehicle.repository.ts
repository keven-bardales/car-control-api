// src/modules/vehicles/domain/repositories/vehicle.repository.ts

import { BaseRepository } from '@modules/shared/domain/repositories/base.repository';
import { Vehicle } from '@modules/vehicles/features/vehicle/domain/entities/vehicle.entity';

export interface VehicleRepository extends BaseRepository<Vehicle, number> {
  findByPlate(plate: string): Promise<Vehicle | null>;
  findByVin(vin: string): Promise<Vehicle | null>;
}
