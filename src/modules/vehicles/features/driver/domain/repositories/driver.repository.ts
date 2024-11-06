// src/modules/vehicles/domain/repositories/vehicle.repository.ts

import { BaseRepository } from '@modules/shared/domain/repositories/base.repository';
import { DriverEntity } from '../entities/driver-entity';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DriverRepository extends BaseRepository<DriverEntity, string> {}
