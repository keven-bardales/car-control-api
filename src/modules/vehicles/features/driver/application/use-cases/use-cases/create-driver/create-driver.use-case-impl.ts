// create-vehicle.usecase.ts
import { ApiResponse } from '@/modules/shared/domain/wrappers/api-response.wrapper';
import { DriverEntity } from '@/modules/vehicles/features/driver/domain/entities/driver-entity';
import {
  CreateDriverParams,
  CreateDriverUseCase,
} from '@/modules/vehicles/features/driver/domain/use-cases/create-driver/create-driver.use-case';
import { DriverRepository } from '../../../../domain/repositories/driver.repository';
import { DateValueObject } from '@/modules/shared/domain/value-objects/date.value-object';

export class CreateDriverUseCaseImpl implements CreateDriverUseCase {
  constructor(private driverRepository: DriverRepository) {}

  async execute(data: CreateDriverParams): Promise<ApiResponse<DriverEntity>> {
    const driverEntity = new DriverEntity({
      id: '',
      createdAt: new DateValueObject({ value: new Date() }),
      updatedAt: new DateValueObject({ value: new Date() }),
      isDeleted: false,
      birthdate: new DateValueObject({ value: data?.birthDate }),
      dni: data?.dni,
      name: data?.name,
    });

    const createdDriver = await this.driverRepository.create(driverEntity);

    if (!createdDriver) {
      return ApiResponse.internalServerError({
        message: 'No se pudo crear el conductor',
      });
    }

    return ApiResponse.success({
      message: 'Conductor creado exitosamente',
      data: createdDriver,
    });
  }
}
