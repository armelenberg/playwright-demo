import { Page, expect, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly finishButton: Locator;
    readonly completeHeader: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.errorMessage = page.locator('[data-test="error"]')
        this.completeHeader = page.locator('.complete-header');
    }

    async goto(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com/checkout-step-one.html');
    }

    async fillCustomerDetails(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }

    async continueCheckout(): Promise<void> {
        await this.continueButton.click();
    }

    async cancelCheckout(): Promise<void> {
        await this.cancelButton.click();
    }

    async successfulCheckout(): Promise<void> {
        await this.finishButton.click();
        await expect(this.completeHeader).toBeVisible();
    }

    async expectErrorMessage(message: string): Promise<void> {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(message);
    };
}