import { browser } from 'protractor';
import { SigninPage } from './signin.po';

describe('Signin', () => {

  const signinPage: SigninPage = new SigninPage();

  beforeEach(() => {
    browser.get('/');
  });

  it('check user login', () => {
    signinPage.login();
    browser.wait(() => signinPage.getUserbar().isPresent(), 10000);
  });
});
