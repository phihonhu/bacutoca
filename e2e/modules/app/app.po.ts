import { browser, element, by, promise, ElementFinder } from 'protractor';
import { BasePage } from '../../common/base-page.po';

export class AppPage extends BasePage {
  constructor() {
    super('app-root > div', '/');
  }

  getContainerClass(): promise.Promise<String> {
    return this.getAttributeByClass(this.getContainer());
  }

  getAppHeader(): ElementFinder {
    return this.getElement('app-header', this.getContainer());
  }

  getAppFooter(): ElementFinder {
    return this.getElement('app-footer', this.getContainer());
  }

  getRouterOutlet(): ElementFinder {
    return this.getElement('router-outlet', this.getContainer());
  }
}
