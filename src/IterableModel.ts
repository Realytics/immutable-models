
import * as Immutable from 'immutable';
import { Iterable } from 'immutable';
import { ValueObject } from './ValueObject';

/**
 * IterableModel - wrapper for any Iterable from Immutable.js package (List, Map, Set, etc.).
 * Implements ValueObject interface so we can use Immutable.is to compare two IterableModels.
 */
export abstract class IterableModel<I extends Iterable<any, any>> implements ValueObject {

  static getWrappedImmutable<I extends Iterable<any, any>>(model: IterableModel<I>): I {
    if (!(model instanceof IterableModel)) {
      throw new TypeError('Cannot get wrapped immutable from object that is not a subtype of the IterableModel.');
    }

    return model.data;
  }

  protected static readonly JSON_MEMOIZED = '@@__JSON_MEMOIZED__@@';

  protected readonly data: I;
  private memoized: { [key: string]: any } = {};

  constructor(data: I) {
    this.data = data;
  }

  equals(model: any): boolean {
    return (
      model instanceof IterableModel &&
      Immutable.is(this.data, IterableModel.getWrappedImmutable(model))
    );
  }

  hashCode(): number {
    return this.data.hashCode();
  }

  /**
   * The reason why we memoize .toJSON is it's very bad performance.
   * By default we use shallow .toObject or .toArray - if you need deep serialization, you have to write it by your own.
   * It's to prevent high memory consumption and bad performance with tools like Redux Devtools (which recursively calls .toJSON method)
   */
  toJSON(): any {
    return this.memoize(
      IterableModel.JSON_MEMOIZED,
      data => Iterable.isKeyed(data) ? data.toObject() : data.toArray()
    );
  }

  /**
   * "Update" the model - create a new one with data transformed by a updater.
   * CAUTION: There is no type check on constructor arguments.
   */
  protected update(updater: (data: I) => I, ...args: any[]): this {
    return new (Object.getPrototypeOf(this).constructor)(updater(this.data), ...args);
  }

  /**
   * To improve time and memory performance we can use memoization - it's immutable so result will be always the same.
   */
  protected memoize<M>(key: string, getter: (data: I) => M): M {
    if (!this.memoized.hasOwnProperty(key)) {
      this.memoized[key] = getter(this.data);
    }

    return this.memoized[key];
  }
}
