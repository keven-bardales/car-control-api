import { useCasesContainer } from '@/modules/shared/application/dependencies/containers/use-cases.container';
import { UseCasesContainersEnum } from '@/modules/shared/application/dependencies/dependecies-enums/use-cases-containers.enum';

import { BaseController } from '@/modules/shared/presentation/controllers/base.controller';
import { NextFunction, Request, Response } from 'express';
import { GetAllDriversUseCase } from '@modules/vehicles/features/driver/domain/use-cases/get-all-drivers/get-all-drivers.use-case';
import { CreateDriverUseCase } from '@modules/vehicles/features/driver/domain/use-cases/create-driver/create-driver.use-case';

export class DriverController extends BaseController {
  constructor() {
    super('/driver');
  }

  protected initializeRoutes(): void {
    this.router.get('/getAll', this.handleAsync(this.getAll.bind(this)));
    this.router.get('/getById/:id', this.handleAsync(this.getById.bind(this)));
    this.router.post('/create', this.handleAsync(this.create.bind(this)));
  }

  private async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    const paramsData = req.query;

    const getAllDriverUseCase = useCasesContainer.resolve<GetAllDriversUseCase>(
      UseCasesContainersEnum.GetAllDriverUseCase,
    );

    getAllDriverUseCase
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
    res.json({ message: `Driver with ID: ${id}` });
  }

  private async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const vehicleData = req.body;

    const createDriverUseCase = useCasesContainer.resolve<CreateDriverUseCase>(
      UseCasesContainersEnum.CreateDriverUseCase,
    );

    createDriverUseCase
      .execute(vehicleData)
      .then((response) => {
        res.json(response);
      })
      .catch((error) => {
        next(error);
      });
  }
}
