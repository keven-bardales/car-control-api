import { CreateVehicleUseCaseImpl } from '@/modules/vehicles/features/vehicle/application/use-cases/create-vehicle/create-vehicle.use-case-impl';
import { CreateVehicleUseCase } from '@/modules/vehicles/features/vehicle/domain/use-cases/create-vehicle/create-vehicle.use-case';
import { useCasesContainer } from '@modules/shared/application/dependencies/containers/use-cases.container';
import { UseCasesContainersEnum } from '../dependecies-enums/use-cases-containers.enum';
import { repositoryContainer } from '../containers/repository.container';
import { RepositoryContainersEnum } from '../dependecies-enums/repository-containers.enum';

export const registerUseCases = () => {
  useCasesContainer.register<CreateVehicleUseCase>(
    UseCasesContainersEnum.CreateVehicleUseCase,
    new CreateVehicleUseCaseImpl(repositoryContainer.resolve(RepositoryContainersEnum.VehicleRepository)),
  );
};
