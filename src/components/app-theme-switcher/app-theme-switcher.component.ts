import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Themes } from '../../models/enums/themes';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: 'app-theme-switcher.component.html'
})

export class AppThemeSwitcherComponent implements OnInit {

  themes = Themes;
  loading = false;

  themeControl = this.fb.control(!!localStorage.theme ? Themes[localStorage.theme] as Themes : Themes.light);

  form = this.fb.group({
    theme: this.themeControl
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.themeControl.valueChanges.subscribe(theme => this.load(theme));
  }

  private load(theme: Themes) {
    this.loading = true;
    window['themes'](theme, () => this.loading = false);
  }

}
