import { Page, expect } from '@playwright/test';
import { userData } from '../data/userdata';
import { LoginPage } from '../pages/login';
import { InventoryPage } from '../pages/inventory';

export async function login(page: Page): Promise<void> {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
        userData.userName,
        userData.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
}

export async function loginToInventory(page: Page): Promise<InventoryPage> {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
        userData.userName,
        userData.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    return new InventoryPage(page);
}