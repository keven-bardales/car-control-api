// src/modules/vehicles/domain/repositories/vehicleMileage.repository.ts

import { BaseRepository } from '@modules/shared/domain/repositories/base.repository';
import { VehicleMileageEntity } from '@modules/vehicles/features/vehicle-mileage/domain/entities/vehicle-mileage.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface VehicleMileageRepository extends BaseRepository<VehicleMileageEntity, number> {}
