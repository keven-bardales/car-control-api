import { VehicleEntranceRepository } from '@modules/vehicles/features/vehicle-entrance/domain/repositories/vehicle-entrance.repository';
import { VehicleEntranceEntity } from '@modules/vehicles/features/vehicle-entrance/domain/entities/vehicle-entrance.entity';
import { db } from '@/modules/shared/infrastructure/db/db';
import { DateValueObject } from '@/modules/shared/domain/value-objects/date.value-object';
import { PaginationWrapperProps } from '@/modules/shared/domain/wrappers/pagination-wrapper';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export class VehicleEntranceRepositoryImpl implements VehicleEntranceRepository {
  async count(): Promise<number> {
    return db.vehicleEntrance.count();
  }

  async exists(id: number): Promise<boolean> {
    const result = await db.vehicleEntrance.findUnique({
      where: { id },
    });
    return !!result;
  }

  async create(item: VehicleEntranceEntity): Promise<VehicleEntranceEntity | null> {
    const result = await db.vehicleEntrance.create({
      data: {
        vehicleId: item.vehicleId,
        entranceDate: item.entranceDate?.getStringValue() ?? null,
        plannedReturnDate: item.plannedReturnDate?.getStringValue() ?? null,
        actualReturnDate: item.actualReturnDate?.getStringValue() ?? null,
        fromLocation: item.fromLocation,
        toLocation: item.toLocation,
        notes: item.notes,
        mileage: item.mileage,
        status: item.status,
        driverId: item.driverId ?? undefined,
      },
    });

    if (!result) {
      return null;
    }

    return new VehicleEntranceEntity({
      createdAt: new DateValueObject({ value: result.createdAt }),
      updatedAt: new DateValueObject({ value: result.updatedAt }),
      vehicleId: result.vehicleId,
      entranceDate: result.entranceDate ? new DateValueObject({ value: result.entranceDate }) : undefined,
      plannedReturnDate: result.plannedReturnDate
        ? new DateValueObject({ value: result.plannedReturnDate })
        : undefined,
      actualReturnDate: result.actualReturnDate ? new DateValueObject({ value: result.actualReturnDate }) : undefined,
      fromLocation: result.fromLocation,
      toLocation: result.toLocation,
      notes: result.notes ?? undefined,
      mileage: result.mileage,
      status: result.status,
      id: result.id,
      isDeleted: result.isDeleted,
      driverId: result.driverId ?? undefined,
    });
  }

  async getById(id: number): Promise<VehicleEntranceEntity | null> {
    const result = await db.vehicleEntrance.findUnique({
      where: { id },
    });

    if (!result) {
      return null;
    }

    return new VehicleEntranceEntity({
      createdAt: new DateValueObject({ value: result.createdAt }),
      updatedAt: new DateValueObject({ value: result.updatedAt }),
      vehicleId: result.vehicleId,
      entranceDate: result.entranceDate ? new DateValueObject({ value: result.entranceDate }) : undefined,
      plannedReturnDate: result.plannedReturnDate
        ? new DateValueObject({ value: result.plannedReturnDate })
        : undefined,
      actualReturnDate: result.actualReturnDate ? new DateValueObject({ value: result.actualReturnDate }) : undefined,
      fromLocation: result.fromLocation,
      toLocation: result.toLocation,
      notes: result.notes ?? undefined,
      mileage: result.mileage,
      status: result.status,
      id: result.id,
      isDeleted: result.isDeleted,
      driverId: result.driverId ?? undefined,
    });
  }

  async getAll(paginationOptions: PaginationWrapperProps<VehicleEntranceEntity>): Promise<VehicleEntranceEntity[]> {
    const {
      pageIndex = 1,
      pageSize = 10,
      orderBy = 'createdAt',
      orderDirection = 'asc',
      includeAll = false,
      parameter: searchTerm = null,
    } = paginationOptions;

    const query: Prisma.VehicleEntranceFindManyArgs<DefaultArgs> = {
      orderBy: {
        [orderBy]: orderDirection,
      },
    };

    if (searchTerm) {
      query.where = {
        OR: [
          { fromLocation: { contains: searchTerm, mode: 'insensitive' } },
          { toLocation: { contains: searchTerm, mode: 'insensitive' } },
          { status: { contains: searchTerm, mode: 'insensitive' } },
        ],
      };
    }

    if (!includeAll) {
      const skip = (pageIndex - 1) * pageSize;
      query.skip = skip;
      query.take = pageSize;
    }

    const result = await db.vehicleEntrance.findMany(query);

    return result.map(
      (item) =>
        new VehicleEntranceEntity({
          createdAt: new DateValueObject({ value: item.createdAt }),
          updatedAt: new DateValueObject({ value: item.updatedAt }),
          vehicleId: item.vehicleId,
          entranceDate: item.entranceDate ? new DateValueObject({ value: item.entranceDate }) : undefined,
          plannedReturnDate: item.plannedReturnDate
            ? new DateValueObject({ value: item.plannedReturnDate })
            : undefined,
          actualReturnDate: item.actualReturnDate ? new DateValueObject({ value: item.actualReturnDate }) : undefined,
          fromLocation: item.fromLocation,
          toLocation: item.toLocation,
          notes: item.notes ?? undefined,
          mileage: item.mileage,
          status: item.status,
          id: item.id,
          isDeleted: item.isDeleted,
          driverId: item.driverId ?? undefined,
        }),
    );
  }

  async delete(id: number): Promise<boolean> {
    const result = await db.vehicleEntrance.update({
      where: { id },
      data: { isDeleted: true },
    });

    return !!result;
  }

  async update(entity: VehicleEntranceEntity): Promise<VehicleEntranceEntity> {
    const updateResult = await db.vehicleEntrance.update({
      where: { id: entity.id },
      data: {
        vehicleId: entity.vehicleId,
        entranceDate: entity.entranceDate?.getStringValue() ?? null,
        plannedReturnDate: entity.plannedReturnDate?.getStringValue() ?? null,
        actualReturnDate: entity.actualReturnDate?.getStringValue() ?? null,
        fromLocation: entity.fromLocation,
        toLocation: entity.toLocation,
        notes: entity.notes,
        mileage: entity.mileage,
        status: entity.status,
        driverId: entity.driverId ?? undefined,
      },
    });

    return new VehicleEntranceEntity({
      createdAt: new DateValueObject({ value: updateResult.createdAt }),
      updatedAt: new DateValueObject({ value: updateResult.updatedAt }),
      vehicleId: updateResult.vehicleId,
      entranceDate: updateResult.entranceDate ? new DateValueObject({ value: updateResult.entranceDate }) : undefined,
      plannedReturnDate: updateResult.plannedReturnDate
        ? new DateValueObject({ value: updateResult.plannedReturnDate })
        : undefined,
      actualReturnDate: updateResult.actualReturnDate
        ? new DateValueObject({ value: updateResult.actualReturnDate })
        : undefined,
      fromLocation: updateResult.fromLocation,
      toLocation: updateResult.toLocation,
      notes: updateResult.notes ?? undefined,
      mileage: updateResult.mileage,
      status: updateResult.status,
      id: updateResult.id,
      isDeleted: updateResult.isDeleted,
      driverId: updateResult.driverId ?? undefined,
    });
  }
}
