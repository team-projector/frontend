import {browser, by, element} from 'protractor';
import {protractor} from 'protractor/built/ptor';



const JNT_USERNAME_LOCATOR = by.css('jnt-input[formcontrolname="login"]');
const USERNAME_INPUT_LOCATOR = by.css('jnt-input[formcontrolname="login"] input');
const JNT_PASSWORD_INPUT_LOCATOR = by.css('jnt-input[formcontrolname="password"]');
const PASSWORD_INPUT_LOCATOR = by.css('jnt-input[formcontrolname="password"] input');
const LOGIN_BUTTON_LOCATOR = by.css('button[type="submit"]');
const HEADER_LOCATOR = by.css('jnt-app-header');
const EMAIL = 'demo@gmail.com';
const PASSWORD = '229835aA';



export class SigninPage {

    login() {
      element(USERNAME_INPUT_LOCATOR).sendKeys(EMAIL);
      element(PASSWORD_INPUT_LOCATOR).sendKeys(PASSWORD);
      element(LOGIN_BUTTON_LOCATOR).click();
    }

    checkHeader() {
        element(HEADER_LOCATOR);
        return element(HEADER_LOCATOR);
    }

}
