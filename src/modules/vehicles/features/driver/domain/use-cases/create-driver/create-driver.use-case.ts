// create-vehicle.usecase.ts
import { ApiResponse } from '@/modules/shared/domain/wrappers/api-response.wrapper';
import { DriverEntity } from '@/modules/vehicles/features/driver/domain/entities/driver-entity';

export interface CreateDriverParams {
  name: string;
  dni: string;
  birthDate: string;
}

export interface CreateDriverUseCase {
  execute(data: CreateDriverParams): Promise<ApiResponse<DriverEntity>>;
}
