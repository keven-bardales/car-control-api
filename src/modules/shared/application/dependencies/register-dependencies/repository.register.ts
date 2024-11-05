import { VehicleRepository } from '@/modules/vehicles/features/vehicle/domain/repositories/vehicle.repository';
import { VehicleRepositoryImpl } from '@/modules/vehicles/features/vehicle/infrastructure/repositories/vehicle.repository-impl';
import { repositoryContainer } from '@modules/shared/application/dependencies/containers/repository.container';
import { RepositoryContainersEnum } from '../dependecies-enums/repository-containers.enum';

export const registerRepositories = () => {
  repositoryContainer.register<VehicleRepository>(
    RepositoryContainersEnum.VehicleRepository,
    new VehicleRepositoryImpl(),
  );
};
