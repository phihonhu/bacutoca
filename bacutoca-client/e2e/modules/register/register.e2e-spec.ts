import { RegisterPage } from './register.po';
import { Constants } from '../../shared/constants';
import { Message } from './register.message';

describe('[Bacutoca] - Register page', () => {
  let registerPage: RegisterPage;
  registerPage = new RegisterPage();
  const userName = 'dam_' + registerPage.randomCharacter();

  beforeEach(async () => {
    await registerPage.navigateToRegisterPage();
    registerPage.maximizeBrowser();
    registerPage.clickToSignUpTab();
  });

  it('TC_01 - Verify Register page label', async (done)  => {
    expect(registerPage.getRegisterLabelText()).toEqual('Join our millionare club for free');
    done();
  });

  it('TC_02 - Verify Register page URL', async (done)  => {
    expect(registerPage.getURLRegisterPage()).toContain(`${Constants.registerPage}`);
    done();
  });

  it('TC_03 - Verify Register panel are displayed', async (done)  => {
    expect(registerPage.isRegisterPanelDisplayed()).toEqual(true);
    done();
  });

  it('TC_04 - Register not success incase Username empty', async (done)  => {
    registerPage.typeToUserName('');
    registerPage.typeToPassword('');
    registerPage.clickToRegisterButton();
    expect(registerPage.isRegisterActionMessageDisplayed()).toEqual(`${Message.USER_NAME_IS_REQUIRED}`);
    done();
  });

  it('TC_05 - Register not success incase Username invalid', async (done)  => {
    registerPage.typeToUserName('  ');
    registerPage.typeToPassword('123123');
    registerPage.clickToRegisterButton();
    expect(registerPage.isRegisterActionMessageDisplayed()).toEqual(`${Message.USER_NAME_IS_INVALID}`);
    done();
  });

  it('TC_06 - Register success incase Username valid', async (done)  => {
    registerPage.typeToUserName(userName);
    registerPage.typeToPassword('123123');
    registerPage.clickToRegisterButton();
    expect(registerPage.isRegisterActionMessageDisplayed()).toEqual(`${Message.REGISTER_SUCCESSFUL}`);
    done();
  });

  it('TC_07 - Register not success incase Username existed', async (done)  => {
    registerPage.typeToUserName(userName);
    registerPage.typeToPassword('123123');
    registerPage.clickToRegisterButton();
    expect(registerPage.isRegisterActionMessageDisplayed()).toEqual(`${Message.USER_NAME_ALREADY_EXISTS}`);
    done();
  });
});
