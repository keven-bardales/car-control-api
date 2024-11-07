// get-vehicleEntrance.usecase.ts
import { ApiResponse } from '@/modules/shared/domain/wrappers/api-response.wrapper';
import { PaginationWrapper, PaginationWrapperProps } from '@/modules/shared/domain/wrappers/pagination-wrapper';
import { VehicleEntranceEntity } from '@modules/vehicles/features/vehicle-entrance/domain/entities/vehicle-entrance.entity';

export type GetVehicleEntranceParams = PaginationWrapperProps<VehicleEntranceEntity>;

export interface GetVehicleEntranceUseCase {
  execute(data: GetVehicleEntranceParams): Promise<ApiResponse<PaginationWrapper<VehicleEntranceEntity>>>;
}
