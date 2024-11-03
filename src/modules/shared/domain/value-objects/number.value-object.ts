import { BaseValueObject } from '@modules/shared/domain/value-objects/base.value-object';

export class NumberValueObject extends BaseValueObject<number> {
  constructor(props: { value: number }) {
    if (props.value === null || props.value === undefined || isNaN(props.value)) {
      throw new Error('NumberValueObject requires a valid number');
    }
    super(props);
  }

  public isGreaterThan(other: NumberValueObject): boolean {
    return this._value > other.value;
  }

  public isLessThan(other: NumberValueObject): boolean {
    return this._value < other.value;
  }
}
