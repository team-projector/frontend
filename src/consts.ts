import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeRu from '@angular/common/locales/ru';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { Locale } from 'date-fns';
import { enUS as dfnsEnUS, ru as dfnsRu } from 'date-fns/locale';
import { localeEnUs as jntEnUs, i18nEn, JunteUiModule, localeRu as jntRu, i18nRu } from '@junte/ui';
import { DateFnsConfigurationService } from 'ngx-date-fns';
import { detectLanguage } from 'src/utils/lang';
import { Language } from './enums/language';

enum CurrencyCode {
  usd = 'usd',
  rur = 'rur'
}

export const BACKEND: {
  config: {
    currencyCode: CurrencyCode,
    firstWeekDay: 0 | 1,
    gitlabLoginEnabled: boolean,
    demoMode: boolean
  }
} = window['backend'] || {
  config: {
    currencyCode: CurrencyCode.usd,
    firstWeekDay: 0,
    gitlabLoginEnabled: true,
    demoMode: false
  }
};

export const PLATFORM_DELAY = 100;
export const UI_DELAY = 250;
export const MOCKS_DELAY = 1000;
export const DATE_FORMAT = 'yyyy-MM-dd';
export const DATE_TIME_FORMAT = 'yyyy-MM-dd\'T\'HH:mm:ss';
export const APPLICATION_READY = 'application_ready';
export const CURRENT_LANGUAGE = 'current_language';

const CURRENCY_CODE: CurrencyCode = BACKEND.config.currencyCode;
const FIRST_DAY_OF_WEEK: 0 | 1 = BACKEND.config.firstWeekDay;

const fnsConfig = new DateFnsConfigurationService();

enum LocaleData {
  NumberFormats = 14,
  CurrencyCode = 16
}

function getLocaleData(locale: any) {
  let changes;
  switch (CURRENCY_CODE) {
    case CurrencyCode.rur:
      changes = {
        [LocaleData.NumberFormats]: localeRu[LocaleData.NumberFormats],
        [LocaleData.CurrencyCode]: localeRu[LocaleData.CurrencyCode]
      };
      break;
    case CurrencyCode.usd:
    default:
      changes = {
        [LocaleData.NumberFormats]: localeEn[LocaleData.NumberFormats],
        [LocaleData.CurrencyCode]: localeEn[LocaleData.CurrencyCode]
      };

  }
  return {...locale, ...changes};
}

function mergeDfnsLocale(l: Locale): Locale {
  return {...l, ...{options: {weekStartsOn: FIRST_DAY_OF_WEEK}}};
}

const language = detectLanguage();
export const providers: any[] = [
  {
    provide: Language,
    useValue: language
  },
  {
    provide: DateFnsConfigurationService,
    useValue: fnsConfig
  },
];

let data;
let dfnsLocale;
let config;
switch (language) {
  case Language.ru:
    data = getLocaleData(localeRu);
    registerLocaleData(data);
    dfnsLocale = mergeDfnsLocale(dfnsRu);
    fnsConfig.setLocale(dfnsLocale);
    config = {
      i18n: i18nRu,
      locale: {
        ui: jntRu,
        dfns: dfnsLocale
      }
    };
    providers.push({
      provide: LOCALE_ID,
      useValue: 'ru'
    });
    break;
  case Language.en:
  default:
    data = getLocaleData(localeEn);
    registerLocaleData(data);
    dfnsLocale = mergeDfnsLocale(dfnsEnUS);
    fnsConfig.setLocale(dfnsLocale);
    config = {
      i18n: i18nEn,
      locale: {
        ui: jntEnUs,
        dfns: dfnsLocale
      }
    };
    providers.push({
      provide: LOCALE_ID,
      useValue: 'en'
    });
}

providers.push({
  provide: DEFAULT_CURRENCY_CODE,
  useValue: data[LocaleData.CurrencyCode]
});

export const imports = [JunteUiModule.forRoot(config)];
