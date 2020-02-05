import {browser, by, element} from 'protractor';
import {SigninPage} from './signin.po';

describe('Signin', () => {

  const signinPage: SigninPage = new SigninPage();

  beforeEach(() => {
    browser.get('/');
  });

  it('check user login', () => {
    signinPage.login();
    // jnt-app-header
    // by.css('jnt-userbar');
    browser.wait(() => signinPage.checkUserbar().isPresent(), 10000);
  });
});
