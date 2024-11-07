// create-vehicle.usecase.ts
import { ApiResponse } from '@/modules/shared/domain/wrappers/api-response.wrapper';
import { VehicleEntity } from '@modules/vehicles/features/vehicle/domain/entities/vehicle.entity';

export interface UpdateVehicleParams {
  make: string;
  model: string;
  year: number;
  plate: string;
  vin: string;
  imageUrl: string;
  driverId: string;
  totalMilage: number;
}

export interface UpdateVehicleUseCase {
  execute(data: UpdateVehicleParams): Promise<ApiResponse<VehicleEntity>>;
}
