
import { Iterable, Record } from 'immutable';
import { TypedMap } from './TypedMap';

export type TypedRecord<T> = TypedMap<T> & Readonly<T>;

export namespace TypedRecord {
  export interface Class<T> {
    // publish record's interface (to get it, use `typeof FooRecord.T`)
    T: T;
    // publish record's instance type (to get it, use `typeof FooRecord.INSTANCE`)
    INSTANCE: TypedRecord<T>;
    // provide 'undefined' placeholder for shorter record's definitions
    UNDEFINED: TypedRecord<T>;

    new (): TypedRecord<T>;
    new (values: Partial<T> | Iterable<string, any>): TypedRecord<T>;

    (): TypedRecord<T>;
    (values: Partial<T> | Iterable<string, any>): TypedRecord<T>;
  }
}

export function TypedRecord<T>(defaultValues: T, name?: string): TypedRecord.Class<T> {
  return Record(defaultValues, name) as TypedRecord.Class<T>;
}
