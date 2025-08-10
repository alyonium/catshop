import { test, expect } from '@playwright/test';
import { ShopPage } from 'tests/pages/Shop/Shop.page';
import { Cat } from 'src/types/types';

const mockCardData: Cat = {
  id: 'abc123',
  name: 'Fluffy',
  temperament: 'Playful',
  description: 'Very friendly',
  origin: 'USA',
};

test.describe('shop page', () => {
  let shopPage: ShopPage;

  const initPage = async ({ page }) => {
    shopPage = new ShopPage({ page });
    await shopPage.navigate();
  };

  test('should render the list after fetching', async ({ page }) => {
    await page.route('**/breeds**', async (route) => {
      await new Promise((res) => setTimeout(res, 1000));
      await route.fulfill({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([mockCardData]),
      });
    });

    await initPage({ page });

    await shopPage.loadingList();
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
    await initPage({ page });

    await shopPage.clickAddToCartButton();
    const cartDrawer = await shopPage.clickCartButton();
    await expect(cartDrawer.cartText).toHaveText(/You selected 1 cats/);
  });

  test.describe('shop errors', () => {
    test('should show error message when request on list returned a error', async ({
      page,
    }) => {
      await page.route('**/breeds**', async (route) => {
        await new Promise((res) => setTimeout(res, 1000));
        await route.fulfill({
          status: 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Internal Server Error',
        });
      });

      await initPage({ page });

      await shopPage.loadingList();
      await shopPage.toBeVisibleOnError();
    });
  });
});
