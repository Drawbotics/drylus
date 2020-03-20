import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';

import { generateDisplayedPrice } from '../price';

let languageGetter: any;
let languagesGetter: any;

function compareStrings(value1: string, value2: string) {
  return value1.localeCompare(value2, undefined, { sensitivity: 'base' });
}

// Custom price matcher
expect.extend({
  toMatchPrice(x, y) {
    return {
      pass: compareStrings(x, y) === 0,
      message: () => `
        ${matcherHint('toMatchPrice', undefined, undefined, {})}
        Received: ${printReceived(x)}
        Expected: ${printExpected(y)}
      `,
    };
  },
});

beforeEach(() => {
  languageGetter = jest.spyOn(window.navigator, 'language', 'get');
  languagesGetter = jest.spyOn(window.navigator, 'languages', 'get');
});

describe('generateDisplayedPrice', () => {
  describe('matches the formatted price when', () => {
    it('has euro currency', () => {
      const price = { value: 100, currency: 'EUR' };

      const res = generateDisplayedPrice({ price });

      (expect(res) as any).toMatchPrice('€100');
    });

    it('is a float', () => {
      const price = { value: 99.99, currency: 'EUR' };

      const res = generateDisplayedPrice({ price });

      (expect(res) as any).toMatchPrice('€99.99');
    });

    it('has USD currency', () => {
      const price = { value: 123456, currency: 'usd' };

      const res = generateDisplayedPrice({ price });

      (expect(res) as any).toMatchPrice('$123,456');
    });

    it('is not a price', () => {
      const price = { value: 99.99 };

      const res = generateDisplayedPrice({ price });

      (expect(res) as any).toMatchPrice('99.99');
    });

    it('is in French', () => {
      const price = { value: 10000, currency: 'EUR' };
      languageGetter.mockReturnValue('fr');
      languagesGetter.mockReturnValue(['fr']);

      const res = generateDisplayedPrice({ price });

      (expect(res) as any).toMatchPrice('10 000 €');
    });

    it('is in Dutch', () => {
      const price = { value: 10000, currency: 'EUR' };
      languageGetter.mockReturnValue('nl');
      languagesGetter.mockReturnValue(['nl']);

      const res = generateDisplayedPrice({ price });

      (expect(res) as any).toMatchPrice('€ 10.000');
    });
  });
});
