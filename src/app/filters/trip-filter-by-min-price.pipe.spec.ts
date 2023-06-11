import { TripFilterByMinPricePipe } from './trip-filter-by-min-price.pipe';

describe('TripFilterByMinPricePipe', () => {
  it('create an instance', () => {
    const pipe = new TripFilterByMinPricePipe();
    expect(pipe).toBeTruthy();
  });
});
