// src/modules/vehicles/domain/repositories/vehicleAssignedDrivers.repository.ts

import { BaseRepository } from '@modules/shared/domain/repositories/base.repository';
import { VehicleAssignedDriversEntity } from '@modules/vehicles/features/vehicle-assigned-drivers/domain/entities/vehicle-assigned-dri.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface VehicleAssignedDriversRepository extends BaseRepository<VehicleAssignedDriversEntity, number> {}
