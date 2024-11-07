// create-vehicleEntrance.usecase.ts
import { ApiResponse } from '@/modules/shared/domain/wrappers/api-response.wrapper';
import { VehicleEntranceEntity } from '@modules/vehicles/features/vehicle-entrance/domain/entities/vehicle-entrance.entity';

export interface CreateVehicleEntranceParams {
  vehicleId: number;
  entranceDate: string;
  plannedReturnDate: string;
  fromLocation: string;
  toLocation: string;
  notes?: string;
  mileage: number;
  status: string;
}

export interface CreateVehicleEntranceUseCase {
  execute(data: CreateVehicleEntranceParams): Promise<ApiResponse<VehicleEntranceEntity>>;
}
