-- AlterTable
ALTER TABLE "VehicleEntrance" ADD COLUMN     "driverId" TEXT;

-- AlterTable
ALTER TABLE "VehicleExit" ADD COLUMN     "driverId" TEXT;

-- AddForeignKey
ALTER TABLE "VehicleEntrance" ADD CONSTRAINT "VehicleEntrance_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleExit" ADD CONSTRAINT "VehicleExit_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;
