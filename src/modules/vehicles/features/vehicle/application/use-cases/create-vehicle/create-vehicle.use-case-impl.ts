// create-vehicle.usecase.ts
import { ApiResponse } from '@/modules/shared/domain/wrappers/api-response.wrapper';
import { VehicleEntity } from '@modules/vehicles/features/vehicle/domain/entities/vehicle.entity';
import { VehicleRepository } from '@modules/vehicles/features/vehicle/domain/repositories/vehicle.repository';
import {
  CreateVehicleParams,
  CreateVehicleUseCase,
} from '@modules/vehicles/features/vehicle/domain/use-cases/create-vehicle/create-vehicle.use-case';
import { DateValueObject } from '@modules/shared/domain/value-objects/date.value-object';

export class CreateVehicleUseCaseImpl implements CreateVehicleUseCase {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute(data: CreateVehicleParams): Promise<ApiResponse<VehicleEntity>> {
    // TODO

    // Validate driver existence

    const vehicleEntity = new VehicleEntity({
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
      totalMilage: data?.totalMilage || 0,
    });

    const createdVehicle = await this.vehicleRepository.create(vehicleEntity);

    if (!createdVehicle) {
      return ApiResponse.internalServerError({
        message: 'No se pudo crear el vehículo',
      });
    }

    return ApiResponse.success({
      message: 'Vehículo creado exitosamente',
      data: createdVehicle,
    });
  }
}
