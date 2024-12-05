const { test, expect } = require('@playwright/test');

const ADMIN_EMAIL = "valentin-admin@ardeco.app";
const PASSWORD = "123";

test.describe('Admin user tests', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/login');
        const emailInput = await page.locator('#loginEmail');
        const passwordInput = await page.locator('#loginPassword');
        const connectionButton = page.locator('button:has-text("Se connecter"), button:has-text("Login")');

        await emailInput.fill(ADMIN_EMAIL);
        await passwordInput.fill(PASSWORD);
        await connectionButton.click();

        await expect(page).toHaveURL(/profile/);
        await page.goto('http://localhost:3000');
    });

    test('Does the dropdown menu work (admin user)', async ({ page }) => {
        const dropdownButton = page.locator('#user');

        const profilePageLink = page.locator('[href="/profile"]');
        const settingsPageLink = page.locator('[href="/settings"]');
        const catalogPageLink = page.locator('[href="/catalog"]');
        const cartPageLink = page.locator('[href="/cart"]');
        const ticketsPageLink = page.locator('[href="/tickets"]');
        const feedbackPageLink = page.locator('[href="/feedback"]');
        const logoutPageLink = page.locator('#logoutMenuOption');

        await page.waitForTimeout(500);
        await dropdownButton.click();

        await expect(profilePageLink).toBeVisible()
        await expect(settingsPageLink).toBeVisible()
        await expect(catalogPageLink).toBeVisible()
        await expect(cartPageLink).toBeVisible()
        await expect(ticketsPageLink).toBeVisible()
        await expect(feedbackPageLink).toBeVisible()
        await expect(logoutPageLink).toBeVisible()
    });

});
