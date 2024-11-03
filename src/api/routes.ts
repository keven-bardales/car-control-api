import { Router } from 'express';
import { VehicleController } from '@modules/vehicles/features/vehicle/presentation/controllers/vehicle.controller';

export const APIVERSION = '/api/v1';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    const vehicleController = new VehicleController();
    router.use(APIVERSION + vehicleController.mainRoute, vehicleController.router);

    return router;
  }
}
