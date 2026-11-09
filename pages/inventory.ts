import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly inventoryContainer: Locator;
    readonly inventoryItems: Locator;
    readonly cartButton: Locator;
    readonly menuButton: Locator;
    readonly dropdownSort: Locator;
    readonly shoppingCart: Locator;
    readonly removeButton: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryContainer = page.locator('.inventory_container');
        this.inventoryItems = page.locator('.inventory_item');
        this.cartButton = page.getByRole('button', { name: 'Add to cart' });
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.dropdownSort = page.locator('.product_sort_container');
        this.shoppingCart = page.locator('.shopping_cart_badge');
        this.removeButton = page.getByRole('button', { name: 'Remove' });
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async goto(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }

    async expectLoaded(): Promise<void> {
        await expect(this.inventoryContainer).toBeVisible();
    }

    async addtoCart(itemName: string): Promise<void> {
        const item = this.page.locator('.inventory_item', {hasText: itemName});
        await item.getByRole('button', {name: 'Add to cart'}).click();
    }

    async removeFromCart(itemName: string): Promise<void> {
        const item = this.page.locator('.inventory_item',{ hasText: itemName });
        await item.getByRole('button', { name: 'Remove' }).click();
    }

    async sortItems(sortOption: 'az' | 'za' | 'hilo' | 'lohi'): Promise<void> {
        await this.dropdownSort.selectOption(sortOption);
    }

    async gotoCart(): Promise<void> {
        await this.shoppingCart.click();
    }

    async getCartCount(): Promise<string> {
        return await this.cartBadge.innerText();

};


};
