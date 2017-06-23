
import { Map } from 'immutable';
import { Model } from '../src/Model';
import { TypedMap } from '../src/TypedMap';

describe('Model', () => {
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

  it('should allow to use merge shortcut method', () => {
    // tslint:disable-next-line
    class MyModel extends Model<{ a: string, b: string, c: string }> {
      getA(): string {
        return this.get('a');
      }
      getB(): string {
        return this.get('b');
      }
      getC(): string {
        return this.get('c');
      }
      setAB(a: string, b: string): this {
        return this.merge({ a, b });
      }
    }

    const modelA = new MyModel({ a: 'foo', b: 'bar', c: 'lorem' });
    expect(modelA.getA()).toEqual('foo');
    expect(modelA.getB()).toEqual('bar');
    expect(modelA.getC()).toEqual('lorem');

    const modelB = modelA.setAB('foo2', 'bar2');
    expect(modelB.getA()).toEqual('foo2');
    expect(modelB.getB()).toEqual('bar2');
    expect(modelB.getC()).toEqual('lorem');
  });

  it('should allow to use withMutation shortcut method', () => {
    // tslint:disable-next-line
    class MyModel extends Model<{ a: string, b: string, c: string }> {
      getA(): string {
        return this.get('a');
      }
      getB(): string {
        return this.get('b');
      }
      getC(): string {
        return this.get('c');
      }
      setABC(a: string, b: string, c: string): this {
        return this.withMutations(data => data.set('a', a).set('b', b).set('c', c));
      }
    }

    const modelA = new MyModel({ a: 'foo', b: 'bar', c: 'lorem' });
    expect(modelA.getA()).toEqual('foo');
    expect(modelA.getB()).toEqual('bar');
    expect(modelA.getC()).toEqual('lorem');

    const modelB = modelA.setABC('foo1', 'bar2', 'lorem3');
    expect(modelB.getA()).toEqual('foo1');
    expect(modelB.getB()).toEqual('bar2');
    expect(modelB.getC()).toEqual('lorem3');
  });
});
