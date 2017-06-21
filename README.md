# Immutable Models
[![Npm version](https://img.shields.io/npm/v/immutable-models.svg?style=flat-square)](https://www.npmjs.com/package/immutable-models)
[![Build Status](https://travis-ci.org/Realytics/immutable-models.svg?branch=master)](https://travis-ci.org/Realytics/immutable-models)
[![Coverage Status](https://coveralls.io/repos/github/Realytics/immutable-models/badge.svg?branch=master)](https://coveralls.io/github/Realytics/immutable-models?branch=master)

Create **immutable models** driven by [Immutable.js](https://facebook.github.io/immutable-js) iterables.

**WARNING: PACKAGE IN DEVELOPMENT**

## Installation
Immutable Models requires **Immutable.js 3.8.1 or later.**
```sh
npm install --save immutable-models
```
This assumes that you’re using [npm](http://npmjs.com/) package manager with a module bundler like 
[Webpack](http://webpack.github.io/) or [Browserify](http://browserify.org/) to consume 
[CommonJS modules](http://webpack.github.io/docs/commonjs.html).

## Motivation
Immutable.js is a great library for dealing with immutable data. However, it doesn't provide the easy way for **hermetization**.
Because of that, we can't create *simple* and *defined* model interfaces - everything is public and (excluding `Records`) there
is no way to put additional logic in these models. 

Immutable Models wraps immutable structures and provides interfaces defined by a developer. 

## Usage
### IterableModel
The basic class of this package is `IterableModel<I extends Iterable<any, any>>`. It's a simple wrapper for any iterable
from Immutable.js.

Let's say we want to create well defined `ModelHistory` model - see how simple it is:

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

`IterableModel` implements `ValueObject` interface so it works well with `Immutable.is` function - content, not reference means.

### Model
More common use-cases are classic models like `User` or `Post`. That's why we've created another class - `Model<T>`.
Basically it extends `IterableModel<Map<T>>` and provides some shortcut methods.

Example of user model:
```typescript
import { Model } from 'immutable-models';
import { Permission } from './Permission';
import { Set } from 'immutable';

interface UserShape {
  userName: string;
  firstName?: string;
  lastName?: string;
  createdBy?: User;
  permissions?: Set<Permission>;
}

export class User extends Model<UserShape> {
  getUserName(): string {
    return this.get('userName');
  }
  
  getFirstName(): string {
    return this.get('firstName');
  }
  
  getLastName(): string {
    return this.get('lastName');
  }
  
  getFullName(): string {
    return `${this.getFirstName()} ${this.getLastName()}`;
  }
  
  getCreatedBy(): User {
    return this.get('createdBy');
  }
  
  getPermissions(): Set<Permission> {
    return this.get('permissions', Set<Permission>());
  }
  
  hasPermission(permission: Permission): boolean {
    return this.getPermissions().contains(permission);
  }
}
```
## Typings
If you are using [TypeScript](https://www.typescriptlang.org/), you don't have to install typings - they are provided in npm package.

## License
MIT
