import { browser, element, by } from 'protractor';
import { BasePage } from '../../common/base-page.po';

export class RegisterPage extends BasePage {

    constructor() {
        super('register-form', '/register');
    }

    clickToSignUpTab() {
        const sigupTab = element(by.xpath(`//div[starts-with(@id,'md-tab-label') and contains(.,'Signup')]`));
        sigupTab.click();
    }

    getRegisterLabelText() {
        const label = element.all(by.css('h5')).first();
        return label.getText();
    }

    getURLRegisterPage() {
        return browser.getCurrentUrl();
    }

    isRegisterPanelDisplayed() {
        const registerPanel = element(by.css('.mat-tab-body-content>div'));
        return registerPanel.isDisplayed();
    }

    typeToUserName(userName: string) {
        const userNameTextbox = element(by.xpath(`//input[@name='reg_username']`));
        userNameTextbox.clear();
        userNameTextbox.sendKeys(userName);
    }

    typeToPassword(password: string) {
        const passwordTextbox = element(by.xpath(`//input[@name='reg_password']`));
        passwordTextbox.clear();
        passwordTextbox.sendKeys(password);
    }

    clickToRegisterButton() {
        const registerButton = element(by.xpath(`//button[contains(.,'Register')]`));
        registerButton.click();
    }

    isRegisterActionMessageDisplayed() {
        browser.sleep(2000);
        const registerMsg = element(by.css('.register-error'));
        return registerMsg.getText();
    }

    randomCharacter() {
        let random: number;
        random = Math.floor((Math.random() * 10000) + 1);
        return random;
    }

}
