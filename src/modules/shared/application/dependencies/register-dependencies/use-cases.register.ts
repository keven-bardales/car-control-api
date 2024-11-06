import { CreateVehicleUseCaseImpl } from '@/modules/vehicles/features/vehicle/application/use-cases/create-vehicle/create-vehicle.use-case-impl';
import { CreateVehicleUseCase } from '@/modules/vehicles/features/vehicle/domain/use-cases/create-vehicle/create-vehicle.use-case';
import { useCasesContainer } from '@modules/shared/application/dependencies/containers/use-cases.container';
import { UseCasesContainersEnum } from '../dependecies-enums/use-cases-containers.enum';
import { repositoryContainer } from '../containers/repository.container';
import { RepositoryContainersEnum } from '../dependecies-enums/repository-containers.enum';
import { GetVehicleUseCase } from '@/modules/vehicles/features/vehicle/domain/use-cases/get-all-vehicle/get-all-vehicle.use-case';
import { GetVehicleUseCaseImpl } from '@/modules/vehicles/features/vehicle/application/use-cases/get-all-vehicle/get-all-vehicle.use-case-impl';
import { GetAllDriversUseCase } from '@/modules/vehicles/features/driver/domain/use-cases/get-all-drivers/get-all-drivers.use-case';
import { GetAllDriversUseCaseImpl } from '@/modules/vehicles/features/driver/application/use-cases/use-cases/get-all-drivers/get-all-drivers.use-case-impl';
import { CreateDriverUseCase } from '@/modules/vehicles/features/driver/domain/use-cases/create-driver/create-driver.use-case';
import { CreateDriverUseCaseImpl } from '@/modules/vehicles/features/driver/application/use-cases/use-cases/create-driver/create-driver.use-case-impl';

export const registerUseCases = () => {
  useCasesContainer.register<CreateVehicleUseCase>(
    UseCasesContainersEnum.CreateVehicleUseCase,
    new CreateVehicleUseCaseImpl(repositoryContainer.resolve(RepositoryContainersEnum.VehicleRepository)),
  );

  useCasesContainer.register<GetVehicleUseCase>(
    UseCasesContainersEnum.GetVehicleUseCase,
    new GetVehicleUseCaseImpl(repositoryContainer.resolve(RepositoryContainersEnum.VehicleRepository)),
  );

  useCasesContainer.register<GetAllDriversUseCase>(
    UseCasesContainersEnum.GetAllDriverUseCase,
    new GetAllDriversUseCaseImpl(repositoryContainer.resolve(RepositoryContainersEnum.DriverRepository)),
  );

  useCasesContainer.register<CreateDriverUseCase>(
    UseCasesContainersEnum.CreateDriverUseCase,
    new CreateDriverUseCaseImpl(repositoryContainer.resolve(RepositoryContainersEnum.DriverRepository)),
  );
};
