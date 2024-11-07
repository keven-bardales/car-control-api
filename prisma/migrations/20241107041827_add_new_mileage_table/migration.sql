/*
  Warnings:

  - You are about to drop the `VehiceEntrance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VehiceExit` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `VehicleAssignedDrivers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VehiceEntrance" DROP CONSTRAINT "VehiceEntrance_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "VehiceExit" DROP CONSTRAINT "VehiceExit_vehicleId_fkey";

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "totalMilage" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "VehicleAssignedDrivers" ADD COLUMN     "status" TEXT NOT NULL;

-- DropTable
DROP TABLE "VehiceEntrance";

-- DropTable
DROP TABLE "VehiceExit";

-- CreateTable
CREATE TABLE "VehicleEntrance" (
    "id" SERIAL NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "entranceDate" TIMESTAMP(3),
    "plannedReturnDate" TIMESTAMP(3),
    "actualReturnDate" TIMESTAMP(3),
    "fromLocation" TEXT NOT NULL,
    "toLocation" TEXT NOT NULL,
    "notes" TEXT,
    "mileage" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VehicleEntrance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleExit" (
    "id" SERIAL NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "entranceId" INTEGER,
    "plannedExitDate" TIMESTAMP(3),
    "actualExitDate" TIMESTAMP(3),
    "toLocation" TEXT NOT NULL,
    "fromLocation" TEXT NOT NULL,
    "notes" TEXT,
    "mileage" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VehicleExit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleMileage" (
    "id" SERIAL NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "dateRecorded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mileage" INTEGER NOT NULL,
    "notes" TEXT,
    "entranceId" INTEGER,
    "exitId" INTEGER,

    CONSTRAINT "VehicleMileage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VehicleEntrance" ADD CONSTRAINT "VehicleEntrance_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleExit" ADD CONSTRAINT "VehicleExit_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleExit" ADD CONSTRAINT "VehicleExit_entranceId_fkey" FOREIGN KEY ("entranceId") REFERENCES "VehicleEntrance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleMileage" ADD CONSTRAINT "VehicleMileage_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleMileage" ADD CONSTRAINT "VehicleMileage_entranceId_fkey" FOREIGN KEY ("entranceId") REFERENCES "VehicleEntrance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleMileage" ADD CONSTRAINT "VehicleMileage_exitId_fkey" FOREIGN KEY ("exitId") REFERENCES "VehicleExit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
