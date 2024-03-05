
const { remote } = require('webdriverio');
const XLSX = require('xlsx');
const ungtuyen = require('./ung_tuyen')
const env = require('dotenv').config()
const ENVIRONMENT_VAR = process.env;
const IS_WINDOWS = process.platform === "win32";
console.log(IS_WINDOWS)


const testLogout = require('./Test_Fuction/logout')
const testLogin = require('./Test_Fuction/login')
const testLoginFail = require('./Test_Fuction/loginFail')
const testBuyDimond = require('./Test_Fuction/buyDimond')
const workbook = XLSX.readFile(IS_WINDOWS ? ENVIRONMENT_VAR.PATH_WIN : ENVIRONMENT_VAR.PATH_MAC)
async function loginSuccess() {
  try {

    // TestloginSuccess.loginSuccess()
    // TestloginSuccess.loginFail()
    //testLoginFail.loginFail()
    testBuyDimond.buyDimondSuccess()

  } finally {

  }
}

loginSuccess().catch(console.error);
