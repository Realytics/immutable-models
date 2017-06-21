
import { IterableModel, Model, TypedRecord } from '../src/index';

describe('index', () => {
  it('should export TypedRecord', () => {
    expect(TypedRecord).not.toBeFalsy();
  });

  it('should export IterableModel', () => {
    expect(IterableModel).not.toBeFalsy();
  });

  it('should export Model', () => {
    expect(Model).not.toBeFalsy();
  });
});
