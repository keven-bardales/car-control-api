// create-vehicle.usecase.ts
import { ApiResponse } from '@/modules/shared/domain/wrappers/api-response.wrapper';
import { PaginationWrapper, PaginationWrapperProps } from '@/modules/shared/domain/wrappers/pagination-wrapper';
import { VehicleEntity } from '@modules/vehicles/features/vehicle/domain/entities/vehicle.entity';

export type GetVehicleParams = PaginationWrapperProps<VehicleEntity>;

export interface GetVehicleUseCase {
  execute(data: GetVehicleParams): Promise<ApiResponse<PaginationWrapper<VehicleEntity>>>;
}
