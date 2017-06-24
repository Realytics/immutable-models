# Immutable Models
[![Npm version](https://img.shields.io/npm/v/immutable-models.svg?style=flat-square)](https://www.npmjs.com/package/immutable-models)
[![Build Status](https://travis-ci.org/Realytics/immutable-models.svg?branch=master)](https://travis-ci.org/Realytics/immutable-models)
[![Coverage Status](https://coveralls.io/repos/github/Realytics/immutable-models/badge.svg?branch=master)](https://coveralls.io/github/Realytics/immutable-models?branch=master)

Create **immutable models** driven by [Immutable.js](https://facebook.github.io/immutable-js) iterables.

## Installation
Immutable Models requires **Immutable.js 3.8.0 or later.**
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

Let's see some example:
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

// example usage
const user = new User({ 
  userName: 'piotr', 
  permissions: Set([Permission.DEVELOPER]) 
});
user.getUserName(); // > piotr
user.hasPermission(Permission.ADMIN); // false

// we create adminUser based on user - immutable data
const adminUser = user.addPermission(Permission.ADMIN); // make me an admin!
adminUser.getUserName(); // > piotr
adminUser.hasPermission(Permission.ADMIN); // > true
user.hasPermission(Permission.ADMIN); // false
```
Like you see, `User` class hides complexity of Immutable.js structures and contains business logic. 

## Documentation
It's not completed but we are working on it:
 * [API Reference](doc/api/README.md)


## Typings
If you are using [TypeScript](https://www.typescriptlang.org/), you don't have to install typings - they are provided in npm package.

## License
MIT
