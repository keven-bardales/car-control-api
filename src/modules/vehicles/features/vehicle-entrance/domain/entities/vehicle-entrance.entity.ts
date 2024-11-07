import { BaseEntity, BaseEntityPrimitiveProps, BaseEntityProps } from '@/modules/shared/domain/entities/base.entity';
import { DateValueObject } from '@/modules/shared/domain/value-objects/date.value-object';

interface VehicleEntranceProps extends BaseEntityProps<number> {
  vehicleId: number;
  entranceDate?: DateValueObject;
  plannedReturnDate?: DateValueObject;
  actualReturnDate?: DateValueObject;
  fromLocation: string;
  toLocation: string;
  notes?: string;
  mileage: number;
  status: string;
  driverId?: string | null;
}

interface VehicleEntrancePrimitiveProps extends BaseEntityPrimitiveProps<number> {
  vehicleId: number;
  entranceDate?: string;
  plannedReturnDate?: string;
  actualReturnDate?: string;
  fromLocation: string;
  toLocation: string;
  notes?: string;
  mileage: number;
  status: string;
  driverId?: string | null;
}

export class VehicleEntranceEntity extends BaseEntity<number, VehicleEntranceProps, VehicleEntrancePrimitiveProps> {
  public vehicleId: number;
  public entranceDate?: DateValueObject;
  public plannedReturnDate?: DateValueObject;
  public actualReturnDate?: DateValueObject;
  public fromLocation: string;
  public toLocation: string;
  public notes?: string;
  public mileage: number;
  public status: string;
  public driverId?: string | null;

  constructor(props: VehicleEntranceProps) {
    super(props);
    this.vehicleId = props.vehicleId;
    this.entranceDate = props.entranceDate;
    this.plannedReturnDate = props.plannedReturnDate;
    this.actualReturnDate = props.actualReturnDate;
    this.fromLocation = props.fromLocation;
    this.toLocation = props.toLocation;
    this.notes = props.notes;
    this.mileage = props.mileage;
    this.status = props.status;
    this.driverId = props.driverId;
  }

  serialize(): VehicleEntrancePrimitiveProps {
    return {
      ...super.serialize(),
      vehicleId: this.vehicleId,
      entranceDate: this.entranceDate?.getStringValue(),
      plannedReturnDate: this.plannedReturnDate?.getStringValue(),
      actualReturnDate: this.actualReturnDate?.getStringValue(),
      fromLocation: this.fromLocation,
      toLocation: this.toLocation,
      notes: this.notes ?? undefined,
      mileage: this.mileage,
      status: this.status,
      driverId: this.driverId,
    };
  }
}
