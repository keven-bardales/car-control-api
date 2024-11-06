// create-vehicle.usecase.ts
import { ApiResponse } from '@/modules/shared/domain/wrappers/api-response.wrapper';
import { PaginationWrapper, PaginationWrapperProps } from '@/modules/shared/domain/wrappers/pagination-wrapper';
import { DriverEntity } from '@/modules/vehicles/features/driver/domain/entities/driver-entity';

export type GetAllDriverParams = PaginationWrapperProps<DriverEntity>;

export interface GetAllDriversUseCase {
  execute(data: GetAllDriverParams): Promise<ApiResponse<PaginationWrapper<DriverEntity>>>;
}
