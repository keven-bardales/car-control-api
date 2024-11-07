import { BaseEntity, BaseEntityPrimitiveProps, BaseEntityProps } from '@/modules/shared/domain/entities/base.entity';
import { DateValueObject } from '@/modules/shared/domain/value-objects/date.value-object';

interface VehicleExitProps extends BaseEntityProps<number> {
  vehicleId: number;
  entranceId?: number;
  plannedExitDate?: DateValueObject;
  actualExitDate?: DateValueObject;
  fromLocation: string;
  toLocation: string;
  notes?: string;
  mileage: number;
  status: string;
}

interface VehicleExitPrimitiveProps extends BaseEntityPrimitiveProps<number> {
  vehicleId: number;
  entranceId?: number;
  plannedExitDate?: string;
  actualExitDate?: string;
  fromLocation: string;
  toLocation: string;
  notes?: string;
  mileage: number;
  status: string;
}

export class VehicleExitEntity extends BaseEntity<number, VehicleExitProps, VehicleExitPrimitiveProps> {
  public vehicleId: number;
  public entranceId?: number;
  public plannedExitDate?: DateValueObject;
  public actualExitDate?: DateValueObject;
  public fromLocation: string;
  public toLocation: string;
  public notes?: string;
  public mileage: number;
  public status: string;

  constructor(props: VehicleExitProps) {
    super(props);
    this.vehicleId = props.vehicleId;
    this.entranceId = props.entranceId;
    this.plannedExitDate = props.plannedExitDate;
    this.actualExitDate = props.actualExitDate;
    this.fromLocation = props.fromLocation;
    this.toLocation = props.toLocation;
    this.notes = props.notes;
    this.mileage = props.mileage;
    this.status = props.status;
  }

  serialize(): VehicleExitPrimitiveProps {
    return {
      ...super.serialize(),
      vehicleId: this.vehicleId,
      entranceId: this.entranceId ?? undefined,
      plannedExitDate: this.plannedExitDate?.getStringValue(),
      actualExitDate: this.actualExitDate?.getStringValue(),
      fromLocation: this.fromLocation,
      toLocation: this.toLocation,
      notes: this.notes ?? undefined,
      mileage: this.mileage,
      status: this.status,
    };
  }
}
