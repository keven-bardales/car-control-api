// src/modules/vehicles/domain/repositories/vehicle.repository.ts

import { BaseRepository } from '@modules/shared/domain/repositories/base.repository';
import { VehicleEntity } from '@modules/vehicles/features/vehicle/domain/entities/vehicle.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface VehicleRepository extends BaseRepository<VehicleEntity, number> {}
