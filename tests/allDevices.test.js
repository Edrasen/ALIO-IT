import { fixture, Selector, test } from "testcafe";

const axios = require('axios')

const ui_url = 'http://localhost:3001/'

const api_url = "http://localhost:3000/devices"

fixture `Testing visibility of devices in NINJA UI`
    .page(ui_url)
    .before(async t => {
        //Test setup goes here
        //await raunDatabaseReset()
        //await seedTestData()
    })
    .beforeEach(async t => {
        //Runs before each test
        await t.setTestSpeed(0.2)
            //await t.maximizeWindow()
            //await t.setPageLoadTimeout(0)
    })
    .after(async t => {
        //Cleaning test data
        // Logging and sending data to monitoring systems
    })
    .afterEach(async t => {
        //Run after each test
        //await t.wait(3000)
    })


const getElementsByXPath = Selector(xpath => {
    const iterator = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    const items = [];

    let item = iterator.iterateNext();

    while (item) {
        items.push(item);
        item = iterator.iterateNext();
    }

    return items;
});


test(`Check if devices are visible in the DOM`, async(t) => {
    const response = await axios.get(api_url);
    if (response.statusText === "OK") {
        const devices = response.data;
        for (let device of devices) {
            console.log(`Got device with name: ${device.system_name}, type: ${device.type} and capacity of: ${device.hdd_capacity}`);
            let mydevice = Selector('.device-name').withText(device.system_name)
                //let mytype = Selector('.device-type').withText(device.type)
            let mytype = mydevice.sibling('.device-type').nth(0).withText(device.type)
                //let mycapacity = Selector('.device-capacity').withText(device.hdd_capacity)
            let mycapacity = mydevice.sibling('.device-capacity').nth(0).withText(device.hdd_capacity)

            let myDeviceOptions = getElementsByXPath(`//span[contains(text(),'${device.system_name}')]//ancestor::div[@class='device-info']//following-sibling::div[@class='device-options']`)

            let myDeletOption = myDeviceOptions.find('.device-remove').nth(0)

            let myEditOption = myDeviceOptions.find('.device-edit').nth(0)

            await t.expect(mydevice.visible).ok()
            await t.expect(mytype.visible).ok()
            await t.expect(mycapacity.visible).ok()
            await t.expect(myDeletOption.visible).ok()
            await t.expect(myEditOption.visible).ok()
        }
    }
})