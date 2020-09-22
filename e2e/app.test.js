import puppetteer from 'puppeteer';

const childProcess = require('child_process');

let server = null;

jest.setTimeout(30000); // default puppeteer timeout
describe('test', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:9000';
  beforeAll(async () => {
    server = await childProcess.fork(`${__dirname}/test-server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', () => {
        reject();
      });
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // Опции в методе launch нужно закомментировать при запуске в CI.
      // headless: false, // show gui
      // slowMo: 1000,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
    server.kill();
  });
  // test code here
  // test start
  describe('Checking for a popup form to appear', () => {
    test('should open a form to create a product', async () => {
      await page.goto(baseUrl);
      const button = await page.$('.create-button');
      button.click();
      // expect(await form.$('#entercardState').innerText).toBe('проверено');
      await page.waitForSelector('.pop-up.pop-up_visible');
    });
  });

  describe('Product creation check', () => {
    test('A product with a "Test" name and a price of 100 should be created', async () => {
      await page.goto(baseUrl);
      const button = await page.$('.create-button');
      button.click();
      const form = await page.$('#product-form');
      const nameInput = await form.$('#product-form_name');
      const priceInput = await form.$('#product-form_price');
      const submitButton = await form.$('.save-button');
      await nameInput.type('Test');
      await priceInput.type('100');
      submitButton.click();
      await page.waitForSelector('tr[data-name="Test"]');
    });
  });
  // test end
});
