// get-vehicleExit.usecase.ts
import { ApiResponse } from '@/modules/shared/domain/wrappers/api-response.wrapper';
import { PaginationWrapper, PaginationWrapperProps } from '@/modules/shared/domain/wrappers/pagination-wrapper';
import { VehicleExitEntity } from '@modules/vehicles/features/vehicle-exit/domain/entities/vehicle-exit.entity';

export type GetVehicleExitParams = PaginationWrapperProps<VehicleExitEntity>;

export interface GetVehicleExitUseCase {
  execute(data: GetVehicleExitParams): Promise<ApiResponse<PaginationWrapper<VehicleExitEntity>>>;
}
