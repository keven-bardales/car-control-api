// create-vehicle.usecase.ts
import { ApiResponse } from '@/modules/shared/domain/wrappers/api-response.wrapper';
import { PaginationWrapper } from '@/modules/shared/domain/wrappers/pagination-wrapper';
import { DriverEntity } from '@/modules/vehicles/features/driver/domain/entities/driver-entity';
import { DriverRepository } from '@/modules/vehicles/features/driver/domain/repositories/driver.repository';
import {
  GetAllDriverParams,
  GetAllDriversUseCase,
} from '@/modules/vehicles/features/driver/domain/use-cases/get-all-drivers/get-all-drivers.use-case';

export class GetAllDriversUseCaseImpl implements GetAllDriversUseCase {
  constructor(private readonly repository: DriverRepository) {}

  async execute(data: GetAllDriverParams): Promise<ApiResponse<PaginationWrapper<DriverEntity>>> {
    const pagination = PaginationWrapper.fromQuery<DriverEntity>(data);

    const [drivers, totalCount] = await Promise.all([
      this.repository.getAll(pagination.getProps()),
      this.repository.count(),
    ]);

    pagination.updateResults(drivers, totalCount);

    const response = new ApiResponse<PaginationWrapper<DriverEntity>>({
      data: pagination,
      message: 'Conductores recuperados exitosamente',
      statusCode: 200,
    });

    return response;
  }
}
