import { TripFilterByNamePipe } from './trip-filter-by-destination.pipe';

describe('TripFilterByNamePipe', () => {
  it('create an instance', () => {
    const pipe = new TripFilterByNamePipe();
    expect(pipe).toBeTruthy();
  });
});
