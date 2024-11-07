// update-vehicleEntrance.usecase.ts
import { ApiResponse } from '@/modules/shared/domain/wrappers/api-response.wrapper';
import { VehicleEntranceEntity } from '@modules/vehicles/features/vehicle-entrance/domain/entities/vehicle-entrance.entity';

export interface UpdateVehicleEntranceParams {
  entranceDate: string;
  plannedReturnDate: string;
  fromLocation: string;
  toLocation: string;
  notes?: string;
  mileage: number;
  status: string;
}

export interface UpdateVehicleEntranceUseCase {
  execute(data: UpdateVehicleEntranceParams): Promise<ApiResponse<VehicleEntranceEntity>>;
}
