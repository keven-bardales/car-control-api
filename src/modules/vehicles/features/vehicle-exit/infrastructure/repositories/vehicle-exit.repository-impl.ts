import { VehicleExitRepository } from '@modules/vehicles/features/vehicle-exit/domain/repositories/vehicle-exit.repository';
import { VehicleExitEntity } from '@modules/vehicles/features/vehicle-exit/domain/entities/vehicle-exit.entity';
import { db } from '@/modules/shared/infrastructure/db/db';
import { DateValueObject } from '@/modules/shared/domain/value-objects/date.value-object';
import { PaginationWrapperProps } from '@/modules/shared/domain/wrappers/pagination-wrapper';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export class VehicleExitRepositoryImpl implements VehicleExitRepository {
  async count(): Promise<number> {
    return db.vehicleExit.count();
  }

  async exists(id: number): Promise<boolean> {
    const result = await db.vehicleExit.findUnique({
      where: { id },
    });
    return !!result;
  }

  async create(item: VehicleExitEntity): Promise<VehicleExitEntity | null> {
    const result = await db.vehicleExit.create({
      data: {
        vehicleId: item.vehicleId,
        entranceId: item.entranceId ?? undefined,
        plannedExitDate: item.plannedExitDate?.getStringValue() ?? null,
        actualExitDate: item.actualExitDate?.getStringValue() ?? null,
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

    return new VehicleExitEntity({
      createdAt: new DateValueObject({ value: result.createdAt }),
      updatedAt: new DateValueObject({ value: result.updatedAt }),
      vehicleId: result.vehicleId,
      entranceId: result.entranceId ?? undefined,
      plannedExitDate: result.plannedExitDate ? new DateValueObject({ value: result.plannedExitDate }) : undefined,
      actualExitDate: result.actualExitDate ? new DateValueObject({ value: result.actualExitDate }) : undefined,
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

  async getById(id: number): Promise<VehicleExitEntity | null> {
    const result = await db.vehicleExit.findUnique({
      where: { id },
    });

    if (!result) {
      return null;
    }

    return new VehicleExitEntity({
      createdAt: new DateValueObject({ value: result.createdAt }),
      updatedAt: new DateValueObject({ value: result.updatedAt }),
      vehicleId: result.vehicleId,
      entranceId: result.entranceId ?? undefined,
      plannedExitDate: result.plannedExitDate ? new DateValueObject({ value: result.plannedExitDate }) : undefined,
      actualExitDate: result.actualExitDate ? new DateValueObject({ value: result.actualExitDate }) : undefined,
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

  async getAll(paginationOptions: PaginationWrapperProps<VehicleExitEntity>): Promise<VehicleExitEntity[]> {
    const {
      pageIndex = 1,
      pageSize = 10,
      orderBy = 'createdAt',
      orderDirection = 'asc',
      includeAll = false,
      parameter: searchTerm = null,
    } = paginationOptions;

    const query: Prisma.VehicleExitFindManyArgs<DefaultArgs> = {
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

    const result = await db.vehicleExit.findMany(query);

    return result.map(
      (item) =>
        new VehicleExitEntity({
          createdAt: new DateValueObject({ value: item.createdAt }),
          updatedAt: new DateValueObject({ value: item.updatedAt }),
          vehicleId: item.vehicleId,
          entranceId: item.entranceId ?? undefined,
          plannedExitDate: item.plannedExitDate ? new DateValueObject({ value: item.plannedExitDate }) : undefined,
          actualExitDate: item.actualExitDate ? new DateValueObject({ value: item.actualExitDate }) : undefined,
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
    const result = await db.vehicleExit.update({
      where: { id },
      data: { isDeleted: true },
    });

    return !!result;
  }

  async update(entity: VehicleExitEntity): Promise<VehicleExitEntity> {
    const updateResult = await db.vehicleExit.update({
      where: { id: entity.id },
      data: {
        vehicleId: entity.vehicleId,
        entranceId: entity.entranceId ?? undefined,
        plannedExitDate: entity.plannedExitDate?.getStringValue() ?? null,
        actualExitDate: entity.actualExitDate?.getStringValue() ?? null,
        fromLocation: entity.fromLocation,
        toLocation: entity.toLocation,
        notes: entity.notes,
        mileage: entity.mileage,
        status: entity.status,
        driverId: entity.driverId ?? undefined,
      },
    });

    return new VehicleExitEntity({
      createdAt: new DateValueObject({ value: updateResult.createdAt }),
      updatedAt: new DateValueObject({ value: updateResult.updatedAt }),
      vehicleId: updateResult.vehicleId,
      entranceId: updateResult.entranceId ?? undefined,
      plannedExitDate: updateResult.plannedExitDate
        ? new DateValueObject({ value: updateResult.plannedExitDate })
        : undefined,
      actualExitDate: updateResult.actualExitDate
        ? new DateValueObject({ value: updateResult.actualExitDate })
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
