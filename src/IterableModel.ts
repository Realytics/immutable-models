
import * as Immutable from 'immutable';
import { Iterable } from 'immutable';
import { ValueObject } from './ValueObject';

export namespace IterableModel {
  export type Updater<T> = (data: T) => T;
}

/**
 * The basic class of this package is IterableModel<I extends Iterable<any, any>>. It's a simple wrapper for any iterable from Immutable.js
 * (List, Map, Set, etc.). With this class we can create well defined interfaces and hide Immutable.js complexity. It also implements
 * ValueObject interface so we can use Immutable.is to compare two IterableModels.
 */
export abstract class IterableModel<I extends Iterable<any, any>> implements ValueObject {

  /**
   * Get wrapped Immutable.js iterable from `IterableModel`. Throws error if passed model is not instance of `IterableModel`.
   */
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
   * The way we can "mutate" iterable model is creating new one with new immutable data. To achieve it, use update method.
   *
   * NOTE:
   * There is no typechecking in internal part of update method - if you want to have constructor signature incompatible with IterableModel,
   * you have to modify update method.
   */
  protected update(updater: IterableModel.Updater<I>, ...args: any[]): this {
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
