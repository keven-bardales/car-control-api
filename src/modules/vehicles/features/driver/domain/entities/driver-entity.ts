import { BaseEntity, BaseEntityPrimitiveProps, BaseEntityProps } from '@/modules/shared/domain/entities/base.entity';
import { DateValueObject } from '@/modules/shared/domain/value-objects/date.value-object';

interface DriverProps extends BaseEntityProps<string> {
  name: string;
  dni: string;
  birthdate: DateValueObject;
}

interface DriverPrimitiveProps extends BaseEntityPrimitiveProps<string> {
  name: string;
  dni: string;
  birthdate: string;
}

export class DriverEntity extends BaseEntity<string, DriverProps, DriverPrimitiveProps> {
  public name: string;
  public dni: string;
  public birthdate: DateValueObject;

  constructor(props: DriverProps) {
    super(props);
    this.name = props.name;
    this.dni = props.dni;
    this.birthdate = props.birthdate;
  }

  serialize(): DriverPrimitiveProps {
    return {
      ...super.serialize(),
      name: this.name,
      dni: this.dni,
      birthdate: this.birthdate.value.toISOString(),
    };
  }
}
