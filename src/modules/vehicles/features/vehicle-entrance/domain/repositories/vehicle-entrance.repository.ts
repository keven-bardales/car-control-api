// src/modules/vehicles/domain/repositories/vehicleEntrance.repository.ts

import { BaseRepository } from '@modules/shared/domain/repositories/base.repository';
import { VehicleEntranceEntity } from '@modules/vehicles/features/vehicle-entrance/domain/entities/vehicle-entrance.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface VehicleEntranceRepository extends BaseRepository<VehicleEntranceEntity, number> {}
