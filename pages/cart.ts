import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    }

    async goto(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com/cart.html');
    }

    async expectLoaded(): Promise<void> {
        await expect(this.cartItems).toBeVisible();
        await expect(this.checkoutButton).toBeVisible();
        await expect(this.continueShoppingButton).toBeVisible();
    }

    async checkout(): Promise<void> {
        await this.checkoutButton.click();
    }

    async continueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }
};
