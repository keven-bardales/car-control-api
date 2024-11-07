// create-vehicle.usecase.ts
import { ApiResponse } from '@/modules/shared/domain/wrappers/api-response.wrapper';
import { VehicleEntity } from '@modules/vehicles/features/vehicle/domain/entities/vehicle.entity';
import { VehicleRepository } from '@modules/vehicles/features/vehicle/domain/repositories/vehicle.repository';
import {
  UpdateVehicleParams,
  UpdateVehicleUseCase,
} from '@modules/vehicles/features/vehicle/domain/use-cases/update-vehicle/update-vehicle.use-case';
import { DateValueObject } from '@modules/shared/domain/value-objects/date.value-object';

export class UpdateVehicleUseCaseImpl implements UpdateVehicleUseCase {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute(data: UpdateVehicleParams): Promise<ApiResponse<VehicleEntity>> {
    // TODO
    // Validate driver existence

    const vehicleToUpdate = new VehicleEntity({
      id: 0,
      createdAt: new DateValueObject({ value: new Date() }),
      updatedAt: new DateValueObject({ value: new Date() }),
      isDeleted: false,
      make: data?.make,
      model: data?.model,
      year: data?.year,
      plate: data?.plate,
      vin: data?.vin,
      imageUrl: data?.imageUrl || null,
      driverId: data?.driverId,
    });

    const updatedVehicle = await this.vehicleRepository.update(vehicleToUpdate);

    if (!updatedVehicle) {
      return ApiResponse.internalServerError({
        message: 'No se pudo actualizar el vehículo',
      });
    }

    return ApiResponse.success({
      message: 'Vehículo actualizado exitosamente',
      data: updatedVehicle,
    });
  }
}
