import {browser, by, element} from 'protractor';

const USERNAME_INPUT_LOCATOR = by.css('[formcontrolname="login"] input');
const PASSWORD_INPUT_LOCATOR = by.css('[formcontrolname="password"] input');
const LOGIN_BUTTON_LOCATOR = by.css('[type="submit"]');
const USERBAR_LOCATOR = by.css('jnt-userbar');
const BREADCRUMB_LOCATOR = by.css('jnt-breadcrumb[host=jnt-breadcrumb-host]');
const EMAIL = 'demo@gmail.com';
const PASSWORD = '229835aA';



export class SigninPage {

    login() {
      element(USERNAME_INPUT_LOCATOR).sendKeys(EMAIL);
      element(PASSWORD_INPUT_LOCATOR).sendKeys(PASSWORD);
      element(LOGIN_BUTTON_LOCATOR).click();
    }

    checkUserbar() {
        return element(USERBAR_LOCATOR);
    }

    // checkBreadcrumb() {
    //   element(BREADCRUMB_LOCATOR);
    //   return element(BREADCRUMB_LOCATOR);
    // }

}
