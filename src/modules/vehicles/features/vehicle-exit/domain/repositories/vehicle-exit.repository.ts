// src/modules/vehicles/domain/repositories/vehicleExit.repository.ts

import { BaseRepository } from '@modules/shared/domain/repositories/base.repository';
import { VehicleExitEntity } from '@modules/vehicles/features/vehicle-exit/domain/entities/vehicle-exit.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface VehicleExitRepository extends BaseRepository<VehicleExitEntity, number> {}
