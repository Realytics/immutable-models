
import { List, Map, OrderedMap, OrderedSet, Seq, Set, Stack } from 'immutable';
import { IterableModel } from '../src/IterableModel';
import { TypedRecord } from '../src/TypedRecord';

describe('IterableModel', () => {
  it('should allow to define model with list as iterable', () => {
    // tslint:disable-next-line
    class ListModel extends IterableModel<List<string>> {
      getFirst(): string {
        return this.data.first();
      }
      getLast(): string {
        return this.data.last();
      }
      addItem(item: string): this {
        return this.update(data => data.push(item));
      }
    }

    const listModel = new ListModel(List(['a', 'b', 'c']));
    expect(listModel).not.toBeFalsy();
    expect(listModel.getFirst()).toEqual('a');
    expect(listModel.getLast()).toEqual('c');

    const nextListModel = listModel.addItem('d');
    expect(nextListModel).not.toBeFalsy();
    expect(nextListModel.getFirst()).toEqual('a');
    expect(nextListModel.getLast()).toEqual('d');
  });

  it('should allow to define model with map as iterable', () => {
    // tslint:disable-next-line
    class MapModel extends IterableModel<Map<string, string>> {
      getA(): string {
        return this.data.get('a');
      }
      getC(): string {
        return this.data.get('c');
      }
      setA(a: string): this {
        return this.update(data => data.set('a', a));
      }
    }

    const mapModel = new MapModel(Map({ 'a': 'foo', 'c': 'bar' }));
    expect(mapModel).not.toBeFalsy();
    expect(mapModel.getA()).toEqual('foo');
    expect(mapModel.getC()).toEqual('bar');

    const nextMapModel = mapModel.setA('foo2');
    expect(nextMapModel).not.toBeFalsy();
    expect(nextMapModel.getA()).toEqual('foo2');
    expect(nextMapModel.getC()).toEqual('bar');
  });

  it('should allow to define model with ordered map as iterable', () => {
    // tslint:disable-next-line
    class OrderedMapModel extends IterableModel<OrderedMap<string, string>> {
      getA(): string {
        return this.data.get('a');
      }
      getC(): string {
        return this.data.get('c');
      }
      setA(a: string): this {
        return this.update(data => data.set('a', a));
      }
    }

    const mapModel = new OrderedMapModel(OrderedMap({ 'a': 'foo', 'c': 'bar' }));
    expect(mapModel).not.toBeFalsy();
    expect(mapModel.getA()).toEqual('foo');
    expect(mapModel.getC()).toEqual('bar');

    const nextMapModel = mapModel.setA('foo2');
    expect(nextMapModel).not.toBeFalsy();
    expect(nextMapModel.getA()).toEqual('foo2');
    expect(nextMapModel.getC()).toEqual('bar');
  });

  it('should allow to define model with set as iterable', () => {
    // tslint:disable-next-line
    class SetModel extends IterableModel<Set<string>> {
      getSize(): number {
        return this.data.size;
      }
      hasD(): boolean {
        return this.data.contains('d');
      }
      addItem(item: string): this {
        return this.update(data => data.add(item));
      }
    }

    const setModel = new SetModel(Set(['a', 'b', 'c']));
    expect(setModel).not.toBeFalsy();
    expect(setModel.getSize()).toEqual(3);
    expect(setModel.hasD()).toEqual(false);

    const nextSetModel = setModel.addItem('d');
    expect(nextSetModel).not.toBeFalsy();
    expect(nextSetModel.getSize()).toEqual(4);
    expect(nextSetModel.hasD()).toEqual(true);

    const nextNextSetModel = nextSetModel.addItem('a');
    expect(nextNextSetModel).not.toBeFalsy();
    expect(nextSetModel.getSize()).toEqual(4);
  });

  it('should allow to define model with ordered set as iterable', () => {
    // tslint:disable-next-line
    class OrderedSetModel extends IterableModel<OrderedSet<string>> {
      getSize(): number {
        return this.data.size;
      }
      hasD(): boolean {
        return this.data.contains('d');
      }
      addItem(item: string): this {
        return this.update(data => data.add(item));
      }
    }

    const setModel = new OrderedSetModel(Set(['a', 'b', 'c']));
    expect(setModel).not.toBeFalsy();
    expect(setModel.getSize()).toEqual(3);
    expect(setModel.hasD()).toEqual(false);

    const nextSetModel = setModel.addItem('d');
    expect(nextSetModel).not.toBeFalsy();
    expect(nextSetModel.getSize()).toEqual(4);
    expect(nextSetModel.hasD()).toEqual(true);

    const nextNextSetModel = nextSetModel.addItem('a');
    expect(nextNextSetModel).not.toBeFalsy();
    expect(nextSetModel.getSize()).toEqual(4);
  });

  it('should allow to define model with stack as iterable', () => {
    // tslint:disable-next-line
    class StackModel extends IterableModel<Stack<string>> {
      getSize(): number {
        return this.data.size;
      }
      getTop(): string {
        return this.data.peek();
      }
      addItem(item: string): this {
        return this.update(data => data.push(item));
      }
    }

    const stackModel = new StackModel(Stack(['a', 'b', 'c']));
    expect(stackModel).not.toBeFalsy();
    expect(stackModel.getSize()).toEqual(3);
    expect(stackModel.getTop()).toEqual('a');

    const nextStackModel = stackModel.addItem('d');
    expect(nextStackModel).not.toBeFalsy();
    expect(nextStackModel.getSize()).toEqual(4);
    expect(nextStackModel.getTop()).toEqual('d');
  });

  it('should allow to define model with seq as iterable', () => {
    // tslint:disable-next-line
    class SeqModel extends IterableModel<Seq<string, string>> {
      getFirst(): string {
        return this.data.first();
      }
      getLast(): string {
        return this.data.last();
      }
      addItem(item: string): this {
        return this.update(data => data.concat([[this.data.size, item]]).toSeq());
      }
    }

    const seqModel = new SeqModel(Seq({ 1: 'a', 2: 'b', 3: 'c' }));
    expect(seqModel).not.toBeFalsy();
    expect(seqModel.getFirst()).toEqual('a');
    expect(seqModel.getLast()).toEqual('c');

    const nextSeqModel = seqModel.addItem('d');
    expect(nextSeqModel).not.toBeFalsy();
    expect(nextSeqModel.getFirst()).toEqual('a');
    expect(nextSeqModel.getLast()).toEqual('d');
  });

  it('should allow to define model with record as iterable', () => {
    interface RecordShape {
      a: string;
      b: string;
    }
    // tslint:disable-next-line
    class RecordModel extends IterableModel<TypedRecord<RecordShape>> {
      getA(): string {
        return this.data.a;
      }
      getB(): string {
        return this.data.b;
      }
      setA(a: string): this {
        return this.update(data => data.set('a', a));
      }
    }

    const recordModel = new RecordModel(TypedRecord<RecordShape>({ a: 'foo', b: 'bar' })());
    expect(recordModel).not.toBeFalsy();
    expect(recordModel.getA()).toEqual('foo');
    expect(recordModel.getB()).toEqual('bar');

    const nextRecordModel = recordModel.setA('foo2');
    expect(nextRecordModel).not.toBeFalsy();
    expect(nextRecordModel.getA()).toEqual('foo2');
    expect(nextRecordModel.getB()).toEqual('bar');
  });

  it('should allow to get wrapped immutable', () => {
    // tslint:disable-next-line
    class ListModel extends IterableModel<List<string>> {
      addItem(item: string): this {
        return this.update(data => data.push(item));
      }
    }

    const initialList = List<string>(['a', 'b', 'c']);
    const initialModel = new ListModel(initialList);

    expect(IterableModel.getWrappedImmutable<List<string>>(initialModel)).toBe(initialList);

    const nextModel = initialModel.addItem('d');
    expect(IterableModel.getWrappedImmutable<List<string>>(nextModel)).not.toBe(initialList);
    expect(IterableModel.getWrappedImmutable<List<string>>(nextModel)).toBeInstanceOf(List);
    expect(IterableModel.getWrappedImmutable<List<string>>(nextModel).toArray()).toEqual(['a', 'b', 'c', 'd']);
  });

  it('should throw an error when trying to get wrapped immutable from not iterable model', () => {
    expect(() => IterableModel.getWrappedImmutable(undefined)).toThrow();
    expect(() => IterableModel.getWrappedImmutable(null)).toThrow();
    expect(() => IterableModel.getWrappedImmutable(1 as any)).toThrow();
    expect(() => IterableModel.getWrappedImmutable('abc' as any)).toThrow();
    expect(() => IterableModel.getWrappedImmutable(List() as any)).toThrow();
  });

  it('should use Immutable.is for wrapped immutable in equals method', () => {
    // tslint:disable-next-line
    class ListModel extends IterableModel<List<string>> {
    }

    const listA = new ListModel(List(['a', 'b', 'c']));
    const listB = new ListModel(List(['a', 'c']));
    const listC = new ListModel(List(['a', 'b', 'c']));

    expect(listA.equals(listB)).toEqual(false);
    expect(listB.equals(listA)).toEqual(false);
    expect(listA.equals(undefined)).toEqual(false);
    expect(listA.equals(1)).toEqual(false);
    expect(listA.equals(null)).toEqual(false);
    expect(listA.equals('listA')).toEqual(false);
    expect(listA.equals(listC)).toEqual(true);
    expect(listC.equals(listA)).toEqual(true);
  });

  it('should use hashCode method from wrapped immutable in hashCode method', () => {
    // tslint:disable-next-line
    class ListModel extends IterableModel<List<string>> {
    }

    const listA = new ListModel(List(['a', 'b', 'c']));
    const listB = new ListModel(List(['a', 'c']));
    const listC = new ListModel(List(['a', 'b', 'c']));

    expect(listA.hashCode()).toEqual(expect.any(Number));
    expect(listB.hashCode()).toEqual(expect.any(Number));
    expect(listC.hashCode()).toEqual(expect.any(Number));

    expect(listA.hashCode()).toEqual(listC.hashCode());
    expect(listA.hashCode()).not.toEqual(listB.hashCode());
  });

  it('should use object serialization for Map, OrderedMap, Seq and Record immutables', () => {
    // tslint:disable
    class MapModel extends IterableModel<Map<string, any>> {}
    class OrderedMapModel extends IterableModel<OrderedMap<string, any>> {}
    class SeqModel extends IterableModel<Seq<string, any>> {}
    class RecordModel extends IterableModel<TypedRecord<{ [key: string]: any }>> {}
    // tslint:enable

    const data = { a: 'foo', b: 'bar' };

    expect(new MapModel(Map(data)).toJSON()).toEqual(data);
    expect(new OrderedMapModel(OrderedMap(data)).toJSON()).toEqual(data);
    expect(new SeqModel(Seq(data)).toJSON()).toEqual(data);
    expect(new RecordModel(TypedRecord<{ [key: string]: string }>(data)()).toJSON()).toEqual(data);
  });

  it('should use shallow object serialization', () => {
    // tslint:disable-next-line
    class MapModel extends IterableModel<Map<string, any>> {}

    const data = { a: 'foo', b: 'bar' };

    const nestedModel = new MapModel(Map(data));
    expect(new MapModel(Map({ nested: nestedModel })).toJSON()).toHaveProperty('nested');
    expect(new MapModel(Map({ nested: nestedModel })).toJSON().nested).toBe(nestedModel);
    expect(new MapModel(Map({ nested: nestedModel })).toJSON().nested.toJSON()).toEqual(data);
  });

  it('should use array serialization for List, Set, OrderedSet and Stack immutables', () => {
    // tslint:disable
    class ListModel extends IterableModel<List<any>> {}
    class SetModel extends IterableModel<Set<any>> {}
    class OrderedSetModel extends IterableModel<OrderedSet<any>> {}
    class StackModel extends IterableModel<Stack<any>> {}
    // tslint:enable

    const data = ['a', 'b', 'c'];

    expect(new ListModel(List(data)).toJSON()).toEqual(data);
    expect(new SetModel(Set(data)).toJSON()).toEqual(data);
    expect(new OrderedSetModel(OrderedSet(data)).toJSON()).toEqual(data);
    expect(new StackModel(Stack(data)).toJSON()).toEqual(data);
  });

  it('should use shallow array serialization', () => {
    // tslint:disable-next-line
    class ListModel extends IterableModel<List<any>> {}

    const data = ['a', 'b'];

    const nestedModel = new ListModel(List(data));
    expect(new ListModel(List([nestedModel])).toJSON()).toHaveLength(1);
    expect(new ListModel(List([nestedModel])).toJSON()[0]).toBe(nestedModel);
    expect(new ListModel(List([nestedModel])).toJSON()[0].toJSON()).toEqual(data);
  });

  it('should allow to pass additional arguments in update method', () => {
    // tslint:disable-next-line
    class FancyListModel extends IterableModel<List<string>> {
      constructor(
        list: List<string>,
        readonly customProperty: string
      ) {
        super(list);
      }

      addItem(item: string): this {
        return this.update(data => data.push(item));
      }

      protected update(updater: (data: List<any>) => List<any>): this {
        return super.update(updater, this.customProperty);
      }
    }

    const data = ['a', 'b', 'c'];
    const listModel = new FancyListModel(List(data), 'foo');
    expect(listModel.customProperty).toEqual('foo');
    expect(listModel.toJSON()).toEqual(data);

    const nextListModel = listModel.addItem('d');
    expect(nextListModel.customProperty).toEqual('foo');
    expect(nextListModel.toJSON()).toEqual([...data, 'd']);
  });
});
