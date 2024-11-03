export abstract class BaseValueObject<T> {
  protected readonly _value: T;

  constructor(props: { value: T }) {
    this._value = props.value;
  }

  public equals(other: BaseValueObject<T>): boolean {
    return this._value === other._value;
  }

  public get value(): T {
    return this._value;
  }
}
