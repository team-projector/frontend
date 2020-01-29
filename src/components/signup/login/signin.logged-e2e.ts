import {browser, element} from 'protractor';
import {SigninPage} from './signin.po';

describe('Signin ', () => {

    const signinPage: SigninPage = new SigninPage();

    beforeEach(() => {
        browser.get('/');
    });

    it('check login', () => {
        signinPage.login();
        browser.sleep(1000);
        expect(signinPage.checkHeader().isPresent()).toBeTruthy();
    });
});
