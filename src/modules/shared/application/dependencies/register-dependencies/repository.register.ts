import { VehicleRepository } from '@/modules/vehicles/features/vehicle/domain/repositories/vehicle.repository';
import { VehicleRepositoryImpl } from '@/modules/vehicles/features/vehicle/infrastructure/repositories/vehicle.repository-impl';
import { repositoryContainer } from '@modules/shared/application/dependencies/containers/repository.container';
import { RepositoryContainersEnum } from '../dependecies-enums/repository-containers.enum';
import { DriverRepository } from '@/modules/vehicles/features/driver/domain/repositories/driver.repository';
import { DriverRepositoryImpl } from '@/modules/vehicles/features/driver/infrastructure/repositories/driver.repository-impl';

export const registerRepositories = () => {
  repositoryContainer.register<VehicleRepository>(
    RepositoryContainersEnum.VehicleRepository,
    new VehicleRepositoryImpl(),
  );
  repositoryContainer.register<DriverRepository>(RepositoryContainersEnum.DriverRepository, new DriverRepositoryImpl());
};
