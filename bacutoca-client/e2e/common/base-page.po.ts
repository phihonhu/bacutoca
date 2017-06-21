import { browser, element, by, promise, ElementFinder } from 'protractor';
import { BaseComponent } from './base-component.po';
import { Constants } from '../shared/constants';

export class BasePage extends BaseComponent {
    constructor(root: string, private path: string) {
        super(root);
    }

    navigateToHomePage(): promise.Promise<any> {
        return browser.get(`${Constants.homePage}`);
    }

    navigateToRegisterPage(): promise.Promise<any> {
        return browser.get(`${Constants.registerPage}`);
    }

    maximizeBrowser(){
        browser.manage().window().maximize();
    }
    getTitle(): promise.Promise<string> {
        return browser.getTitle();
    }

    getCurrentURL(): promise.Promise<string> {
        return browser.getCurrentUrl();
    }

    getTextElemenet(locator: string) {

    }

    clickToElement(locator: string) {
        const element = browser.element(by.css(locator));
        element.click();
    }
    sendKeyToElement(locator: string, value: string) {
        const element = browser.element(by.css(locator));
        element.clear().then(() => {
            element.sendKeys(value);
        });
    }

    checkToCheckbox(locator: string, checked: boolean) {
        try {
            const element = browser.element(by.css(locator));
            element.isSelected().then(state => {
                if (state !== checked) {
                    return element.click();
                } else {
                    return promise.fulfilled(null);
                }
            });
        } catch (e) {
            return (<Error>e).message;
        }
    }

    waitForElementVisible() {

    }

    countElement(locator: string) {
        return browser.all(by.css(locator)).count();
    }


}
