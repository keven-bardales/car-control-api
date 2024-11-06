import { DateValueObject } from '@modules/shared/domain/value-objects/date.value-object';

export interface BaseEntityProps<ID> {
  id: ID;
  createdAt: DateValueObject;
  updatedAt: DateValueObject;
  isDeleted: boolean;
}

export interface BaseEntityPrimitiveProps<ID> {
  id: ID;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export abstract class BaseEntity<ID, BASEPROPS, PRIMITIVEPROPS> {
  public readonly id: ID;
  public readonly createdAt: DateValueObject;
  public readonly updatedAt: DateValueObject;
  public isDeleted: boolean;

  constructor(props: BaseEntityProps<ID>) {
    this.id = props.id;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.isDeleted = props.isDeleted;
  }

  public equals(other: BaseEntity<ID, BASEPROPS, PRIMITIVEPROPS>): boolean {
    return this.id === other.id;
  }

  public getId(): ID {
    return this.id;
  }

  public getCreatedAt(): DateValueObject {
    return this.createdAt;
  }

  public getUpdatedAt(): DateValueObject {
    return this.updatedAt;
  }

  public markAsDeleted(): void {
    this.isDeleted = true;
  }

  serialize(): BaseEntityPrimitiveProps<ID> {
    return {
      id: this.id,
      createdAt: this.createdAt.value.toISOString(),
      updatedAt: this.updatedAt.value.toISOString(),
      isDeleted: this.isDeleted,
    };
  }
}
