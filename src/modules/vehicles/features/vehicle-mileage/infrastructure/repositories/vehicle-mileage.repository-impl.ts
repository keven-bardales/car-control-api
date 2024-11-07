import { DateValueObject } from '@/modules/shared/domain/value-objects/date.value-object';
import { db } from '@/modules/shared/infrastructure/db/db';
import { VehicleMileageEntity } from '@modules/vehicles/features/vehicle-mileage//domain/entities/vehicle-mileage.entity';

interface VehicleMileageRepository {
  create(vehicleMileage: VehicleMileageEntity): Promise<VehicleMileageEntity>;
  findById(id: number): Promise<VehicleMileageEntity | null>;
  findByVehicleId(vehicleId: number): Promise<VehicleMileageEntity[]>;
  findByExitId(exitId: number): Promise<VehicleMileageEntity[]>;
  update(vehicleMileage: VehicleMileageEntity): Promise<VehicleMileageEntity>;
  delete(id: number): Promise<void>;
}

export class PrismaVehicleMileageRepository implements VehicleMileageRepository {
  async create(entity: VehicleMileageEntity): Promise<VehicleMileageEntity> {
    const result = await db.vehicleMileage.create({
      data: {
        vehicleId: entity.vehicleId,
        dateRecorded: entity.dateRecorded.getStringValue(),
        mileage: entity.mileage,
        notes: entity.notes ?? null,
        entranceId: entity.entranceId ?? null,
        exitId: entity.exitId ?? null,
      },
    });

    return new VehicleMileageEntity({
      createdAt: new DateValueObject({ value: result.createdAt }),
      updatedAt: new DateValueObject({ value: result.updatedAt }),
      dateRecorded: new DateValueObject({ value: result.dateRecorded }),
      id: result.id,
      isDeleted: result.isDeleted,
      mileage: result.mileage,
      vehicleId: result.vehicleId,
      entranceId: result.entranceId ?? undefined,
      exitId: result.exitId ?? undefined,
      notes: result.notes ?? undefined,
    });
  }

  async findById(id: number): Promise<VehicleMileageEntity | null> {
    const result = await db.vehicleMileage.findUnique({
      where: { id },
    });

    if (!result) {
      return null;
    }

    return new VehicleMileageEntity({
      id: result.id,
      vehicleId: result.vehicleId,
      dateRecorded: new DateValueObject({ value: result.dateRecorded }),
      mileage: result.mileage,
      notes: result.notes ?? undefined,
      entranceId: result.entranceId ?? undefined,
      exitId: result.exitId ?? undefined,
      createdAt: new DateValueObject({ value: result.createdAt }),
      isDeleted: result.isDeleted,
      updatedAt: new DateValueObject({ value: result.updatedAt }),
    });
  }

  async findByVehicleId(vehicleId: number): Promise<VehicleMileageEntity[]> {
    const results = await db.vehicleMileage.findMany({
      where: { vehicleId },
    });

    return results.map(
      (result) =>
        new VehicleMileageEntity({
          id: result.id,
          vehicleId: result.vehicleId,
          dateRecorded: new DateValueObject({ value: result.dateRecorded }),
          mileage: result.mileage,
          notes: result.notes ?? undefined,
          entranceId: result.entranceId ?? undefined,
          exitId: result.exitId ?? undefined,
          createdAt: new DateValueObject({ value: result.createdAt }),
          isDeleted: result.isDeleted,
          updatedAt: new DateValueObject({ value: result.updatedAt }),
        }),
    );
  }

  async findByExitId(exitId: number): Promise<VehicleMileageEntity[]> {
    const results = await db.vehicleMileage.findMany({
      where: { exitId },
    });

    return results.map(
      (result) =>
        new VehicleMileageEntity({
          id: result.id,
          vehicleId: result.vehicleId,
          dateRecorded: new DateValueObject({ value: result.dateRecorded }),
          mileage: result.mileage,
          notes: result.notes ?? undefined,
          entranceId: result.entranceId ?? undefined,
          exitId: result.exitId ?? undefined,
          createdAt: new DateValueObject({ value: result.createdAt }),
          isDeleted: result.isDeleted,
          updatedAt: new DateValueObject({ value: result.updatedAt }),
        }),
    );
  }

  async update(vehicleMileage: VehicleMileageEntity): Promise<VehicleMileageEntity> {
    const data = vehicleMileage.serialize();
    const result = await db.vehicleMileage.update({
      where: { id: vehicleMileage.id },
      data: {
        vehicleId: data.vehicleId,
        dateRecorded: new Date(data.dateRecorded),
        mileage: data.mileage,
        notes: data.notes ?? null,
        entranceId: data.entranceId ?? null,
        exitId: data.exitId ?? null,
      },
    });

    return new VehicleMileageEntity({
      id: result.id,
      vehicleId: result.vehicleId,
      dateRecorded: new DateValueObject({ value: result.dateRecorded }),
      mileage: result.mileage,
      notes: result.notes ?? undefined,
      entranceId: result.entranceId ?? undefined,
      exitId: result.exitId ?? undefined,
      createdAt: new DateValueObject({ value: result.createdAt }),
      isDeleted: result.isDeleted,
      updatedAt: new DateValueObject({ value: result.updatedAt }),
    });
  }

  async delete(id: number): Promise<void> {
    await db.vehicleMileage.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
