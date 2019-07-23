import { BehaviorSubject } from 'rxjs';
import { AccessToken } from './models/authorization';
import { Injectable } from '@angular/core';

export const GRAPHQL_URI = 'https://teamprojector.com/api/graphql';
const DEFAULT_MOCKS_DELAY = 500;
const DEFAULT_LANGUAGE = 'en';
const AUTHORIZATION_KEY = 'Authorization';

@Injectable()
export class AppConfig2 {

  localMode: boolean = (href => {
    const regex = /(localhost|127.0.0.1)/ig;
    return regex.test(href);
  })(window.location.href);

  token$ = new BehaviorSubject<AccessToken>((() => {
    if (!!localStorage[AUTHORIZATION_KEY]) {
      return JSON.parse(localStorage[AUTHORIZATION_KEY]) as AccessToken;
    }

    return null;
  })());

  set token(authorization: AccessToken) {
    if (!!authorization) {
      localStorage.setItem(AUTHORIZATION_KEY, JSON.stringify(authorization));
    } else {
      localStorage.removeItem(AUTHORIZATION_KEY);
    }

    this.token$.next(authorization);
  }

  get token() {
    return this.token$.getValue();
  }

  language$ = new BehaviorSubject<string>(!!localStorage.language ? localStorage.language : DEFAULT_LANGUAGE);

  set language(language: string) {
    localStorage.setItem('language', language);
    this.language$.next(language);
  }

  get language() {
    return this.language$.getValue();
  }

  backendEndpoint: string;
  mocksPath = '/assets/mocks';

  set useMocks(value: boolean) {
    localStorage.setItem('useMocks', value ? '1' : '');
  }

  get useMocks() {
    if (localStorage.useMocks !== undefined) {
      return localStorage.useMocks;
    }
    const href = window.location.href;
    return /use-mocks/i.test(href);
  }

  set mocksDelay(value: number) {
    localStorage.setItem('mocksDelay', `${value}`);
  }

  get mocksDelay() {
    if (localStorage.mocksDelay !== undefined) {
      return localStorage.mocksDelay;
    }
    return DEFAULT_MOCKS_DELAY;
  }

}
