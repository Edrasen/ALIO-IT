import { fixture, Selector, test } from "testcafe";

const ui_url = 'http://localhost:3001/'

fixture `Testing creation of devices in NINJA UI`
    .page(ui_url)
    .before(async t => {
        //Test setup goes here
        //await raunDatabaseReset()
        //await seedTestData()
    })
    .beforeEach(async t => {
        //Runs before each test
        await t.setTestSpeed(0.5)
            //await t.maximizeWindow()
            //await t.setPageLoadTimeout(0)
    })
    .after(async t => {
        //Cleaning test data
        // Logging and sending data to monitoring systems
    })
    .afterEach(async t => {
        //Run after each test
        await t.wait(2000)
    })



const generateRandomString = (num) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1 = '';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result1;
}

const generateRandomNumber = () => {
    return Math.floor(Math.random() * 4096);
}



const generateRandomIndex = () => {
    return Math.floor(Math.random() * 3)
}





function testAll() {
    let mySystemName = generateRandomString(8)
    let myCapacity = generateRandomNumber().toString()
    let myIndex = generateRandomIndex()

    const sytemTypeSelect = Selector('#type');
    const systemTypeOption = sytemTypeSelect.find('option').nth(myIndex)

    let textOnSelectedOption = ''

    test(`Device creation`, async(t) => {

        const addDeviceButton = Selector('.submitButton')
        const systemName = Selector('#system_name')
        const hddCapacity = Selector('#hdd_capacity')


        await t
            .click(addDeviceButton)
            .typeText(systemName, mySystemName)
            .click(sytemTypeSelect)
            .click(systemTypeOption)
            .typeText(hddCapacity, myCapacity)
        textOnSelectedOption = await systemTypeOption.innerText
        await t.click(addDeviceButton)

    })





    test(`Verification of correct device creation`, async(t) => {

        let mydeviceName = Selector('.device-name').withText(mySystemName)

        //let mytextType = Selector('.device-type').withText(text)
        let mydeviceType = mydeviceName.sibling('.device-type').nth(0).withText(textOnSelectedOption)

        //let mydeviceCapacity = Selector('.device-capacity').withText(myCapacity)
        let mydeviceCapacity = mydeviceName.sibling('.device-capacity').nth(0).withText(myCapacity)
            //console.log(text);

        await t.expect(mydeviceName.visible).ok()
        await t.expect(mydeviceCapacity.visible).ok()
        await t.expect(mydeviceType.visible).ok()
    })
}


testAll()