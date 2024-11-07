import { BaseEntity, BaseEntityPrimitiveProps, BaseEntityProps } from '@/modules/shared/domain/entities/base.entity';
import { DateValueObject } from '@/modules/shared/domain/value-objects/date.value-object';

interface VehicleMileageProps extends BaseEntityProps<number> {
  vehicleId: number;
  dateRecorded: DateValueObject;
  mileage: number;
  notes?: string;
  entranceId?: number;
  exitId?: number;
}

interface VehicleMileagePrimitiveProps extends BaseEntityPrimitiveProps<number> {
  vehicleId: number;
  dateRecorded: string;
  mileage: number;
  notes?: string;
  entranceId?: number;
  exitId?: number;
}

export class VehicleMileageEntity extends BaseEntity<number, VehicleMileageProps, VehicleMileagePrimitiveProps> {
  public vehicleId: number;
  public dateRecorded: DateValueObject;
  public mileage: number;
  public notes?: string;
  public entranceId?: number;
  public exitId?: number;

  constructor(props: VehicleMileageProps) {
    super(props);
    this.vehicleId = props.vehicleId;
    this.dateRecorded = props.dateRecorded;
    this.mileage = props.mileage;
    this.notes = props.notes;
    this.entranceId = props.entranceId;
    this.exitId = props.exitId;
  }

  serialize(): VehicleMileagePrimitiveProps {
    return {
      ...super.serialize(),
      vehicleId: this.vehicleId,
      dateRecorded: this.dateRecorded.getStringValue(),
      mileage: this.mileage,
      notes: this.notes ?? undefined,
      entranceId: this.entranceId ?? undefined,
      exitId: this.exitId ?? undefined,
    };
  }
}
