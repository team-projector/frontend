import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UI } from 'junte-ui';
import { CookieService } from 'ngx-cookie-service';
import { DEFAULT_LOCALE } from 'src/consts';
import { Locales } from 'src/models/enums/locales';

const COOKIE_LOCALE_KEY = 'locale';

@Component({
  selector: 'app-select-locale',
  templateUrl: './select-locale.component.html',
  styleUrls: ['./select-locale.component.scss']
})

export class SelectLocaleComponent implements OnInit {

  ui = UI;
  locales = Locales;

  localeControl = this.fb.control(DEFAULT_LOCALE);

  form = this.fb.group({
    locale: this.localeControl
  });

  constructor(private cookie: CookieService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    let locale: Locales;
    switch (this.cookie.get('locale')) {
      case 'ru':
        locale = Locales.ru;
        break;
      case 'en':
      default:
        locale = Locales.en;
    }
    this.localeControl.setValue(locale);

    this.localeControl.valueChanges.subscribe(selected => {
      if (selected !== DEFAULT_LOCALE) {
        this.cookie.set(COOKIE_LOCALE_KEY, selected, null, '/');
      } else {
        this.cookie.delete(COOKIE_LOCALE_KEY, '/');
      }


      setTimeout(() => document.location.reload(), 1000);
    });

  }
}
