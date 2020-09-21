// import puppetteer from 'puppeteer';

// const childProcess = require('child_process');

// let server = null;

// jest.setTimeout(30000); // default puppeteer timeout
// describe('popover', () => {
//   let browser = null;
//   let page = null;
//   const baseUrl = 'http://localhost:9000';
//   beforeAll(async () => {
//     server = await childProcess.fork(`${__dirname}/test-server.js`);
//     await new Promise((resolve, reject) => {
//       server.on('error', () => {
//         reject();
//       });
//       server.on('message', (message) => {
//         if (message === 'ok') {
//           resolve();
//         }
//       });
//     });

//     browser = await puppetteer.launch({
//       // Опции в методе launch нужно закомментировать при запуске в CI.
//       // headless: false, // show gui
//       // slowMo: 500,
//       // devtools: true, // show devTools
//     });
//     page = await browser.newPage();
//   });
//   afterAll(async () => {
//     await browser.close();
//     server.kill();
//   });
//   // test code here
//   // test start
//   describe('Checking the appearance popover', () => {
//     test('should add .popover_visible class when clicking on the button', async () => {
//       await page.goto(baseUrl);
//       const button = await page.$('.btn');
//       button.click();
//       // expect(await form.$('#entercardState').innerText).toBe('проверено');
//       await page.waitForSelector('.popover.popover_visible');
//     });
//   });
//   describe('Checking if the popover is hidden', () => {
//     test('should remove the .popover_visible class on button click', async () => {
//       await page.goto(baseUrl);
//       const button = await page.$('.btn');
//       button.click();
//       button.click();
//       // expect(await form.$('#entercardState').innerText).toBe('проверено');
//       await page.waitForSelector('.popover');
//     });
//   });
//   // test end
// });
