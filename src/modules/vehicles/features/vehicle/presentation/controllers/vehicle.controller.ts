import { ApiExceptionType } from '@/modules/shared/domain/enums/api-exception-type.enum';
import { ApiException } from '@/modules/shared/domain/exceptions/global-exceptions';
import { BaseController } from '@/modules/shared/presentation/controllers/base.controller';
import { Request, Response } from 'express';

export class VehicleController extends BaseController {
  constructor() {
    super('/vehicles');
  }

  protected initializeRoutes(): void {
    this.router.get('/', this.handleAsync(this.getAllVehicles.bind(this)));
    this.router.get('/:id', this.handleAsync(this.getVehicleById.bind(this)));
    this.router.post('/', this.handleAsync(this.createVehicle.bind(this)));
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
    res.status(201).json({ message: 'Vehicle created', data: vehicleData });
  }
}
