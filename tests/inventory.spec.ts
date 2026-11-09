import{ test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory';
import { loginToInventory } from '../helpers/auth.helper';

test.describe('Inventory Page Tests', () => {

    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        inventoryPage = await loginToInventory(page);
    });

    test('user can sort items from low to high price', async ({ page }) => {
        await inventoryPage.sortItems('lohi');
        const sortedPrice = await page.locator('.inventory_item_price').first().innerText();
        expect(sortedPrice).toBe('$7.99');

    });

    test('user can sort items from high to low price', async ({ page }) => {
        await inventoryPage.sortItems('hilo');
        const sortedPrice = await page.locator('.inventory_item_price').first().innerText();
        expect(sortedPrice).toBe('$49.99');
       
    }); 

    test('user can sort items alphabetically (A to Z', async ({ page }) => {
        await inventoryPage.sortItems('az');
        const sortedItems = await page.locator('.inventory_item_name').first().innerText();
        expect(sortedItems).toBe('Sauce Labs Backpack');

    });


});


