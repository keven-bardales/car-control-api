import { BaseValueObject } from '@modules/shared/domain/value-objects/base.value-object';

export class DateValueObject extends BaseValueObject<Date> {
  constructor(props: { value: Date | string }) {
    const value = typeof props.value === 'string' ? new Date(props.value) : props.value;

    if (!(value instanceof Date) || isNaN(value.getTime())) {
      throw new Error('DateValueObject requires a valid Date instance');
    }
    super({
      value,
    });
  }

  public isBefore(other: DateValueObject): boolean {
    return this._value < other.value;
  }

  public isAfter(other: DateValueObject): boolean {
    return this._value > other.value;
  }

  public format(locale: string = 'en-US', options?: Intl.DateTimeFormatOptions): string {
    return this._value.toLocaleDateString(locale, options);
  }

  public getStringValue(): string {
    const year = this.value.getFullYear();
    const month = String(this.value.getMonth() + 1).padStart(2, '0');
    const day = String(this.value.getDate()).padStart(2, '0');
    const hours = String(this.value.getHours()).padStart(2, '0');
    const minutes = String(this.value.getMinutes()).padStart(2, '0');
    const seconds = String(this.value.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }
}
