
import { Map } from 'immutable';
import { Model } from '../src/Model';

describe('IterableModel', () => {
  it('should export Model', () => {
    expect(Model).not.toBeFalsy();
  });

  it('should allow to create model both from native object and immutable Map', () => {
    // tslint:disable-next-line
    class MyModel extends Model<{ a: string }> {
      getA(): string {
        return this.get('a');
      }
    }

    expect(new MyModel({ a: 'foo' }).getA()).toEqual('foo');
    expect(new MyModel(Map<any, any>({ a: 'foo' })).getA()).toEqual('foo');
  });

  it('should allow to make crud mutations with shortcut methods', () => {
    // tslint:disable-next-line
    class MyModel extends Model<{ a: string }> {
      getA(): string {
        return this.get('a', 'a is empty');
      }
      setA(a: string): this {
        return this.set('a', a);
      }
      removeA(): this {
        return this.remove('a');
      }
    }

    let model = new MyModel({ a: 'foo' });
    expect(model.getA()).toEqual('foo');
    model = model.setA('bar');
    expect(model.getA()).toEqual('bar');
    model = model.removeA();
    expect(model.getA()).toEqual('a is empty');
    model = model.setA('foo');
    expect(model.getA()).toEqual('foo');
  });
});
