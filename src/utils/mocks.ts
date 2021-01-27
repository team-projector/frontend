import { addDays } from 'date-fns';
import * as fakerEn from 'faker/locale/en';
import * as fakerRu from 'faker/locale/ru';
import { SECONDS_IN_HOUR, SECONDS_IN_MINUTE } from '../consts';
import { Language } from '../enums/language';
import { detectLanguage } from './lang';

export enum TimeAccuracy {
  hours,
  minutes
}

export const faker = ((): any => {
  switch (detectLanguage()) {
    case Language.ru:
      return fakerRu;
    case Language.en:
    default:
      return fakerEn;
  }
})();

export const mocks = {
  date: {
    interval: (): Date[] => {
      const from = faker.date.past();
      return [from, addDays(from, faker.random.number({min: 5, max: 20}))];
    }
  },
  time: (min: number = 0, max: number = 8, accuracy: TimeAccuracy = TimeAccuracy.hours) => {
    let time = faker.random.number({min: min, max: max}) * SECONDS_IN_HOUR;
    if (accuracy === TimeAccuracy.minutes) {
      time += faker.helpers.randomize([10, 20, 30, 40, 50]) * SECONDS_IN_MINUTE;
    }
    return time;
  },
  money: (min: number, max: number) => {
    return faker.random.number({min: min, max: max});
  },
  percents: (min: number = 1, max: number = 100) => {
    return faker.random.number({min: min, max: max}) / 100;
  },
  efficiency: (min: number = 10, max: number = 200) => {
    return faker.random.number({min: min, max: max}) / 100;
  },
  random: (min: number, max: number) => {
    return faker.random.number({min: min, max: max});
  },
  hourlyRate: (min: number = 15, max: number = 30) => {
    return faker.random.number({min: min, max: max});
  },
  id: () => {
    return faker.random.uuid();
  },
  avatar: () => {
    return faker.helpers.randomize([
      'https://randomuser.me/api/portraits/men/0.jpg',
      'https://randomuser.me/api/portraits/men/1.jpg',
      'https://randomuser.me/api/portraits/men/2.jpg',
      'https://randomuser.me/api/portraits/men/3.jpg',
      'https://randomuser.me/api/portraits/men/4.jpg',
      'https://randomuser.me/api/portraits/men/5.jpg',
      'https://randomuser.me/api/portraits/men/6.jpg',
      'https://randomuser.me/api/portraits/men/7.jpg',
      'https://randomuser.me/api/portraits/men/8.jpg',
      'https://randomuser.me/api/portraits/men/9.jpg',
      'https://randomuser.me/api/portraits/women/0.jpg',
      'https://randomuser.me/api/portraits/women/1.jpg',
      'https://randomuser.me/api/portraits/women/2.jpg',
      'https://randomuser.me/api/portraits/women/3.jpg',
      'https://randomuser.me/api/portraits/women/4.jpg',
      'https://randomuser.me/api/portraits/women/5.jpg',
      'https://randomuser.me/api/portraits/women/6.jpg',
      'https://randomuser.me/api/portraits/women/7.jpg',
      'https://randomuser.me/api/portraits/women/8.jpg',
      'https://randomuser.me/api/portraits/women/9.jpg'
    ]);
  }

};
