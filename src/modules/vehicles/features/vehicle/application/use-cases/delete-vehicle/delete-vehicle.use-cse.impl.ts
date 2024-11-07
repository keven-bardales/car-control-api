// create-vehicle.usecase.ts
import { ApiResponse } from '@/modules/shared/domain/wrappers/api-response.wrapper';
import { VehicleRepository } from '@modules/vehicles/features/vehicle/domain/repositories/vehicle.repository';
import {
  DeleteVehicleParams,
  DeleteVehicleUseCase,
} from '@modules/vehicles/features/vehicle/domain/use-cases/delete-vehicle/delete-vehicle-use-case';

export class DeleteVehicleUseCaseImpl implements DeleteVehicleUseCase {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute(data: DeleteVehicleParams): Promise<ApiResponse<boolean>> {
    const exists = await this.vehicleRepository.exists(data.id);

    if (!exists) {
      return ApiResponse.notFound({
        message: 'El vehículo no existe',
      });
    }

    const deletedResult = await this.vehicleRepository.delete(data.id);

    if (!deletedResult) {
      return ApiResponse.notSuccess({
        message: 'No se pudo eliminar el vehículo',
      });
    }

    return ApiResponse.success({
      message: 'Vehículo eliminado exitosamente',
      data: deletedResult,
    });
  }
}
