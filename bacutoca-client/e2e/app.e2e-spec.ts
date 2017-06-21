import { BacutocaClientPage } from './app.po';

describe('bacutoca-client App', () => {
  let page: BacutocaClientPage;

  beforeEach(() => {
    page = new BacutocaClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
