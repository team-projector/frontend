import { BehaviorSubject } from 'rxjs';
import { AccessToken } from './models/access-token';
import { Injectable } from '@angular/core';

const GRAPHQL_URL = 'https://junte.teamprojector.com/api/graphql';
const AUTHORIZATION_KEY = 'Authorization';
const LOCALHOST_REGEX = /(localhost|127.\0\.0\.1)/ig;

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

  localMode: boolean = (() => {
    const href = location.href;
    // href = 'http://localhost/';
    return LOCALHOST_REGEX.test(href);
  })();

  graphqlUrl = this.localMode ? GRAPHQL_URL : `${location.origin}/api/graphql`;
}
