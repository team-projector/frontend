import { by, element } from 'protractor';

const USERNAME_INPUT_LOCATOR = by.css('[formcontrolname="login"] input');
const PASSWORD_INPUT_LOCATOR = by.css('[formcontrolname="password"] input');
const LOGIN_BUTTON_LOCATOR = by.css('[type="submit"]');
const USERBAR_LOCATOR = by.css('sn-app-header-userbar');
const EMAIL = 'demo@gmail.com';
const PASSWORD = '123456';



export class SigninPage {

    login() {
      element(USERNAME_INPUT_LOCATOR).sendKeys(EMAIL);
      element(PASSWORD_INPUT_LOCATOR).sendKeys(PASSWORD);
      element(LOGIN_BUTTON_LOCATOR).click();
    }

    getUserbar() {
        return element(USERBAR_LOCATOR);
    }

}
