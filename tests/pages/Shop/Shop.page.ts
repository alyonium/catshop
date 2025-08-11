import { Page, Locator, expect } from '@playwright/test';

export class ShopPage {
  readonly page: Page;
  readonly list: Locator;
  readonly largeCard: Locator;
  readonly cartDrawer: Locator;
  readonly cartButton: Locator;
  readonly addToCartButton: Locator;
  readonly initialLoading: Locator;
  readonly infiniteLoading: Locator;
  readonly error: Locator;
  readonly infiniteScroll: Locator;
  readonly test: Locator;

  constructor({ page }: { page: Page }) {
    this.page = page;
    this.list = page.getByTestId('list');
    this.largeCard = page.getByTestId('large-card');
    this.cartDrawer = page.getByTestId('cart-drawer');
    this.cartButton = page.getByTestId('cart-button');
    this.addToCartButton = page.getByTestId('add-to-cart-button');
    this.initialLoading = page.getByTestId('list-initial-loading');
    this.infiniteLoading = page.getByTestId('list-infinite-loading');
    this.infiniteScroll = page.getByTestId('list').locator('..');
    this.error = page.getByTestId('list-error');
  }

  async getAllShownMessage() {
    return this.page.waitForSelector('[data-testid="all-cats-shown"]');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async initialListLoading() {
    await expect(this.initialLoading).toBeVisible();
    await expect(this.initialLoading).toBeHidden();
  }

  async infiniteListLoading() {
    await expect(this.infiniteLoading).toBeVisible();
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

  async scrollList() {
    await this.infiniteScroll.evaluate((el) => {
      el.scrollTop = el.scrollHeight;
    });
  }
}

class CartDrawer {
  readonly drawer: Locator;
  readonly backdrop: Locator;
  readonly cartText: Locator;
  readonly smallCard: Locator;
  readonly removeFromCartButton: Locator;
  readonly clearAllCartButton: Locator;

  constructor({ page, drawer }: { page: Page; drawer: Locator }) {
    this.drawer = drawer;
    this.backdrop = page.locator('.MuiModal-backdrop');
    this.cartText = page.getByTestId('cart-text');
    this.smallCard = page.getByTestId('small-card');
    this.removeFromCartButton = page.getByTestId('cart-remove-item-button');
    this.clearAllCartButton = page.getByRole('button', {
      name: 'Clear the cart',
    });
  }

  async toBeVisible() {
    await expect(this.drawer).toBeVisible();
  }

  async clickRemoveFromCartButton() {
    await this.removeFromCartButton.click();
    await expect(this.smallCard.first()).toBeHidden();
  }

  async close() {
    await this.backdrop.click();
    await expect(this.drawer).toBeHidden();
  }
}
