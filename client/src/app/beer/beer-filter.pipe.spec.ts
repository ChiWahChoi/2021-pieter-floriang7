import { BeerFilterPipe } from './beer-filter.pipe';

describe('BeerFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new BeerFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
