const { test, expect } = require('@playwright/test');

const CLIENT_EMAIL = "valentin-client@ardeco.app";
const BUSINESS_EMAIL = "valentin-company@ardeco.app";
const ADMIN_EMAIL = "valentin-admin@ardeco.app";
const PASSWORD = "123";

test.describe('Page login tests', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/login');
    });

    test('Log in as Client', async ({ page }) => {
        const emailInput = await page.locator('#loginEmail');
        const passwordInput = await page.locator('#loginPassword');
        const connectionButton = page.locator('button:has-text("Se connecter"), button:has-text("Login")');

        await emailInput.fill(CLIENT_EMAIL);
        await passwordInput.fill(PASSWORD);
        await connectionButton.click();

        await expect(page).toHaveURL(/profile/);
    });

    test('Log in as Business', async ({ page }) => {
        const emailInput = await page.locator('#loginEmail');
        const passwordInput = await page.locator('#loginPassword');
        const connectionButton = page.locator('button:has-text("Se connecter"), button:has-text("Login")');

        await emailInput.fill(BUSINESS_EMAIL);
        await passwordInput.fill(PASSWORD);
        await connectionButton.click();

        await expect(page).toHaveURL(/profile/);
    });

    test('Log in as Admin', async ({ page }) => {
        const emailInput = await page.locator('#loginEmail');
        const passwordInput = await page.locator('#loginPassword');
        const connectionButton = page.locator('button:has-text("Se connecter"), button:has-text("Login")');

        await emailInput.fill(ADMIN_EMAIL);
        await passwordInput.fill(PASSWORD);
        await connectionButton.click();

        await expect(page).toHaveURL(/profile/);
    });

});