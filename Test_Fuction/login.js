const { remote } = require('webdriverio');
const XLSX = require('xlsx');
const env = require('dotenv').config()
const ENVIRONMENT_VAR = process.env;
const IS_WINDOWS = process.platform === "win32";
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

async function loginSuccess() {
    const driver = await remote(wdOpts);
    try {
        await driver.pause(16000)

        //   const workbook = XLSX.readFile(IS_WINDOWS ? ENVIRONMENT_VAR.PATH_WIN : ENVIRONMENT_VAR.PATH_MAC)
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const emailData = sheet['F3'] ? sheet['F3'].v : null;
        const passData = sheet['F4'] ? sheet['F4'].v : null;
        console.log(emailData)
        console.log(passData)

        var checkLogin = await driver.$('//android.widget.TextView[@text="Đăng nhập và sử dụng ứng dụng theo cách của bạn"]')
        if (checkLogin != null) {
            sheet['J2'] = { v: 'Pass', t: 's' }
        }
        else {
            sheet['J2'] = { v: 'Fail', t: 's' }
        }

        var emailTextB = await driver.$('//android.widget.EditText[@resource-id="email"]')
        if (emailTextB != null) {
            sheet['J3'] = { v: 'Pass', t: 's' }
            await emailTextB.setValue(emailData)
        }
        else {
            sheet['J3'] = { v: 'Fail', t: 's' }
        }

        var passwordTextB = await driver.$('//android.widget.EditText[@resource-id="text-input-outlined"]')
        if (passwordTextB != null) {
            sheet['J4'] = { v: 'Pass', t: 's' }
            await passwordTextB.setValue(passData)
        }
        else {
            sheet['J4'] = { v: 'Fail', t: 's' }
        }

        var btnLogin = await driver.$('//android.view.ViewGroup[@content-desc="Login"]')
        await driver.pause(1000)
        var checkDirectPage = await driver.$('//android.widget.TextView[@text="Xin chào, anhBaDi 👋"]')

        if (btnLogin != null) {
            btnLogin.click();
            if (checkDirectPage != null) {
                sheet['J5'] = { v: 'Pass', t: 's' }
            }
        }
        else {
            sheet['J5'] = { v: 'Fail', t: 's' }
        }

        await driver.pause(1000)
        XLSX.writeFile(workbook, IS_WINDOWS ? ENVIRONMENT_VAR.PATH_WIN : ENVIRONMENT_VAR.PATH_MAC)
    } finally {

    }
}

module.exports = { loginSuccess }