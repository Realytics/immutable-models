
/**
 * [copied from Immutable.js v4 typings]
 *
 * The interface to fulfill to qualify as a Value Object.
 */
export interface ValueObject {
  /**
   * True if this and the other Collection have value equality, as defined
   * by `Immutable.is()`.
   *
   * Note: This is equivalent to `Immutable.is(this, other)`, but provided to
   * allow for chained expressions.
   */
  equals(other: any): boolean;

  /**
   * Computes and returns the hashed identity for this Collection.
   *
   * The `hashCode` of a Collection is used to determine potential equality,
   * and is used when adding this to a `Set` or as a key in a `Map`, enabling
   * lookup via a different instance.
   *
   * ```js
   * const a = List([ 1, 2, 3 ]);
   * const b = List([ 1, 2, 3 ]);
   * assert(a !== b); // different instances
   * const set = Set([ a ]);
   * assert(set.has(b) === true);
   * ```
   *
   * If two values have the same `hashCode`, they are [not guaranteed
   * to be equal][Hash Collision]. If two values have different `hashCode`s,
   * they must not be equal.
   *
   * [Hash Collision]: http://en.wikipedia.org/wiki/Collision_(computer_science)
   */
  hashCode(): number;
}
