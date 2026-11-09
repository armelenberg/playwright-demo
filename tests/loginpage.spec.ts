import { test, Page, expect } from '@playwright/test';
import { userData } from '../data/userdata';
import { LoginPage } from '../pages/login';
import { InventoryPage } from '../pages/inventory';

test.describe('Login Page Tests', () => {

    test('user can login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.goto();
        await loginPage.login(
            userData.userName, 
            userData.password
        );

        await inventoryPage.expectLoaded();
        // Add assertions to verify successful login
    });

    test('user cannot login with invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(
            userData.invalidUserName, 
            userData.invalidPassword
        );

        await loginPage.expectErrorMessage(
            'Epic sadface: Username and password do not match any user in this service'
        );
    });

    test('locked out user cannot login', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(
            userData.lockedUser, 
            userData.password
        );

        await loginPage.expectErrorMessage(
            'Epic sadface: Sorry, this user has been locked out.'
        );
    });

    test('cannot login with empty fields', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('', '');

        await loginPage.expectErrorMessage(
            'Epic sadface: Username is required'
        );
        
    });
});
