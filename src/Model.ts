
import { Map } from 'immutable';
import { IterableModel } from './IterableModel';
import { TypedMap } from './TypedMap';

/**
 * The most common implementation of model based on immutable Map.
 */
export abstract class Model<T> extends IterableModel<TypedMap<T>> {

  constructor(initialData: T | TypedMap<T>) {
    super((Map.isMap(initialData) ? initialData : Map<any, any>(initialData)) as TypedMap<T>);
  }

  protected get<K extends keyof T>(key: K, notSetValue?: T[K]): T[K] {
    return this.data.get(key, notSetValue);
  }

  protected set<K extends keyof T>(key: K, value: T[K]): this {
    return this.update(data => data.set(key, value));
  }

  protected remove<K extends keyof T>(key: K): this {
    return this.update(data => data.remove(key));
  }

  protected merge(newData: Partial<T>): this {
    return this.update(data => data.merge(newData));
  }

  /**
   * Note: Only `set` and `merge` may be used mutatively.
   */
  protected withMutations(mutator: (mutable: TypedMap<T>) => any): this {
    return this.update(data => data.withMutations(mutator));
  }
}
