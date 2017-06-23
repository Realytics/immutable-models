
import { ReadonlyModel } from '../src/ReadonlyModel';

describe('ReadonlyModel', () => {
  it('should allow to create model from native object', () => {
    // tslint:disable-next-line
    class MyModel extends ReadonlyModel<{ a: string }> {
      getA(): string {
        return this.get('a');
      }
    }

    expect(new MyModel({ a: 'foo' }).getA()).toEqual('foo');
  });

  it('should serialize to json', () => {
    // tslint:disable-next-line
    class MyModel extends ReadonlyModel<{ a: string }> {}

    expect(new MyModel({ a: 'foo' }).toJSON()).toEqual({ a: 'foo' });
  });

  it('should allow to memoize property', () => {
    // tslint:disable-next-line
    class MyModel extends ReadonlyModel<{ a: string }> {
      getA(): string {
        return this.get('a');
      }

      getDoubleA(): string {
        return this.memoize('doubleA', data => `${data.a} ${data.a}`);
      }
    }

    const model = new MyModel({ a: 'foo' });
    expect(model.getA()).toEqual('foo');
    expect(model.getDoubleA()).toEqual('foo foo');
    expect(model.getDoubleA()).toEqual('foo foo');
  });
});
