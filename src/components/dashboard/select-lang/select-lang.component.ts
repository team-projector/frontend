import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UI } from 'junte-ui';
import { CookieService } from 'ngx-cookie-service';
import { DEFAULT_LANG } from 'src/consts';
import { Langs } from 'src/models/enums/langs';

@Component({
  selector: 'app-select-lang',
  templateUrl: './select-lang.component.html',
  styleUrls: ['./select-lang.component.scss']
})

export class SelectLangComponent implements OnInit {

  ui = UI;
  langs = Langs;

  langControl = this.fb.control(DEFAULT_LANG);

  form = this.fb.group({
    lang: this.langControl
  });

  constructor(private cookie: CookieService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    let lang: Langs = DEFAULT_LANG;
    const base = document.querySelector('base').getAttribute('href');
    switch (base) {
      case '/ru/':
        lang = Langs.ru;
        break;
      case '/en/':
        lang = Langs.en;
        break;
      default:
    }
    this.langControl.setValue(lang);
    this.langControl.valueChanges.subscribe(selected => {
      const path = document.location.pathname.substring(base.length);
      document.location.href = `/${selected}/${path}`;
    });

  }
}
