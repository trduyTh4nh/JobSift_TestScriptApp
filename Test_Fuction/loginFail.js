const { remote } = require('webdriverio');
const XLSX = require('xlsx');
const env = require('dotenv').config()
const ENVIRONMENT_VAR = process.env;
const IS_WINDOWS = process.platform === "win32";
const TestloginSuccess = require('./login.js')

console.log(IS_WINDOWS)
const capabilities = {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Android',
    'appium:appPackage': 'com.jobapp',
    'appium:appActivity': '.MainActivity',
};

const wdOpts = {
    hostname: process.env.APPIUM_HOST || 'localhost',
    port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
    logLevel: 'info',
    capabilities,
};

const workbook = XLSX.readFile(IS_WINDOWS ? ENVIRONMENT_VAR.PATH_WIN : ENVIRONMENT_VAR.PATH_MAC)

async function loginFail() {
    const driver = await remote(wdOpts);
    try {
        await driver.pause(14000)

        const workbook = XLSX.readFile(IS_WINDOWS ? ENVIRONMENT_VAR.PATH_WIN : ENVIRONMENT_VAR.PATH_MAC)
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const emailData = sheet['F7'] ? sheet['F7'].v : null;

        const passData = sheet['F8'] ? sheet['F8'].v : null;


        await driver.pause(1000)
        var checkLogin = await driver.$('//android.widget.TextView[@text="Đăng nhập và sử dụng ứng dụng theo cách của bạn"]')
        if (checkLogin != null) {
            sheet['J6'] = { v: 'Pass', t: 's' }
        }
        else {
            sheet['J6'] = { v: 'Fail', t: 's' }

        }

        var emailTextB = await driver.$('//android.widget.EditText[@resource-id="email"]')
        await driver.pause(1000)
        if (emailTextB != null) {
            sheet['J7'] = { v: 'Pass', t: 's' }

            await emailTextB.setValue(emailData)
        }
        else {
            sheet['J7'] = { v: 'Fail', t: 's' }

        }

        var passwordTextB = await driver.$('//android.widget.EditText[@resource-id="text-input-outlined"]')
        if (passwordTextB != null) {
            sheet['J8'] = { v: 'Pass', t: 's' }
            await passwordTextB.setValue(passData)
        }
        else {
            sheet['J8'] = { v: 'Fail', t: 's' }
        }

        var btnLogin = await driver.$('//android.view.ViewGroup[@content-desc="Login"]')
        await driver.pause(1000)
        var checkIfLoginFail = await driver.$('//android.widget.TextView[@text="Thông tin không hợp lệ, vui lòng kiểm tra lại Email và Mật khẩu"]')
        if (btnLogin != null) {
          
            if (checkIfLoginFail != null) {
                sheet['J9'] = { v: 'Pass', t: 's' }
                btnLogin.click();
            }
            else {
                sheet['J9'] = { v: 'Fail', t: 's' }
            }
        }
        else {
            sheet['J9'] = { v: 'Fail', t: 's' }

        }
        await driver.pause(1000)
        XLSX.writeFile(workbook, IS_WINDOWS ? ENVIRONMENT_VAR.PATH_WIN : ENVIRONMENT_VAR.PATH_MAC)
    } finally {

    }
}

module.exports = { loginFail }