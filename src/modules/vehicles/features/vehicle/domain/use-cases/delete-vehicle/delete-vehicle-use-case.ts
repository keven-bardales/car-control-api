// create-vehicle.usecase.ts
import { ApiResponse } from '@/modules/shared/domain/wrappers/api-response.wrapper';

export interface DeleteVehicleParams {
  id: number;
}

export interface DeleteVehicleUseCase {
  execute(data: DeleteVehicleParams): Promise<ApiResponse<boolean>>;
}
