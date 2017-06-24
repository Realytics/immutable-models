
/**
 * It's similar to Model but without ImmutableJS for better performance. It's good for readonly data like timeserie.
 */
export class ReadonlyModel<T extends object> {

  protected readonly data: Readonly<T>;
  private memoized: { [key: string]: any } = {};

  constructor(data: T) {
    this.data = data;
  }

  toJSON(): any {
    return this.data;
  }

  protected get<K extends keyof T>(key: K, notSetValue?: T[K]): T[K] {
    return this.has(key) ? this.data[key] : notSetValue;
  }

  protected has<K extends keyof T>(key: K): boolean {
    return this.data.hasOwnProperty(key);
  }

  protected memoize<M>(key: string, getter: (data: Readonly<T>) => M): M {
    if (!this.memoized.hasOwnProperty(key)) {
      this.memoized[key] = getter(this.data);
    }

    return this.memoized[key];
  }
}
