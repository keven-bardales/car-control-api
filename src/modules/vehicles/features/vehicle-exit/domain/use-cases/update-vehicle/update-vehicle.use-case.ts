// update-vehicleExit.usecase.ts
import { ApiResponse } from '@/modules/shared/domain/wrappers/api-response.wrapper';
import { VehicleExitEntity } from '@modules/vehicles/features/vehicle-exit/domain/entities/vehicle-exit.entity';

export interface UpdateVehicleExitParams {
  plannedExitDate: string;
  actualExitDate: string;
  fromLocation: string;
  toLocation: string;
  notes?: string;
  mileage: number;
  status: string;
}

export interface UpdateVehicleExitUseCase {
  execute(data: UpdateVehicleExitParams): Promise<ApiResponse<VehicleExitEntity>>;
}
