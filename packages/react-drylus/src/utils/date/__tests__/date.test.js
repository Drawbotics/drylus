import { generateDisplayedDate, ShowDateTime } from '../date';


let languageGetter;
let languagesGetter;

beforeEach(() => {
  languageGetter = jest.spyOn(window.navigator, 'language', 'get');
  languagesGetter = jest.spyOn(window.navigator, 'languages', 'get');
});


// Mock constant date is 01/06/2020 at 12pm
describe('generateDisplayedDate', () => {
  describe('matches the formatted date output when the date', () => {
    it('is in more than 365 days', () => {
      const date = new Date('2021-10-01');

      const res = generateDisplayedDate({ date });
      
      expect(res).toEqual('01/10/2021');
    });

    it('is in less than 365 days, different year', () => {
      const date = new Date('2021-01-01');
  
      const res = generateDisplayedDate({ date });
      
      expect(res).toEqual('1 Jan 2021');
    });

    it('is in less than 365 days, same year', () => {
      const date = new Date('2020-10-01');
  
      const res = generateDisplayedDate({ date });
      
      expect(res).toEqual('1 Oct');
    });

    it('is in less than a week, and no time should show', () => {
      const date = new Date('2020-06-04');

      const res = generateDisplayedDate({
        date,
        options: { showTime: ShowDateTime.NEVER },
      });
      
      expect(res).toEqual('Thu 4 Jun');
    });

    it('is in less than a week, with specific time', () => {
      const date = new Date('2020-06-04 18:00');
  
      const res = generateDisplayedDate({ date });
      
      expect(res).toEqual('Thu 4 Jun, 6:00 PM');
    });
    
    it('is in less than 2 days', () => {
      const date = new Date('2020-06-02 8:00');
  
      const res = generateDisplayedDate({ date });
      
      expect(res).toEqual('Tomorrow, 2 Jun, 8:00 AM');
    });

    it('is the same day, in the future', () => {
      const date = new Date('2020-06-01 15:00');

      const res = generateDisplayedDate({ date });
      
      expect(res).toEqual('Today at 3:00 PM');
    });

    it('is the same day, in the past', () => {
      const date = new Date('2020-06-01 9:20');

      const res = generateDisplayedDate({ date });
      
      expect(res).toEqual('2h40 ago');
    });

    it('is the previous day', () => {
      const date = new Date('2020-05-31 13:00');

      const res = generateDisplayedDate({ date });
      
      expect(res).toEqual('Yesterday at 1:00 PM');
    });

    it('is the previous week', () => {
      const date = new Date('2020-05-28 8:00');

      const res = generateDisplayedDate({ date });
      
      expect(res).toEqual('Last Thu, 28 May, 8:00 AM');
    });

    it('is less than 365 days ago, same year', () => {
      const date = new Date('2020-01-01');

      const res = generateDisplayedDate({ date });
      
      expect(res).toEqual('1 Jan');
    });

    it('is less than 365 days ago, different year', () => {
      const date = new Date('2019-10-01');

      const res = generateDisplayedDate({ date });
      
      expect(res).toEqual('1 Oct 2019');
    });

    it('is less than 365 days ago, different year, with specified time and display', () => {
      const date = new Date('2019-10-01 17:00');

      const res = generateDisplayedDate({
        date,
        options: { showTime: ShowDateTime.ALWAYS,
      } });
      
      expect(res).toEqual('1 Oct 2019, 5:00 PM');
    });

    it('is more than 365 days ago', () => {
      const date = new Date('2018-10-01');

      const res = generateDisplayedDate({ date });
      
      expect(res).toEqual('01/10/2018');
    });

    it('is a archived format', () => {
      const date = new Date('2018-10-01');

      const res = generateDisplayedDate({ date, options: { asArchive: true } });
      
      expect(res).toEqual('2018-10-01');
    });

    it('is a archived format, with time', () => {
      const date = new Date('2018-10-01 8:32');

      const res = generateDisplayedDate({
        date,
        options: {
          asArchive: true,
          showTime: ShowDateTime.ALWAYS,
        },
      });
      
      expect(res).toEqual('2018-10-01, 8:32 AM');
    });
  });
  describe('it matches the desired output when the locale is FR', () => {
    it('is the previous week', () => {
      const date = new Date('2020-05-28 18:00');
      languageGetter.mockReturnValue('fr');
      languagesGetter.mockReturnValue(['fr']);

      const res = generateDisplayedDate({ date });
      
      expect(res).toEqual('jeu. passé, 28 mai, 18h00');
    });

    it('is the next week', () => {
      const date = new Date('2020-06-04 18:00');
      languageGetter.mockReturnValue('fr');
      languagesGetter.mockReturnValue(['fr']);

      const res = generateDisplayedDate({ date });
      
      expect(res).toEqual('jeu. 4 juin, 18h00');
    });

    it('is the same day, in the past', () => {
      const date = new Date('2020-06-01 9:20');
      languageGetter.mockReturnValue('fr');
      languagesGetter.mockReturnValue(['fr']);

      const res = generateDisplayedDate({ date });
      
      expect(res).toEqual('il y a 2h40');
    });

    it('is in less than 2 days', () => {
      const date = new Date('2020-06-02 8:00');
      languageGetter.mockReturnValue('fr');
      languagesGetter.mockReturnValue(['fr']);
  
      const res = generateDisplayedDate({ date });
      
      expect(res).toEqual('demain, 2 juin à 08h00');
    });

    it('is the same day, in the future', () => {
      const date = new Date('2020-06-01 15:00');
      languageGetter.mockReturnValue('fr');
      languagesGetter.mockReturnValue(['fr']);

      const res = generateDisplayedDate({ date });

      expect(res).toEqual('aujourd\'hui à 15h00');
    });
  });

  describe('it matches the desired output when the locale is NL', () => {
    it('is the same day, in the future', () => {
      const date = new Date('2020-06-01 15:00');
      languageGetter.mockReturnValue('nl');
      languagesGetter.mockReturnValue(['nl']);

      const res = generateDisplayedDate({ date });
      
      expect(res).toEqual('vandaag om 15u00');
    });

    it('is in less than 2 days', () => {
      const date = new Date('2020-06-02 8:00');
      languageGetter.mockReturnValue('nl');
      languagesGetter.mockReturnValue(['nl']);
  
      const res = generateDisplayedDate({ date });
      
      expect(res).toEqual('morgen, 2 jun om 08u00');
    });

    it('is the previous week', () => {
      const date = new Date('2020-05-28 18:00');
      languageGetter.mockReturnValue('nl');
      languagesGetter.mockReturnValue(['nl']);

      const res = generateDisplayedDate({ date });
      
      expect(res).toEqual('vorige do., 28 mei, 18u00');
    });
  });
});