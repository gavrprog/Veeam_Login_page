
    const { Builder, until, By } = require('selenium-webdriver');
    const { Variable } = require('./variable');

    const v = new Variable();

    async function sortOutTable(browser){
        var listOfCompany = [];
        var flag = true;
        var locator;
        var i = 1;
        while (flag) {
            locator = `tbody tr:nth-child(${i}) td:nth-child(2)`;
            try {
              await browser.wait(until.elementLocated(By.css(locator)), 5000)
                           .getText()
                           .then((text) => {
                              listOfCompany[i - 1] = text;
                              
                            });
            } catch(err) {
                if (err.name == 'TimeoutError') flag = false; 
                else throw err;
              };
          i++
          };
          //collect table for further manipulation with country list
          return listOfCompany; 
    }

    async function sortOutList(browser){
        let flag = true;
        let locator;
        let i = 0;
        while (flag) {
            locator = `li > #ui-select-choices-row-0-${i} > span > div`;
            try {
              await browser.wait(until.elementLocated(By.css(locator)), 5000)
                           .getText()
                           .then((text) => { 
                            if (text == `${v.needCountry}`) flag = false;
                          });
            } catch(err) {
                if (err.name == 'TimeoutError') flag = false;
                else throw err;
              };
          i++
          };
        return locator;
    }
  
    function check(arr, val) {
      let end = arr.length-1;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== val) return false;
      }
      return true;
    }

exports.sortOutList = sortOutList;
exports.sortOutTable = sortOutTable;
exports.check = check;