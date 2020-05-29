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
    slowMo: 6,
  });
  page = await browser.newPage();
  page.emulate({
    viewport: {
      width: 1536,
      height: 864,
    },
    userAgent: '',
  });
  jest.setTimeout(9000000);

  await page.goto('http://localhost:3000/');
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

const updateProduct = {
  Product: 'Update E2E',
  ProductCode: 'Update E2E',
  ProductLocation: 'Update Test Town',
  ProductCost: '155.55',
  ProductOwner: 'Update Test',
  OwnerEmail: 'update' + email,
};

describe('Products', () => {
  test('Table is Loaded with data', async (done) => {
    await page.waitForSelector('.productTable');
    done();
  }, 9000000);

  test('Creating a new product', async (done) => {
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

    await page.waitForSelector('.alertMessagecreatesuccess');

    done();
  }, 9000000);

  test('Editing a product', async (done) => {
    // await page.waitForSelector('.productTable');
    await page.waitForSelector('.productTable');

    await page.waitForSelector('.editProduct');
    await page.click('.editProduct');

    await page.click('.Product', { clickCount: 3 });
    await page.type('.Product', updateProduct.Product);

    await page.click('.ProductCode', { clickCount: 3 });
    await page.type('.ProductCode', updateProduct.ProductCode);

    await page.click('.ProductLocation', { clickCount: 3 });
    await page.type('.ProductLocation', updateProduct.ProductLocation);

    await page.click('.ProductCost', { clickCount: 3 });
    await page.click('#basic_ProductCost', { clickCount: 3 });
    await page.type('#basic_ProductCost', updateProduct.ProductCost);

    await page.click('.ProductOwner', { clickCount: 3 });
    await page.type('.ProductOwner', updateProduct.ProductOwner);

    await page.click('.OwnerEmail', { clickCount: 3 });
    await page.type('.OwnerEmail', updateProduct.OwnerEmail);

    await page.waitForSelector('.saveProduct');
    await page.click('#saveProduct');

    await page.waitForSelector('.alertMessageupdatesuccess');
    done();
  }, 9000000);

  test('Deleting a product', async (done) => {
    // await page.waitForSelector('.productTable');
    await page.waitForSelector('.productTable');
    await page.waitForSelector('.deleteProduct');
    await page.click('.deleteProduct');
    await page.waitForSelector('.alertMessagedeletewarning');
    done();
  }, 9000000);
});
