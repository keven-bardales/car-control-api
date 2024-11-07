import { db } from '@/modules/shared/infrastructure/db/db';
import { DateValueObject } from '@/modules/shared/domain/value-objects/date.value-object';
import { VehicleAssignedDriversEntity } from '@modules/vehicles/features/vehicle-assigned-drivers/domain/entities/vehicle-assigned-dri.entity';

interface VehicleAssignedDriversRepository {
  create(entity: VehicleAssignedDriversEntity): Promise<VehicleAssignedDriversEntity>;
  findById(id: number): Promise<VehicleAssignedDriversEntity | null>;
  findByVehicleId(vehicleId: number): Promise<VehicleAssignedDriversEntity[]>;
  findByDriverId(driverId: string): Promise<VehicleAssignedDriversEntity[]>;
  update(entity: VehicleAssignedDriversEntity): Promise<VehicleAssignedDriversEntity>;
  delete(id: number): Promise<void>;
}

export class PrismaVehicleAssignedDriversRepository implements VehicleAssignedDriversRepository {
  async create(entity: VehicleAssignedDriversEntity): Promise<VehicleAssignedDriversEntity> {
    const result = await db.vehicleAssignedDrivers.create({
      data: {
        vehicleId: entity.vehicleId,
        driverId: entity.driverId,
        dateAssigned: entity.dateAssigned.getStringValue(),
        dateUnassigned: entity.dateUnassigned?.getStringValue() ?? null,
        status: entity.status,
      },
    });

    return new VehicleAssignedDriversEntity({
      createdAt: new DateValueObject({ value: result.createdAt }),
      updatedAt: new DateValueObject({ value: result.updatedAt }),
      dateAssigned: new DateValueObject({ value: result.dateAssigned }),
      id: result.id,
      isDeleted: result.isDeleted,
      vehicleId: result.vehicleId,
      driverId: result.driverId,
      dateUnassigned: result.dateUnassigned ? new DateValueObject({ value: result.dateUnassigned }) : undefined,
      status: result.status,
    });
  }

  async findById(id: number): Promise<VehicleAssignedDriversEntity | null> {
    const result = await db.vehicleAssignedDrivers.findUnique({
      where: { id },
    });

    if (!result) {
      return null;
    }

    return new VehicleAssignedDriversEntity({
      id: result.id,
      vehicleId: result.vehicleId,
      driverId: result.driverId,
      dateAssigned: new DateValueObject({ value: result.dateAssigned }),
      dateUnassigned: result.dateUnassigned ? new DateValueObject({ value: result.dateUnassigned }) : undefined,
      status: result.status,
      createdAt: new DateValueObject({ value: result.createdAt }),
      isDeleted: result.isDeleted,
      updatedAt: new DateValueObject({ value: result.updatedAt }),
    });
  }

  async findByVehicleId(vehicleId: number): Promise<VehicleAssignedDriversEntity[]> {
    const results = await db.vehicleAssignedDrivers.findMany({
      where: { vehicleId },
    });

    return results.map(
      (result) =>
        new VehicleAssignedDriversEntity({
          id: result.id,
          vehicleId: result.vehicleId,
          driverId: result.driverId,
          dateAssigned: new DateValueObject({ value: result.dateAssigned }),
          dateUnassigned: result.dateUnassigned ? new DateValueObject({ value: result.dateUnassigned }) : undefined,
          status: result.status,
          createdAt: new DateValueObject({ value: result.createdAt }),
          isDeleted: result.isDeleted,
          updatedAt: new DateValueObject({ value: result.updatedAt }),
        }),
    );
  }

  async findByDriverId(driverId: string): Promise<VehicleAssignedDriversEntity[]> {
    const results = await db.vehicleAssignedDrivers.findMany({
      where: { driverId },
    });

    return results.map(
      (result) =>
        new VehicleAssignedDriversEntity({
          id: result.id,
          vehicleId: result.vehicleId,
          driverId: result.driverId,
          dateAssigned: new DateValueObject({ value: result.dateAssigned }),
          dateUnassigned: result.dateUnassigned ? new DateValueObject({ value: result.dateUnassigned }) : undefined,
          status: result.status,
          createdAt: new DateValueObject({ value: result.createdAt }),
          isDeleted: result.isDeleted,
          updatedAt: new DateValueObject({ value: result.updatedAt }),
        }),
    );
  }

  async update(entity: VehicleAssignedDriversEntity): Promise<VehicleAssignedDriversEntity> {
    const data = entity.serialize();
    const result = await db.vehicleAssignedDrivers.update({
      where: { id: entity.id },
      data: {
        vehicleId: data.vehicleId,
        driverId: data.driverId,
        dateAssigned: new Date(data.dateAssigned),
        dateUnassigned: data.dateUnassigned ? new Date(data.dateUnassigned) : null,
        status: data.status,
      },
    });

    return new VehicleAssignedDriversEntity({
      id: result.id,
      vehicleId: result.vehicleId,
      driverId: result.driverId,
      dateAssigned: new DateValueObject({ value: result.dateAssigned }),
      dateUnassigned: result.dateUnassigned ? new DateValueObject({ value: result.dateUnassigned }) : undefined,
      status: result.status,
      createdAt: new DateValueObject({ value: result.createdAt }),
      isDeleted: result.isDeleted,
      updatedAt: new DateValueObject({ value: result.updatedAt }),
    });
  }

  async delete(id: number): Promise<void> {
    await db.vehicleAssignedDrivers.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
