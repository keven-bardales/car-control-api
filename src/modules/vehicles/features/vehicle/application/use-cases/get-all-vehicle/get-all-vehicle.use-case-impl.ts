// create-vehicle.usecase.ts
import { ApiResponse } from '@/modules/shared/domain/wrappers/api-response.wrapper';
import { PaginationWrapper } from '@/modules/shared/domain/wrappers/pagination-wrapper';
import { VehicleEntity } from '@modules/vehicles/features/vehicle/domain/entities/vehicle.entity';
import { VehicleRepository } from '@modules/vehicles/features/vehicle/domain/repositories/vehicle.repository';
import {
  GetVehicleParams,
  GetVehicleUseCase,
} from '@modules/vehicles/features/vehicle/domain/use-cases/get-all-vehicle/get-all-vehicle.use-case';

export class GetVehicleUseCaseImpl implements GetVehicleUseCase {
  constructor(private readonly repository: VehicleRepository) {}

  async execute(data: GetVehicleParams): Promise<ApiResponse<PaginationWrapper<VehicleEntity>>> {
    const pagination = PaginationWrapper.fromQuery<VehicleEntity>(data);

    const [vehicles, totalCount] = await Promise.all([
      this.repository.getAll(pagination.getProps()),
      this.repository.count(),
    ]);

    pagination.updateResults(vehicles, totalCount);

    const response = new ApiResponse<PaginationWrapper<VehicleEntity>>({
      data: pagination,
      message: 'Vehículos recuperados exitosamente',
      statusCode: 200,
    });

    return response;
  }
}
