
/**
 * It's similar to Model but without ImmutableJS for better performance. It's good for readonly data like timeserie.
 */
export class ReadonlyModel<T> {

  protected readonly data: Readonly<T>;
  private memoized: { [key: string]: any } = {};

  constructor(data: T) {
    this.data = data;
  }

  toJSON(): Readonly<T> {
    return this.data;
  }

  protected get<K extends keyof T>(key: K): T[K] {
    return this.data[key];
  }

  protected memoize<M>(key: string, getter: (data: Readonly<T>) => M): M {
    if (!this.memoized.hasOwnProperty(key)) {
      this.memoized[key] = getter(this.data);
    }

    return this.memoized[key];
  }
}
