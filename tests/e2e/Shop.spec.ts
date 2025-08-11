import { test, expect } from '@playwright/test';
import { ShopPage } from 'tests/pages/Shop/Shop.page';
import { Cat } from 'src/types/types';

const mockCardDataPage: Cat[] = [
  {
    id: 'abc123',
    name: 'Fluffy',
    temperament: 'Playful',
    description: 'Very friendly',
    origin: 'USA',
  },
  {
    id: 'abc124',
    name: 'Fiffi',
    temperament: 'Friendly',
    description: 'Very kind',
    origin: 'Russia',
  },
  {
    id: 'abc125',
    name: 'Snowball',
    temperament: 'Kind',
    description: 'Very lazy',
    origin: 'Spain',
  },
  {
    id: 'abc126',
    name: 'Mimi',
    temperament: 'Playful',
    description: 'Very friendly',
    origin: 'USA',
  },
  {
    id: 'abc127',
    name: 'Lili',
    temperament: 'Friendly',
    description: 'Very kind',
    origin: 'Russia',
  },
  {
    id: 'abc128',
    name: 'Cesar',
    temperament: 'Kind',
    description: 'Very lazy',
    origin: 'Spain',
  },
  {
    id: 'abc129',
    name: 'Hagrid',
    temperament: 'Playful',
    description: 'Very friendly',
    origin: 'USA',
  },
  {
    id: 'abc130',
    name: 'Jack',
    temperament: 'Friendly',
    description: 'Very kind',
    origin: 'Russia',
  },
  {
    id: 'abc131',
    name: 'Ghost',
    temperament: 'Kind',
    description: 'Very lazy',
    origin: 'Spain',
  },
  {
    id: 'abc132',
    name: 'Grinch',
    temperament: 'Kind',
    description: 'Very lazy',
    origin: 'Spain',
  },
];

const mockBadRequest = async ({ page }) => {
  await page.route('**/breeds**', async (route) => {
    await new Promise((res) => setTimeout(res, 1000));
    await route.fulfill({
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Internal Server Error',
    });
  });
};

const mockGoodRequest = async ({ page }) => {
  await page.route(`**/breeds**`, async (route) => {
    await new Promise((res) => setTimeout(res, 1000));
    await route.fulfill({
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockCardDataPage),
    });
  });
};

test.describe('shop page', () => {
  let shopPage: ShopPage;

  const initPage = async ({ page }) => {
    shopPage = new ShopPage({ page });
    await shopPage.navigate();
  };

  test('should render the list after fetching', async ({ page }) => {
    await mockGoodRequest({ page });
    await initPage({ page });

    await shopPage.initialListLoading();
    await shopPage.toBeVisibleAfterListFetched();
  });

  test('should open cart drawer', async ({ page }) => {
    await initPage({ page });

    const cartDrawer = await shopPage.clickCartButton();
    await cartDrawer.toBeVisible();
  });

  test('should close cart drawer', async ({ page }) => {
    await initPage({ page });

    const cartDrawer = await shopPage.clickCartButton();
    await cartDrawer.close();
  });

  test('should add item to cart', async ({ page }) => {
    await mockGoodRequest({ page });
    await initPage({ page });
    await shopPage.initialListLoading();

    await shopPage.clickAddToCartButton();
    const cartDrawer = await shopPage.clickCartButton();
    await expect(cartDrawer.cartText).toHaveText(/You selected 1 cats/);
  });

  test('should add item to cart once', async ({ page }) => {
    await mockGoodRequest({ page });
    await initPage({ page });
    await shopPage.initialListLoading();

    await shopPage.clickAddToCartButton();
    const cartDrawer = await shopPage.clickCartButton();
    await expect(cartDrawer.cartText).toHaveText(/You selected 1 cats/);
    await cartDrawer.close();
    await expect(shopPage.addToCartButtons.first()).toBeDisabled();
  });

  test('should add multiple items to cart', async ({ page }) => {
    await mockGoodRequest({ page });
    await initPage({ page });
    await shopPage.initialListLoading();

    await shopPage.addToCartButtons.nth(0).click();
    await shopPage.addToCartButtons.nth(1).click();
    await shopPage.addToCartButtons.nth(2).click();

    const cartDrawer = await shopPage.clickCartButton();
    await expect(cartDrawer.cartText).toHaveText(/You selected 3 cats/);
  });

  test('should add and remove item from cart', async ({ page }) => {
    await mockGoodRequest({ page });
    await initPage({ page });
    await shopPage.initialListLoading();

    await shopPage.clickAddToCartButton();
    const cartDrawer = await shopPage.clickCartButton();
    await expect(cartDrawer.cartText).toHaveText(/You selected 1 cats/);

    await cartDrawer.clickRemoveFromCartButton();
    await expect(cartDrawer.cartText).toHaveText(/List is empty/);
  });

  test('should load list items after scroll', async ({ page }) => {
    await mockGoodRequest({ page });
    await initPage({ page });
    await shopPage.initialListLoading();
    await expect(shopPage.largeCard).toHaveCount(10);

    await mockGoodRequest({ page });
    await shopPage.scrollList();
    await shopPage.infiniteListLoading();
    await expect(shopPage.largeCard).toHaveCount(20);
  });

  test('should save selected cats after reload', async ({ page }) => {
    await mockGoodRequest({ page });
    await initPage({ page });
    await shopPage.initialListLoading();

    await shopPage.clickAddToCartButton();
    let cartDrawer = await shopPage.clickCartButton();
    await expect(cartDrawer.cartText).toHaveText(/You selected 1 cats/);

    await page.reload();

    cartDrawer = await shopPage.clickCartButton();
    await expect(cartDrawer.cartText).toHaveText(/You selected 1 cats/);
  });

  test.describe('shop errors', () => {
    test('should show error message when request on list returned a error', async ({
      page,
    }) => {
      await mockBadRequest({ page });
      await initPage({ page });

      await shopPage.initialListLoading();
      await shopPage.toBeVisibleOnError();
    });
  });
});
