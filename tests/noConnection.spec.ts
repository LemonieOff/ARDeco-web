const { test, expect } = require('@playwright/test');

test.describe('Pages available without login', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
    });

    test('Is server up?', async ({ page }) => {
        const welcomeTitle = page.locator('#welcomeTitle');
        await expect(welcomeTitle).toBeVisible();
    });

    test('Go to product page', async ({ page }) => {
        const productPageLink = page.locator('[href="/product"]');

        const linkCount = await productPageLink.count();
        if (linkCount > 1) {
            console.warn(`Multiple links to the product page found. Clicking the second one.`);
        }
        
        await productPageLink.nth(1).click();
        await expect(page).toHaveURL(/\/product/);
    });

    test('Go to team page', async ({ page }) => {
        const teamPageLink = page.locator('[href="/team"]');

        const linkCount = await teamPageLink.count();
        if (linkCount > 1) {
            console.warn(`Multiple links to the team page found. Clicking the second one.`);
        }

        await teamPageLink.nth(1).click();
        await expect(page).toHaveURL(/\/team/);
    });

    test('Does the dropdown menu work (no user)', async ({ page }) => {
        const dropdownButton = page.locator('#user');

        const catalogPageLink = page.locator('[href="/catalog"]');
        const loginPageLink = page.locator('#loginMenuOption');

        await page.waitForTimeout(500);
        await dropdownButton.click();

        await expect(catalogPageLink).toBeVisible()
        await expect(loginPageLink).toBeVisible()
    });

    test('Go to CGU page', async ({ page }) => {
        await page.goto('http://localhost:3000/cgu');
        const title = page.locator('h1:text("Conditions Générales d\'Utilisation")');

        await expect(title).toBeVisible();
    });

    test('Go to privacy policy page', async ({ page }) => {
        await page.goto('http://localhost:3000/privacy-policy');
        const title = page.locator('h1:text("Politique de confidentialité")');
    

        await expect(title).toBeVisible();
    });

    test('Activate dark mode', async ({ page }) => {
        const darkModeButtonBefore = page.locator(".iconify.i-uil\\:moon");
        const darkModeButtonAfter = page.locator(".iconify.i-uil\\:sun");

        await darkModeButtonBefore.nth(1).click()
        await page.waitForTimeout(500);
        await expect(darkModeButtonAfter.nth(1)).toBeVisible();
        await page.waitForTimeout(500);
        await darkModeButtonAfter.nth(1).click()
        await expect(darkModeButtonBefore.nth(1)).toBeVisible();
    });

    test('Change language', async ({ page }) => {
        const flagBeforeButton = page.locator(".iconify.i-twemoji\\:flag-united-states");
        const flagAfterButton = page.locator(".iconify.i-twemoji\\:flag-france");

        await flagBeforeButton.nth(1).click()
        await page.waitForTimeout(1000);
        await expect(flagAfterButton.nth(1)).toBeVisible();
        await page.waitForTimeout(1000);
        await flagAfterButton.nth(1).click()
        await expect(flagBeforeButton.nth(1)).toBeVisible();
    });

});
