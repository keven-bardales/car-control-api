import { useCasesContainer } from '@/modules/shared/application/dependencies/containers/use-cases.container';
import { UseCasesContainersEnum } from '@/modules/shared/application/dependencies/dependecies-enums/use-cases-containers.enum';
import { ApiExceptionType } from '@/modules/shared/domain/enums/api-exception-type.enum';
import { ApiException } from '@/modules/shared/domain/exceptions/global-exceptions';
import { BaseController } from '@/modules/shared/presentation/controllers/base.controller';
import { Request, Response } from 'express';
import { CreateVehicleUseCase } from '../../domain/use-cases/create-vehicle/create-vehicle.use-case';

export class VehicleController extends BaseController {
  constructor() {
    super('/vehicles');
  }

  protected initializeRoutes(): void {
    this.router.get('/getAll', this.handleAsync(this.getAllVehicles.bind(this)));
    this.router.get('/getById/:id', this.handleAsync(this.getVehicleById.bind(this)));
    this.router.post('/create', this.handleAsync(this.createVehicle.bind(this)));
  }

  private async getAllVehicles(): Promise<void> {
    throw new ApiException({
      message: 'Error message',
      statusCode: 400,
      type: ApiExceptionType.ValidationException,
      errors: [],
    });
  }

  private async getVehicleById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    res.json({ message: `Vehicle with ID: ${id}` });
  }

  private async createVehicle(req: Request, res: Response): Promise<void> {
    const vehicleData = req.body;

    const createVehicleUseCase = useCasesContainer.resolve<CreateVehicleUseCase>(
      UseCasesContainersEnum.CreateVehicleUseCase,
    );

    const response = await createVehicleUseCase.execute(vehicleData);
    res.status(201).json(response);
  }
}
