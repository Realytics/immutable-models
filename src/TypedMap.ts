
import { Iterable, Map } from 'immutable';

export interface TypedMap<T> extends Map<keyof T, any> {
  set<K extends keyof T>(key: K, value: T[K]): this;
  delete(key: keyof T): this;
  remove(key: keyof T): this;
  clear(): this;
  update(updater: (value: this) => this): this;
  update<K extends keyof T>(key: K, updater: (value: T[K]) => T[K]): this;
  update<K extends keyof T>(key: K, notSetValue: T[K], updater: (value: T[K]) => T[K]): this;
  merge<K extends keyof T>(...iterables: Iterable<K, T[K]>[]): this;
  merge(...iterables: (this | Partial<T>)[]): this;
  mergeWith<K extends keyof T>(
    merger: (previous?: Partial<T>, next?: Partial<T>, key?: K) => any,
    ...iterables: Iterable<K, T[K]>[]
  ): this;
  mergeWith(
    merger: (previous?: Partial<T>, next?: Partial<T>, key?: keyof T) => any,
    ...iterables: (this | Partial<T>)[]
  ): this;
  mergeDeep<K extends keyof T>(...iterables: Iterable<K, T[K]>[]): this;
  mergeDeep(...iterables: (this | Partial<T>)[]): this;
  mergeDeepWith<K extends keyof T>(
    merger: (previous?: Partial<T>, next?: Partial<T>, key?: K) => any,
    ...iterables: Iterable<K, T[K]>[]
  ): this;
  mergeDeepWith(
    merger: (previous?: Partial<T>, next?: Partial<T>, key?: keyof T) => any,
    ...iterables: (this | Partial<T>)[]
  ): this;
  mergeIn(keyPath: any[] | Iterable<any, any>, ...iterables: any[]): this;
  mergeDeepIn(keyPath: any[] | Iterable<any, any>, ...iterables: any[]): this;
  setIn(keyPath: any[] | Iterable<any, any>, value: any): this;
  deleteIn(keyPath: any[] | Iterable<any, any>): this;
  removeIn(keyPath: any[] | Iterable<any, any>): this;
  updateIn(keyPath: any[] | Iterable<any, any>, updater: (value: any) => any): this;
  updateIn(keyPath: any[] | Iterable<any, any>, notSetValue: any, updater: (value: any) => any): this;
  withMutations(mutator: (mutable: this) => this): this;
  asMutable(): this;
  asImmutable(): this;
}
