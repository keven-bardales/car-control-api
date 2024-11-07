// delete-vehicleExit.usecase.ts
import { ApiResponse } from '@/modules/shared/domain/wrappers/api-response.wrapper';

export interface DeleteVehicleExitParams {
  id: number;
}

export interface DeleteVehicleExitUseCase {
  execute(data: DeleteVehicleExitParams): Promise<ApiResponse<boolean>>;
}
