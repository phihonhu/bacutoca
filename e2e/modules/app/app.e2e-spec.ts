import { AppPage } from './app.po';

describe('[Bacutoca] - Homepage', () => {
  let homePage: AppPage;

  beforeEach(async () => {
    homePage = new AppPage();
    await homePage.navigateToHomePage();
    homePage.maximizeBrowser();
  });

  it('TC_01 - Verify Homepage title', async (done) => {
    expect(await homePage.getTitle()).toEqual('BACUTOCA GAME');
    done();
  });

  it('TC_02 - Verify Homepage provide a container element', async (done) => {
    expect(await homePage.getContainer().isPresent()).toBe(true);
    done();
  });

  it('TC_03 - Verify Homepage should provide an app-container', async (done) => {
    expect(await homePage.getContainerClass()).toBe('app-container');
    done();
  });

  it('TC_04 - Verify Homepage should provide an app-header', async (done) => {
    expect(await homePage.getAppHeader().isPresent()).toBe(true);
    done();
  });

  it('TC_05 - Verify Homepage should provide an app-footer', async (done) => {
    expect(await homePage.getAppFooter().isPresent()).toBe(true);
    done();
  });

  it('TC_06 - Verify Homepage should provide a router-outlet', async (done) => {
    expect(homePage.getRouterOutlet().isPresent()).toBe(true);
    done();
  });
});
