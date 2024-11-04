/*
  Warnings:

  - You are about to drop the column `isCurrentAssigned` on the `VehicleAssignedDrivers` table. All the data in the column will be lost.
  - Added the required column `driverId` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateAssigned` to the `VehicleAssignedDrivers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "driverId" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "VehicleAssignedDrivers" DROP COLUMN "isCurrentAssigned",
ADD COLUMN     "dateAssigned" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dateUnassigned" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
