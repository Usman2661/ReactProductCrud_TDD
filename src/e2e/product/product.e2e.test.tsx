const puppeteer = require('puppeteer');
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter() });

let page: any;
let browser: any;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    devtools: false,
    slowMo: 150,
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
describe('Products', () => {
  test('Table is loaded by default', async () => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.productTable');
  }, 9000000);

  test('New Modal is opened', async () => {
    await page.goto('http://localhost:3000/');
    // await page.waitForSelector('.productTable');
    await page.waitForSelector('#productButton');
    await page.click('#productButton');
    await page.waitForSelector('.productModal');
    // await browser.close();
  }, 9000000);
});
