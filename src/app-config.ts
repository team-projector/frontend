import { BehaviorSubject } from 'rxjs';
import { AccessToken } from './models/access-token';
import { Injectable } from '@angular/core';

export const GRAPHQL_URI = 'https://teamprojector.com/api/graphql';
const AUTHORIZATION_KEY = 'Authorization';

@Injectable()
export class AppConfig {

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

}
