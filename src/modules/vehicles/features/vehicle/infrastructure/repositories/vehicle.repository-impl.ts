import { VehicleRepository } from '@modules/vehicles/features/vehicle/domain/repositories/vehicle.repository';
import { VehicleEntity } from '@modules/vehicles/features/vehicle/domain/entities/vehicle.entity';
import { db } from '@/modules/shared/infrastructure/db/db';
import { DateValueObject } from '@/modules/shared/domain/value-objects/date.value-object';

export class VehicleRepositoryImpl implements VehicleRepository {
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

  async getAll(): Promise<VehicleEntity[]> {
    const result = await db.vehicle.findMany();

    return result.map((item) => {
      return new VehicleEntity({
        createdAt: new DateValueObject({
          value: item.createdAt,
        }),
        driverId: item.driverId,
        id: item.id,
        isDeleted: item.isDeleted,
        make: item.make,
        model: item.model,
        plate: item.plate,
        updatedAt: new DateValueObject({
          value: item.updatedAt,
        }),
        vin: item.vin,
        year: item.year,
        imageUrl: item.imageUrl,
      });
    });
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

  async findByVin(vin: string): Promise<VehicleEntity | null> {
    const result = await db.vehicle.findFirst({
      where: {
        vin: vin,
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

  findByPlate(plate: string): Promise<VehicleEntity | null> {
    return db.vehicle
      .findFirst({
        where: {
          plate: plate,
        },
      })
      .then((result) => {
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
      });
  }

  update(entity: VehicleEntity): Promise<VehicleEntity> {
    const result = db.vehicle.update({
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
        id: entity.getId(),
      },
    });

    return result.then((item) => {
      return new VehicleEntity({
        createdAt: new DateValueObject({
          value: item.createdAt,
        }),
        driverId: item.driverId,
        id: item.id,
        isDeleted: item.isDeleted,
        make: item.make,
        model: item.model,
        plate: item.plate,
        updatedAt: new DateValueObject({
          value: item.updatedAt,
        }),
        vin: item.vin,
        year: item.year,
        imageUrl: item.imageUrl,
      });
    });
  }
}
