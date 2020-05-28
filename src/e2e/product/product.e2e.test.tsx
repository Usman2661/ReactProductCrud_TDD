const puppeteer = require('puppeteer');
import expect from 'expect-puppeteer';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter() });

let page: any;
let browser: any;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    devtools: false,
    slowMo: 20,
  });
  page = await browser.newPage();
  page.emulate({
    viewport: {
      width: 1536,
      height: 864,
    },
    userAgent: '',
  });
});

const number = Math.floor(Math.random() * 90000) + 10000;
const email = `test${number}@test.com`;

const product = {
  Product: 'End to End Testing',
  ProductCode: 'E2E',
  ProductLocation: 'Test Town',
  ProductCost: '133.33',
  ProductOwner: 'Test',
  OwnerEmail: email,
};

describe('Products', () => {
  test('Table is loaded by default', async () => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.productTable');
  }, 9000000);

  test('Creating a new product', async () => {
    await page.goto('http://localhost:3000/');
    // await page.waitForSelector('.productTable');
    await page.waitForSelector('#productButton');
    await page.click('#productButton');
    await page.waitForSelector('.productModal');

    await page.click('.Product');
    await page.type('.Product', product.Product);

    await page.click('.ProductCode');
    await page.type('.ProductCode', product.ProductCode);

    await page.click('.ProductLocation');
    await page.type('.ProductLocation', product.ProductLocation);

    await page.click('.ProductCost');
    await page.type('#basic_ProductCost', product.ProductCost);

    await page.click('.ProductOwner');
    await page.type('.ProductOwner', product.ProductOwner);

    await page.click('.OwnerEmail');
    await page.type('.OwnerEmail', product.OwnerEmail);

    await page.waitForSelector('.saveProduct');
    await page.click('#saveProduct');

    await page.waitForSelector('.alertMessagesuccess');

    // await browser.close();
  }, 9000000);

  test('Editing a product', async () => {
    await page.goto('http://localhost:3000/');
    // await page.waitForSelector('.productTable');
    await page.waitForSelector('.productTable');

    await page.waitForSelector('.editProduct');
    await page.click('.editProduct');
  }, 9000000);

  test('Deleting a product', async () => {
    await page.goto('http://localhost:3000/');
    // await page.waitForSelector('.productTable');
    await page.waitForSelector('.productTable');

    await page.waitForSelector('.deleteProduct');
    await page.click('.deleteProduct');

    await page.waitForSelector('.alertMessagewarning');

    // await browser.close();
  }, 9000000);
});
