const { Locators } = require('./commons/locators');
const { until, By } = require('selenium-webdriver');
const { assert } = require('chai');
const sorts = require('./commons/includes');

class LoginPage {
    
    constructor(browser) {
        this.browser = browser;
        this.locators = new Locators();
        this.btnCreateAcc;
    }
    
    async shouldBeLoginPage() {
        let urlCurrent;
        this.btnCreateAcc = await this.browser.wait(until.elementLocated(By.css(this.locators.creatAcc)), 25000);
        await this.browser.getCurrentUrl().then(url => {urlCurrent = url});
        assert.include(urlCurrent, 'login', 'It should be Login page');
    }
    
    async clickButtonCreatAcc () {
        this.btnCreateAcc = await this.browser.wait(until.elementLocated(By.css(this.locators.creatAcc)), 25000);
        this.btnCreateAcc.click();
    }

    async clickFieldRegion() {
        let downList = await this.browser.wait(until.elementLocated(By.css(this.locators.companyRegion)), 10000);
        downList.click();
    }

    async chooseCountryFromList() {
        await this.browser.wait(until.elementLocated(By.css(sorts.sortOutList(this.browser))), 2000).click();
        await this.browser.wait(until.elementLocated(By.css(this.locators.findCompany)), 1000).click();
    }

}

module.exports = {LoginPage}