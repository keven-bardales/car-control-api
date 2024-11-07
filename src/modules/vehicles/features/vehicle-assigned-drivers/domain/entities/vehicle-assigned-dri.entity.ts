import { BaseEntity, BaseEntityPrimitiveProps, BaseEntityProps } from '@/modules/shared/domain/entities/base.entity';
import { DateValueObject } from '@/modules/shared/domain/value-objects/date.value-object';

interface VehicleAssignedDriversProps extends BaseEntityProps<number> {
  vehicleId: number;
  driverId: string;
  dateAssigned: DateValueObject;
  dateUnassigned?: DateValueObject;
  status: string;
}

interface VehicleAssignedDriversPrimitiveProps extends BaseEntityPrimitiveProps<number> {
  vehicleId: number;
  driverId: string;
  dateAssigned: string;
  dateUnassigned?: string;
  status: string;
}

export class VehicleAssignedDriversEntity extends BaseEntity<
  number,
  VehicleAssignedDriversProps,
  VehicleAssignedDriversPrimitiveProps
> {
  public vehicleId: number;
  public driverId: string;
  public dateAssigned: DateValueObject;
  public dateUnassigned?: DateValueObject;
  public status: string;

  constructor(props: VehicleAssignedDriversProps) {
    super(props);
    this.vehicleId = props.vehicleId;
    this.driverId = props.driverId;
    this.dateAssigned = props.dateAssigned;
    this.dateUnassigned = props.dateUnassigned;
    this.status = props.status;
  }

  serialize(): VehicleAssignedDriversPrimitiveProps {
    return {
      ...super.serialize(),
      vehicleId: this.vehicleId,
      driverId: this.driverId,
      dateAssigned: this.dateAssigned.getStringValue(),
      dateUnassigned: this.dateUnassigned?.getStringValue() ?? undefined,
      status: this.status,
    };
  }
}
