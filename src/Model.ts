
import { Map } from 'immutable';
import { IterableModel } from './IterableModel';
import { TypedMap } from './TypedMap';

export namespace Model {
  export type Data<T> = T | TypedMap<T>;
  export type Mutator<T> = (data: TypedMap<T>) => any;
  export type Updater<T> = IterableModel.Updater<T>;
}

/**
 * The most common implementation of model based on immutable Map.
 */
export abstract class Model<T> extends IterableModel<TypedMap<T>> {

  constructor(initialData: Model.Data<T>) {
    super((Map.isMap(initialData) ? initialData : Map<any, any>(initialData)) as TypedMap<T>);
  }

  protected update<K extends keyof T>(key: K, updater: Model.Updater<T[K]>): this {
    return super.update(data => data.update(key, updater));
  }

  protected get<K extends keyof T>(key: K, notSetValue?: T[K]): T[K] {
    return this.data.get(key, notSetValue);
  }

  protected set<K extends keyof T>(key: K, value: T[K]): this {
    return super.update(data => data.set(key, value));
  }

  protected has<K extends keyof T>(key: K): boolean {
    return this.data.has(key);
  }

  protected remove<K extends keyof T>(key: K): this {
    return super.update(data => data.remove(key));
  }

  protected merge(newData: Partial<T>): this {
    return super.update(data => data.merge(newData));
  }

  /**
   * Note: Only `set` and `merge` may be used mutatively.
   */
  protected withMutations(mutator: Model.Mutator<T>): this {
    return super.update(data => data.withMutations(mutator));
  }
}
