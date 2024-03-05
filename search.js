const { remote } = require('webdriverio');
const XLSX = require('xlsx');
const env = require('dotenv').config()
const ENVIRONMENT_VAR = process.env;
const IS_WINDOWS = process.platform === "win32";
const login = require('./login')
async function runTest(wdOpts){
    const driver = await remote(wdOpts)
    try{
        //bước 1
        const workbook = XLSX.readFile(IS_WINDOWS ? ENVIRONMENT_VAR.PATH_WIN : ENVIRONMENT_VAR.PATH_MAC)
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const cellF4Value = sheet['F4'] ? sheet['F4'].v : null;
        const cellF5Value = sheet['F5'] ? sheet['F5'].v : null;
        sheet['F4']
        XLSX.utils.sheet_add_aoa(sheet, [['test']], {origin: 'I3'})
        XLSX.writeFile(workbook, 'test.xlsx')
        console.log(cellF4Value)
        console.log(cellF5Value)
        //đăng nhập
        await driver.pause(14000)
        var warningMessage = await driver.$(`//android.view.ViewGroup[@content-desc="!, ViewPropTypes will be removed from React Native, along with all other PropTypes. We recommend that you migrate away from PropTypes and switch to a type system like TypeScript. If you need to continue using ViewPropTypes, migrate to the 'deprecated-react-native-prop-types' package."]/android.view.ViewGroup[3]`)
        await warningMessage.click()
        var txtEmail = await driver.$('//android.widget.EditText[@resource-id="email"]')
        await txtEmail.setValue(cellF4Value)
        await driver.pause(1000)
        var txtPassword = await driver.$('//android.widget.EditText[@resource-id="text-input-outlined"]')
        await txtPassword.setValue(cellF5Value)
        await driver.pause(1000)
        var btnLogin = await driver.$('//android.view.ViewGroup[@content-desc="Login"]')
        await btnLogin.click();
        await driver.pause(3000);
    } finally {

    }
}