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
        const sheetName = workbook.SheetNames[7];
        const sheet = workbook.Sheets[sheetName];
        const cellF4Value = sheet['F12'] ? sheet['F12'].v : null;
        const cellF5Value = sheet['F13'] ? sheet['F13'].v : null;
        sheet['F12']
        XLSX.utils.sheet_add_aoa(sheet, [['test']], {origin: 'I3'})
        XLSX.writeFile(workbook, 'test.xlsx')
        console.log(cellF4Value)
        console.log(cellF5Value)
        
        await driver.pause(14000)
        var warningMessage = await driver.$(`//android.view.ViewGroup[@content-desc="!, ViewPropTypes will be removed from React Native, along with all other PropTypes. We recommend that you migrate away from PropTypes and switch to a type system like TypeScript. If you need to continue using ViewPropTypes, migrate to the 'deprecated-react-native-prop-types' package."]/android.view.ViewGroup[3]`)
        await warningMessage.click()
        var txtEmail = await driver.$('//android.widget.EditText[@resource-id="email"]')
        await txtEmail.setValue(cellF4Value)
        XLSX.utils.sheet_add_aoa(sheet, [[sheet['G12'].v]], {origin: 'I12'})
        XLSX.utils.sheet_add_aoa(sheet, [['Pass']], {origin: 'J12'})
        await driver.pause(1000)
        var txtPassword = await driver.$('//android.widget.EditText[@resource-id="text-input-outlined"]')
        await txtPassword.setValue(cellF5Value)
        XLSX.utils.sheet_add_aoa(sheet, [[sheet['G13'].v]], {origin: 'I13'})
        XLSX.utils.sheet_add_aoa(sheet, [['Pass']], {origin: 'J13'})
        await driver.pause(1000)
        var btnLogin = await driver.$('//android.view.ViewGroup[@content-desc="Login"]')
        await btnLogin.click();
        await driver.pause(3000);
        XLSX.utils.sheet_add_aoa(sheet, [[sheet['G14'].v]], {origin: 'I14'})
        XLSX.utils.sheet_add_aoa(sheet, [['Pass']], {origin: 'J14'})
        var jobWrap = await driver.$('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup[1]/android.view.ViewGroup[1]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.HorizontalScrollView/android.view.ViewGroup/android.widget.HorizontalScrollView/android.view.ViewGroup')
        var jobItem = await jobWrap.$$('//android.view.ViewGroup')
        await jobItem[0].click();
        XLSX.utils.sheet_add_aoa(sheet, [[sheet['G15'].v]], {origin: 'I15'})
        XLSX.utils.sheet_add_aoa(sheet, [['Pass']], {origin: 'J15'})
        // var job = await driver.$('//android.view.ViewGroup[@content-desc="dgsdgsdi, dvadf, Back-end, Full-time, $1k - $200"]/android.view.ViewGroup')
        // job.click()
        await driver.pause(1000);
        await driver.pause(3000);
        var txtName = await driver.$('//android.widget.TextView[@resource-id="t_post_title"]')
        var nameJob = await txtName.getText()
        var txtCompany = await driver.$('//android.widget.TextView[@resource-id="t_nha_td_txt"]')
        var nameCompany = await txtCompany.getText()
        console.log(`${nameJob}, ${nameCompany}`)
        var btnApply = await driver.$('//android.view.ViewGroup[@resource-id="t_apply_btn"]')
        await btnApply.click()
        await driver.pause(1000)
        var modalInit = await driver.$('//android.view.ViewGroup[@resource-id="t_modal_apply_init"]')
        if(!modalInit){
            return {state: false, msg: 'Không có hộp thoại nào hiển thị'}
        }
        XLSX.utils.sheet_add_aoa(sheet, [[sheet['G16'].v]], {origin: 'I16'})
        XLSX.utils.sheet_add_aoa(sheet, [['Pass']], {origin: 'J16'})
        var btnCVPDF = await driver.$('//android.view.ViewGroup[@content-desc="Ứng tuyển với CV đã có, 💎 10"]')
        await btnCVPDF.click()
        await driver.pause(500)
        var cv_info = sheet['F18'].v
        var e = ""
        e.split(', ')
        try{
            var btnChooseFile = await driver.$(`//android.view.ViewGroup[@content-desc="${cv_info}"]`)
        } catch {
            XLSX.utils.sheet_add_aoa(sheet, [['Fail']], {origin: 'J18'})
            XLSX.utils.sheet_add_aoa(sheet, [['Không có CV với nội dung trên data.']], {origin: 'I18'})
            XLSX.writeFile(workbook, 'test.xlsx')
            return false
        }
        await btnChooseFile.click()
        XLSX.utils.sheet_add_aoa(sheet, [[sheet['G18'].v]], {origin: 'I18'})
        XLSX.utils.sheet_add_aoa(sheet, [['Pass']], {origin: 'J18'})
        await driver.pause(1000)
        warningMessage = await driver.$(`//android.view.ViewGroup[@content-desc="!, ViewPropTypes will be removed from React Native, along with all other PropTypes. We recommend that you migrate away from PropTypes and switch to a type system like TypeScript. If you need to continue using ViewPropTypes, migrate to the 'deprecated-react-native-prop-types' package. "]/android.view.ViewGroup[3]`)
        await warningMessage.click();
        await driver.pause(1000)
        var btnApply = await driver.$('//android.view.ViewGroup[@content-desc="Ứng tuyển, 💎 10"]')
        await btnApply.click()
        await driver.pause(1000)
        var txtTitleCV = await driver.$('//android.widget.TextView[@resource-id="cv_title"]')
        var txtLoaiCV = await driver.$('//android.widget.TextView[@resource-id="job_type"]')
        var txtViTri = await driver.$('//android.widget.TextView[@resource-id="cv_pos"]')
        var cv_info_arr = cv_info.split(', ')
        console.log(cv_info_arr)
        console.log(txtTitleCV.getText())
        if(await txtTitleCV.getText() == cv_info_arr[0] && await txtLoaiCV.getText() == cv_info_arr[2] && await txtViTri.getText() == cv_info_arr[4]){
            XLSX.utils.sheet_add_aoa(sheet, [['Pass']], {origin: 'J19'})
            XLSX.utils.sheet_add_aoa(sheet, [[sheet['G19']]], {origin: 'I19'})
        } else {
            XLSX.utils.sheet_add_aoa(sheet, [['Fail']], {origin: 'J19'})
            XLSX.utils.sheet_add_aoa(sheet, [['Có hiển thị hộp thoại nhưng nội dung CV không hợp cới CV đã chọn.']], {origin: 'I19'})
            XLSX.writeFile(workbook, 'test.xlsx')
            return false;
        }
        await driver.pause(2000)
        var btnBack = await driver.$('//android.view.ViewGroup[@content-desc="Xong"]')
        await btnBack.click()
        XLSX.utils.sheet_add_aoa(sheet, [['Pass']], {origin: 'J20'})
        XLSX.utils.sheet_add_aoa(sheet, [[sheet['G20']]], {origin: 'I20'})
        await driver.pause(1000)
        btnApply = await driver.$('//android.view.ViewGroup[@resource-id="t_apply_btn"]')
        await btnApply.click()
        await driver.pause(1000)
        btnBack = await driver.$('//android.view.ViewGroup[@content-desc="Xong"]')
        await btnBack.click()
        await driver.pause(1000)
        XLSX.utils.sheet_add_aoa(sheet, [['Pass']], {origin: 'J21'})
        XLSX.utils.sheet_add_aoa(sheet, [[sheet['G21']]], {origin: 'I21'})
        var btnReturn = await driver.$('//android.view.ViewGroup[@resource-id="t_btn_back"]/com.horcrux.svg.SvgView/com.horcrux.svg.GroupView/com.horcrux.svg.PathView[1]')
        await btnReturn.click()
        XLSX.utils.sheet_add_aoa(sheet, [['Pass']], {origin: 'J22'})
        XLSX.utils.sheet_add_aoa(sheet, [[sheet['G22']]], {origin: 'I22'})
        await driver.pause(2000)
        var bottomPRofile = await driver.$('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.View/android.view.View[5]')
        bottomPRofile.click();
        XLSX.utils.sheet_add_aoa(sheet, [['Pass']], {origin: 'J23'})
        XLSX.utils.sheet_add_aoa(sheet, [[sheet['G23']]], {origin: 'I23'})
        XLSX.writeFile(workbook, 'test.xlsx')
        await driver.pause(2000)
        var btnApplyHistory = await driver.$('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup[1]/android.view.ViewGroup[2]/android.view.View/android.view.View[5]')
        await btnApplyHistory.click()
        await driver.pause(3000)
        var btnStateApplication = await driver.$('//android.view.ViewGroup[@content-desc=" Tình trạng ứng tuyển "]');
        await btnStateApplication.click()
        var txtJobName = driver.$(`//android.widget.TextView[@text="${nameJob}"]`).catch(e => {
            return false;
        })
        return true
    } catch{
        
    } finally {
        
    } 
}
module.exports = {
    runTest
}