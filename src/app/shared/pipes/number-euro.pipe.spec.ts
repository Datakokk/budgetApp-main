import { NumberEuroPipe } from './number-euro.pipe';

describe('NumberEuroPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberEuroPipe();
    expect(pipe).toBeTruthy();
  });
});
