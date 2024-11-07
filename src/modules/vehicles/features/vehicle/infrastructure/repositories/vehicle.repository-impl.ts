import { VehicleRepository } from '@modules/vehicles/features/vehicle/domain/repositories/vehicle.repository';
import { VehicleEntity } from '@modules/vehicles/features/vehicle/domain/entities/vehicle.entity';
import { db } from '@/modules/shared/infrastructure/db/db';
import { DateValueObject } from '@/modules/shared/domain/value-objects/date.value-object';
import { PaginationWrapperProps } from '@/modules/shared/domain/wrappers/pagination-wrapper';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export class VehicleRepositoryImpl implements VehicleRepository {
  count(): Promise<number> {
    return db.driver.count();
  }

  exists(id: number): Promise<boolean> {
    return db.vehicle
      .findUnique({
        where: {
          id,
        },
      })
      .then((result) => !!result);
  }

  async create(item: VehicleEntity): Promise<VehicleEntity | null> {
    const result = await db.vehicle.create({
      data: {
        make: item.make,
        model: item.model,
        year: item.year,
        plate: item.plate,
        vin: item.vin,
        imageUrl: item.imageUrl,
        driverId: item.driverId,
      },
    });

    if (!result) {
      return null;
    }

    const entity = new VehicleEntity({
      createdAt: new DateValueObject({
        value: result.createdAt,
      }),
      driverId: result.driverId,
      id: result.id,
      isDeleted: result.isDeleted,
      make: result.make,
      model: result.model,
      plate: result.plate,
      updatedAt: new DateValueObject({
        value: result.updatedAt,
      }),
      vin: result.vin,
      year: result.year,
      imageUrl: result.imageUrl,
    });

    return entity;
  }

  async getById(id: number): Promise<VehicleEntity | null> {
    const result = await db.vehicle.findUnique({
      where: {
        id,
      },
    });

    if (!result) {
      return null;
    }

    const entity = new VehicleEntity({
      createdAt: new DateValueObject({
        value: result.createdAt,
      }),
      driverId: result.driverId,
      id: result.id,
      isDeleted: result.isDeleted,
      make: result.make,
      model: result.model,
      plate: result.plate,
      updatedAt: new DateValueObject({
        value: result.updatedAt,
      }),
      vin: result.vin,
      year: result.year,
      imageUrl: result.imageUrl,
    });

    return entity;
  }

  async getAll(paginationOptions: PaginationWrapperProps<VehicleEntity>): Promise<VehicleEntity[]> {
    const {
      pageIndex = 1,
      pageSize = 10,
      orderBy = 'createdAt',
      orderDirection = 'asc',
      includeAll = false,
      parameter: searchTerm = null,
    } = paginationOptions;

    const query: Prisma.VehicleFindManyArgs<DefaultArgs> = {
      orderBy: {
        [orderBy]: orderDirection,
      },
    };

    if (searchTerm) {
      query.where = {
        OR: [
          { make: { contains: searchTerm, mode: 'insensitive' } },
          { model: { contains: searchTerm, mode: 'insensitive' } },
          { plate: { contains: searchTerm, mode: 'insensitive' } },
          { vin: { contains: searchTerm, mode: 'insensitive' } },
        ],
      };
    }

    if (!includeAll) {
      const skip = (pageIndex - 1) * pageSize;
      query.skip = skip;
      query.take = pageSize;
    }

    const result = await db.vehicle.findMany(query);

    return result.map(
      (item) =>
        new VehicleEntity({
          createdAt: new DateValueObject({ value: item.createdAt }),
          driverId: item.driverId,
          id: item.id,
          isDeleted: item.isDeleted,
          make: item.make,
          model: item.model,
          plate: item.plate,
          updatedAt: new DateValueObject({ value: item.updatedAt }),
          vin: item.vin,
          year: item.year,
          imageUrl: item.imageUrl,
        }),
    );
  }

  async delete(id: number): Promise<boolean> {
    const result = await db.vehicle.update({
      data: {
        isDeleted: true,
      },
      where: {
        id,
      },
    });

    if (!result) {
      return false;
    }

    return true;
  }

  async update(entity: VehicleEntity): Promise<VehicleEntity> {
    const updateVehicleResult = await db.vehicle.update({
      data: {
        make: entity.make,
        model: entity.model,
        year: entity.year,
        plate: entity.plate,
        vin: entity.vin,
        imageUrl: entity.imageUrl,
        driverId: entity.driverId,
      },
      where: {
        id: entity.id,
      },
    });

    return new VehicleEntity({
      createdAt: new DateValueObject({ value: updateVehicleResult.createdAt }),
      driverId: updateVehicleResult.driverId,
      id: updateVehicleResult.id,
      isDeleted: updateVehicleResult.isDeleted,
      make: updateVehicleResult.make,
      model: updateVehicleResult.model,
      plate: updateVehicleResult.plate,
      updatedAt: new DateValueObject({ value: updateVehicleResult.updatedAt }),
      vin: updateVehicleResult.vin,
      year: updateVehicleResult.year,
      imageUrl: updateVehicleResult.imageUrl,
    });
  }
}
