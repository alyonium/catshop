import { Page, Locator, expect } from '@playwright/test';

export class ShopPage {
  readonly page: Page;
  readonly largeCard: Locator;
  readonly cartDrawer: Locator;
  readonly cartButton: Locator;
  readonly addToCartButton: Locator;
  readonly loading: Locator;
  readonly error: Locator;

  constructor({ page }: { page: Page }) {
    this.page = page;
    this.largeCard = page.getByTestId('large-card');
    this.cartDrawer = page.getByTestId('cart-drawer');
    this.cartButton = page.getByTestId('cart-button');
    this.addToCartButton = page.getByTestId('add-to-cart-button');
    this.loading = page.getByTestId('list-loading');
    this.error = page.getByTestId('list-error');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async loadingList() {
    await expect(this.loading).toBeVisible();
    await expect(this.loading).toBeHidden();
  }

  async toBeVisibleAfterListFetched() {
    await expect(this.largeCard.first()).toBeVisible();
    await expect(this.error).toBeHidden();
  }

  async toBeVisibleOnError() {
    await expect(this.largeCard).toHaveCount(0);
    await expect(this.error).toBeVisible();
  }

  async clickCartButton() {
    await this.cartButton.click();
    return new CartDrawer({ page: this.page, drawer: this.cartDrawer });
  }

  async clickAddToCartButton() {
    await this.addToCartButton.first().click();
  }
}

class CartDrawer {
  readonly drawer: Locator;
  readonly backdrop: Locator;
  readonly cartText: Locator;
  readonly clearAllCartButton: Locator;

  constructor({ page, drawer }: { page: Page; drawer: Locator }) {
    this.drawer = drawer;
    this.cartText = page.getByText(/You selected \d+ cats/);
    this.backdrop = page.locator('.MuiModal-backdrop');
    this.clearAllCartButton = page.getByRole('button', {
      name: 'Clear the cart',
    });
  }

  async toBeVisible() {
    await expect(this.drawer).toBeVisible();
  }

  async close() {
    await this.backdrop.click();
    await expect(this.drawer).toBeHidden();
  }
}
