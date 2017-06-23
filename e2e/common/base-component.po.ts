import { browser, element, by, promise, ElementFinder, ElementArrayFinder } from 'protractor';

import { BaseObject } from './base-object.po';

export class BaseComponent extends BaseObject<BaseComponent> {
    private self: ElementFinder;

    constructor(private root: string, container?: ElementFinder) {
        super(BaseComponent);

        if (container) {
            this.self = container;
        } else {
            this.self = null;
        }
    }

    protected findElementByCss(css: string) {
        return by.css(css);
    }

    protected getElement(css: string, find?: ElementFinder): ElementFinder {
        if (find) {
            return find.element(this.findElementByCss(css));
        }

        return this.self ? this.self.element(this.findElementByCss(css)) : element(this.findElementByCss(css));
    }

    protected getAll(css: string, find?: ElementFinder): ElementArrayFinder {
        if (find) {
            find.all(this.findElementByCss(css));
        }

        return this.self ? this.self.all(this.findElementByCss(css)) : element.all(this.findElementByCss(css));
    }

    getContainer(): ElementFinder {
        return this.getElement(this.root);
    }

    getAttributeByClass(find: ElementFinder): promise.Promise<string> {
        return find.getAttribute('class');
    }

    getAttributeByValue(find: ElementFinder): promise.Promise<string> {
        return find.getAttribute('value');
    }

    getAttributeByName(find: ElementFinder): promise.Promise<string> {
        return find.getAttribute('name');
    }

    // element(by.binding('first'));	// <span>{{first}}</span>
    getAttributeByBinding(name: string, from: ElementFinder): promise.Promise<string> {
        return from.getAttribute(`ng-reflect-${name}`);
    }

    // element(by.model('second'));	// <input ng-model="second">
    getModelBinding(from: ElementFinder): promise.Promise<string> {
        return this.getAttributeByBinding('model', from);
    }

    getTypeBinding(from: ElementFinder): promise.Promise<string> {
        return this.getAttributeByBinding('type', from);
    }

    getPlaceholderBinding(from: ElementFinder): promise.Promise<string> {
        return this.getAttributeByBinding('placeholder', from);
    }

    getNameBinding(from: ElementFinder): promise.Promise<string> {
        return this.getAttributeByBinding('name', from);
    }

    getTextElement(find: ElementFinder): promise.Promise<string> {
        return find.getText().then(value => {
            return value ? value.trim() : value;
        });
    }
}
