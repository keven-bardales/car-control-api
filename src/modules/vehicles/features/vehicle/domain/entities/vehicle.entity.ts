import { BaseEntity, BaseEntityPrimitiveProps, BaseEntityProps } from '@modules/shared/domain/entities/base.entity';

interface VehicleProps extends BaseEntityProps<number> {
  make: string;
  model: string;
  year: number;
  plate: string;
  vin: string;
  imageUrl?: string | null;
  driverId: string | null;
}

interface VehiclePrimitiveProps extends BaseEntityPrimitiveProps<number> {
  make: string;
  model: string;
  year: number;
  plate: string;
  vin: string;
  imageUrl?: string | null;
  driverId: string | null;
}

export class VehicleEntity extends BaseEntity<number, VehicleProps, VehiclePrimitiveProps> {
  public make: string;
  public model: string;
  public year: number;
  public plate: string;
  public vin: string;
  public imageUrl?: string | null;
  public driverId?: string | null;

  constructor(props: VehicleProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      isDeleted: props.isDeleted,
    });
    this.make = props.make;
    this.model = props.model;
    this.year = props.year;
    this.plate = props.plate;
    this.vin = props.vin;
    this.imageUrl = props.imageUrl;
    this.driverId = props.driverId;
  }

  public serialize(): VehiclePrimitiveProps {
    return {
      id: this.getId(),
      make: this.make,
      model: this.model,
      year: this.year,
      plate: this.plate,
      vin: this.vin,
      isDeleted: this.isDeleted,
      createdAt: this.createdAt.getStringValue(),
      updatedAt: this.updatedAt.getStringValue(),
      imageUrl: this.imageUrl,
      driverId: this.driverId ?? null,
    };
  }
}
