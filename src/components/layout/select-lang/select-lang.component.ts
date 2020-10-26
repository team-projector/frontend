import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UI } from '@junte/ui';
import { CookieService } from 'ngx-cookie-service';
import { Language } from 'src/enums/language';

@Component({
  selector: 'app-select-lang',
  templateUrl: './select-lang.component.html',
  styleUrls: ['./select-lang.component.scss']
})

export class SelectLangComponent {

  ui = UI;
  language = Language;

  langControl = this.fb.control(this.lang);
  form = this.fb.group({
    lang: this.langControl
  });

  constructor(private cookie: CookieService,
              private fb: FormBuilder,
              @Inject(Language) private lang: Language) {
  }

  change(lang: Language) {
    const pathname = document.location.pathname;
    const path = pathname.substring(pathname.indexOf('/', 1) + 1);
    document.location.href = `/${lang}/${path}`;
  }
}
