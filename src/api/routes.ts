import { Router } from 'express';
import { VehicleController } from '@modules/vehicles/features/vehicle/presentation/controllers/vehicle.controller';
import { DriverController } from '@/modules/vehicles/features/driver/presentation/controllers/driver.controller';

export const APIVERSION = '/api/v1';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    const vehicleController = new VehicleController();
    router.use(APIVERSION + vehicleController.mainRoute, vehicleController.router);

    const driverControler = new DriverController();

    router.use(APIVERSION + driverControler.mainRoute, driverControler.router);

    return router;
  }
}
