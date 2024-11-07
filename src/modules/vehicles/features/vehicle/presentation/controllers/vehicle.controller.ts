import { useCasesContainer } from '@/modules/shared/application/dependencies/containers/use-cases.container';
import { UseCasesContainersEnum } from '@/modules/shared/application/dependencies/dependecies-enums/use-cases-containers.enum';

import { BaseController } from '@/modules/shared/presentation/controllers/base.controller';
import { NextFunction, Request, Response } from 'express';
import { CreateVehicleUseCase } from '@modules/vehicles/features/vehicle/domain/use-cases/create-vehicle/create-vehicle.use-case';
import { GetVehicleUseCase } from '@modules/vehicles/features/vehicle/domain/use-cases/get-all-vehicle/get-all-vehicle.use-case';
import { DeleteVehicleUseCase } from '@modules/vehicles/features/vehicle/domain/use-cases/delete-vehicle/delete-vehicle-use-case';
import { UpdateVehicleUseCase } from '@modules/vehicles/features/vehicle/domain/use-cases/update-vehicle/update-vehicle.use-case';

export class VehicleController extends BaseController {
  constructor() {
    super('/vehicle');
  }

  protected initializeRoutes(): void {
    this.router.get('/getAll', this.handleAsync(this.getAll.bind(this)));
    this.router.get('/getById/:id', this.handleAsync(this.getById.bind(this)));
    this.router.post('/create', this.handleAsync(this.create.bind(this)));
    this.router.put('/update/:id', this.handleAsync(this.update.bind(this)));
    this.router.delete('/delete/:id', this.handleAsync(this.delete.bind(this)));
  }

  private async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    const paramsData = req.query;

    const getVehicleUseCase = useCasesContainer.resolve<GetVehicleUseCase>(UseCasesContainersEnum.GetVehicleUseCase);

    getVehicleUseCase
      .execute(paramsData)
      .then((response) => {
        res.json(response);
      })
      .catch((error) => {
        next(error);
      });
  }

  private async getById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    res.json({ message: `Vehicle with ID: ${id}` });
  }

  private async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const vehicleData = req.body;

    const createVehicleUseCase = useCasesContainer.resolve<CreateVehicleUseCase>(
      UseCasesContainersEnum.CreateVehicleUseCase,
    );

    createVehicleUseCase
      .execute(vehicleData)
      .then((response) => {
        res.json(response);
      })
      .catch((error) => {
        next(error);
      });
  }

  private async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const vehicleData = req.body;

    const updateVehicleUseCase = useCasesContainer.resolve<UpdateVehicleUseCase>(
      UseCasesContainersEnum.UpdateVehicleUseCase,
    );

    updateVehicleUseCase
      .execute(vehicleData)
      .then((response) => {
        res.json(response);
      })
      .catch((error) => {
        next(error);
      });
  }

  private async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const vehicleId = Number(req.params.id);

    const deleteVehicleUseCase = useCasesContainer.resolve<DeleteVehicleUseCase>(
      UseCasesContainersEnum.DeleteVehicleUseCase,
    );

    deleteVehicleUseCase
      .execute({
        id: vehicleId,
      })
      .then((response) => {
        res.json(response);
      })
      .catch((error) => {
        next(error);
      });
  }
}
