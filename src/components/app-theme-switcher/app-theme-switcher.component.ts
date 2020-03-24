import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Themes } from 'src/models/enums/themes';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: 'app-theme-switcher.component.html'
})

export class AppThemeSwitcherComponent implements OnInit {

  themes = Themes;
  themeControl = this.fb.control(!!localStorage.theme ? Themes[localStorage.theme] as Themes : Themes.light);

  form = this.fb.group({
    theme: this.themeControl
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.themeControl.valueChanges
      .subscribe(theme => {
        if (theme !== Themes.light) {
          localStorage.setItem('theme', theme);
        } else {
          localStorage.removeItem('theme');
        }
      });
  }
}
