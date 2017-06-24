# API Reference

 * [`IterableModel`](#iterablemodel)
   * [`static getWrappedImmutable(model)`](#iterablemodel-static-getwrappedimmutablemodel)
   * [`new (iterable)`](#iterablemodel-new-iterable)
   * [`equals(model)`](#valueobject-equals)
   * [`hashCode()`](#valueobject-hashcode)
   * [`toJSON()`](#iterablemodel-tojson)
   * [`#data`](#iterablemodel-protected-data)
   * [`#update(updater, ...args)`](#iterablemodel-protected-updateupdater-args)
   * [`#memoize(key, getter)`](#iterablemodel-protected-memoizekey-getter)
 * [`Model`](#model)
   * [`TODO: new (data)`]()
   * [`equals(model)`](#valueobject-equals)
   * [`hashCode()`](#valueobject-hashcode)
   * [`toJSON()`](#iterablemodel-tojson)
   * [`TODO: #update(key, updater)`]()
   * [`TODO: #get(key, notSetValue)`]()
   * [`TODO: #set(key, value)`]()
   * [`TODO: #has(key)`]()
   * [`TODO: #remove(key)`]()
   * [`TODO: #merge(newData)`]()
   * [`TODO: #withMutations(mutator)`]()
 * [`TODO: ReadonlyModel`]()
   * [`TODO: toJSON()`]()
   * [`TODO: #get(key, notSetValue)`]()
   * [`TODO: #has(key)`]()
   * [`TODO: #memoize(key, getter)`]()
 * [`TODO: TypedRecord`]()
 * [`Interfaces`](#interfaces)
   * [`TypedMap`](#typedmap)
   * [`ValueObject`](#valueobject)
   
## `IterableModel`
The basic class of this package is `IterableModel<I extends Iterable<any, any>>`. It's a simple wrapper for any iterable
from Immutable.js (`List`, `Map`, `Set`, etc.). With this class we can create well defined interfaces and hide Immutable.js complexity.
It also implements [`ValueObject`](#valueobject) interface so we can use `Immutable.is` to compare two `IterableModel`s.

#### Example
```typescript
import { Stack } from 'immutable';
import { IterableModel } from 'immutable-models';

export class ModelHistory<T> extends IterableModel<Stack<T>> {
  constructor(stack = Stack<T>()) {
    super(stack);
  }

  getCurrent(): T {
    return this.data.peek();
  }

  applyChange(model: T): this {
    return this.update(data => data.push(model));
  }

  undoChange(): this {
    return this.update(data => data.pop());
  }

  commitChanges(): this {
    return this.update(data => data.take(1).toStack());
  }

  rollbackChanges(): this {
    return this.update(data => data.takeLast(1).toStack());
  }
}
```

### `[IterableModel] static getWrappedImmutable(model)`
Get wrapped Immutable.js iterable from `IterableModel`. Throws error if passed model is not instance of `IterableModel`.

 * `model: IterableModel<I>` - model to get iterable from

Returns  `I extends Iterable<any, any>` - Iterable wrapped by model

### `[IterableModel] new (iterable)`
 * `iterable: I extends Iterable<any, any>` - Immutable.js iterable to wrap.

### `[IterableModel] toJSON()`
Serialize model to native object. By default we use shallow `.toObject` or `.toArray` from Immutable.js - if you need 
deep serialization, you have to write it by your own (but probably it's everything you need - `JSON.stringify` calls
`.toJSON` recursively)

#### Note
This method uses memoization to prevent performance issue (for example if you use Redux Devtools, calling
`.toJSON` on every dispatch can be costly).

### `[IterableModel] protected data`
Property which holds wrapped Immutable.js iterable. You can access it directly inside your model.

### `[IterableModel] protected update(updater, ...args)`
The way we can "mutate" iterable model is creating new one with new immutable data. To achieve it, use
`update` method. 
 * `updater: <I extends Iterable<any, any>>(data: I) => I` - function which returns new iterable data based on
 previous one.
 * `...args: any[]` - additional args passed to constructor

Returns: `this` - new instance of model with new iterable

#### Note:
There is no typechecking in internal part of update method - if you want to have constructor signature incompatible with 
`IterableModel`, you have to modify `update` method.

### `[IterableModel] protected memoize(key, getter)`
To improve time and memory performance we can use memoization - it's immutable so result will be always the same.
 * `key: string` - unique key to store memoization
 * `getter: <I extends Iterable<any, any>, M>(data: I) => M` - function which should return desired value from iterable data
 
Returns: `M` - result of getter function.
 
## `Model`
More common use-cases are classic models like `User` or `Post`. That's why we've created another class - `Model<T>`.
Basically it extends `IterableModel<Map<T>>` and provides few shortcut methods.

#### Example
```typescript
import { Model } from 'immutable-models';
import { Permission } from './Permission';
import { Set } from 'immutable';

interface UserShape {
  userName: string
  createdBy?: User;
  permissions?: Set<Permission>;
}

export class User extends Model<UserShape> {
  getUserName(): string {
    return this.get('userName');
  }
    
  getCreatedBy(): User {
    return this.get('createdBy');
  }
  
  isAdmin(): boolean {
    return this.hasPermission(Permission.ADMIN);
  }
  
  isCreatedByAdmin(): boolean {
    return this.getCreatedBy() ? this.getCreatedBy().isAdmin() : false;
  }
  
  getPermissions(): Set<Permission> {
    return this.get('permissions', Set<Permission>());
  }
  
  hasPermission(permission: Permission): boolean {
    return this.getPermissions().contains(permission);
  }
  
  addPermission(permission: Permission): this {
    return this.update('permissions', permissions => permissions.add(permission));
  }
}
```
