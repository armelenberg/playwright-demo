import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory';
import { loginToInventory } from '../helpers/auth.helper';
import { CheckoutPage } from '../pages/checkout';
import { CartPage } from '../pages/cart';

test.describe('Checkout Process Validation', () => {

    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutPage:CheckoutPage;

    test.beforeEach(async ({ page }) => {
        inventoryPage = await loginToInventory(page);
        cartPage = await new CartPage (page);
        checkoutPage = await new CheckoutPage (page);
    });

   test('add an item to cart', async ({ page }) => {
        await inventoryPage.addtoCart('Sauce Labs Backpack');
        const count = await inventoryPage.getCartCount();
        expect(count).toBe('1');
    });

    test('add multiple items to cart', async ({ page }) => {

        await inventoryPage.addtoCart('Sauce Labs Backpack');
        await inventoryPage.addtoCart('Sauce Labs Bike Light');
        const count = await inventoryPage.getCartCount();
        expect(count).toBe('2');
    });

    test('remove an item from cart', async ({ page }) => {

        await inventoryPage.addtoCart('Sauce Labs Backpack');
        await inventoryPage.removeFromCart('Sauce Labs Backpack');
        await expect(inventoryPage.cartBadge).toHaveCount(0);
    });

    test('complete checkout process', async ({ page}) =>{
        await inventoryPage.addtoCart('Sauce Labs Fleece Jacket');
        await inventoryPage.gotoCart();

        await cartPage.checkout();
        await checkoutPage.fillCustomerDetails(
            'John','Doe','41108');
        await checkoutPage.successfulCheckout();
    });

    test('empty customer information by checkout', async ({ page }) => {
        await inventoryPage.addtoCart('Sauce Labs Fleece Jacket');
        await inventoryPage.gotoCart();

        await cartPage.checkout();
        await checkoutPage.fillCustomerDetails(
            '','','');
        await checkoutPage.expectErrorMessage(
            'Error: First Name is required'
        );
        
    });



});

