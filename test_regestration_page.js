const { assert } = require('chai');
const { Builder, until, By } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');
const { Locators } = require('./pages/commons/locators');
const { Variable } = require('./pages/commons/variable');
const { LoginPage } = require('./pages/login_page')
const sorts = require('./pages/commons/includes');
let browser;

before(function() {
  const chromeOptions = new Options();
  chromeOptions.excludeSwitches('enable-logging');//hide service message about Chrome DevTools
  browser = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
  return browser.get('https://propartner.veeam.com/');
});

after(function() {
  browser.quit();
});

describe('Suit for Registration page', function () {
  const locators = new Locators();
  const v = new Variable();
  
  it('The page is the Login page', async function () {

    const loginPage = new LoginPage(browser);
    await loginPage.shouldBeLoginPage();
    await loginPage.clickButtonCreatAcc();
  });
  
  it(`Select company from ${v.needtCountry} on the Rgistartion page`, async function () {
    
    const loginPage = new LoginPage(browser);    
    await loginPage.clickFieldRegion()
    await loginPage.chooseCountryFromList()
    
    //sort out table of companies and collect array of companies countries
    let listOfCompany = [];
    await sorts.sortOutTable(browser).then(list => listOfCompany = list);
    
    assert.isTrue(sorts.check(listOfCompany, `${v.needCountry}`),`The table should consist company only from ${v.needCountry}`);
    assert.isNotTrue(sorts.check(listOfCompany, `${v.wrongCountry}`),`The table should not consist company from ${v.wrongCountry}`);
  });
});