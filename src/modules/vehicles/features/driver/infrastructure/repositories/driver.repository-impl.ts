import { db } from '@/modules/shared/infrastructure/db/db';
import { DateValueObject } from '@/modules/shared/domain/value-objects/date.value-object';
import { PaginationWrapperProps } from '@/modules/shared/domain/wrappers/pagination-wrapper';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { DriverEntity } from '@modules/vehicles/features/driver/domain/entities/driver-entity';
import { DriverRepository } from '@modules/vehicles/features/driver/domain/repositories/driver.repository';

export class DriverRepositoryImpl implements DriverRepository {
  count(): Promise<number> {
    return db.driver.count();
  }

  async create(item: DriverEntity): Promise<DriverEntity | null> {
    const newDriver = await db.driver.create({
      data: {
        dni: item.dni,
        name: item.name,
        birthDate: item.birthdate.getStringValue(),
      },
    });

    return newDriver
      ? new DriverEntity({
          id: newDriver.id,
          dni: newDriver.dni,
          name: newDriver.name,
          createdAt: new DateValueObject({ value: newDriver.createdAt }),
          updatedAt: new DateValueObject({ value: newDriver.updatedAt }),
          isDeleted: newDriver.isDeleted,
          birthdate: new DateValueObject({ value: newDriver.birthDate }),
        })
      : null;
  }

  async getById(id: string): Promise<DriverEntity | null> {
    const driver = await db.driver.findUnique({
      where: {
        id,
      },
    });

    return driver
      ? new DriverEntity({
          id: driver.id,
          dni: driver.dni,
          name: driver.name,
          createdAt: new DateValueObject({ value: driver.createdAt }),
          updatedAt: new DateValueObject({ value: driver.updatedAt }),
          isDeleted: driver.isDeleted,
          birthdate: new DateValueObject({ value: driver.birthDate }),
        })
      : null;
  }

  async getAll(paginationOptions: PaginationWrapperProps<DriverEntity>): Promise<DriverEntity[]> {
    const {
      pageIndex = 1,
      pageSize = 10,
      orderBy = 'createdAt',
      orderDirection = 'asc',
      includeAll = false,
      parameter: searchTerm = null,
    } = paginationOptions;

    const query: Prisma.DriverFindManyArgs<DefaultArgs> = {
      orderBy: {
        [orderBy]: orderDirection,
      },
    };

    if (searchTerm) {
      query.where = {
        OR: [
          {
            dni: {
              contains: searchTerm,
            },
          },
          {
            name: {
              contains: searchTerm,
            },
          },
        ],
      };
    }

    if (!includeAll) {
      const skip = (pageIndex - 1) * pageSize;
      query.skip = skip;
      query.take = pageSize;
    }

    const result = await db.driver.findMany(query);

    return result.map(
      (item) =>
        new DriverEntity({
          id: item.id,
          dni: item.dni,
          name: item.name,
          createdAt: new DateValueObject({ value: item.createdAt }),
          updatedAt: new DateValueObject({ value: item.updatedAt }),
          isDeleted: item.isDeleted,
          birthdate: new DateValueObject({ value: item.birthDate }),
        }),
    );
  }

  async delete(id: string): Promise<boolean> {
    const result = await db.driver.delete({
      where: {
        id,
      },
    });

    return !!result;
  }

  async update(entity: DriverEntity): Promise<DriverEntity | null> {
    const updatedDriver = await db.driver.update({
      data: {
        dni: entity.dni,
        name: entity.name,
        birthDate: entity.birthdate.getStringValue(),
      },
      where: {
        id: entity.id,
      },
    });

    return updatedDriver
      ? new DriverEntity({
          id: updatedDriver.id,
          dni: updatedDriver.dni,
          name: updatedDriver.name,
          createdAt: new DateValueObject({ value: updatedDriver.createdAt }),
          updatedAt: new DateValueObject({ value: updatedDriver.updatedAt }),
          isDeleted: updatedDriver.isDeleted,
          birthdate: new DateValueObject({ value: updatedDriver.birthDate }),
        })
      : null;
  }
}
