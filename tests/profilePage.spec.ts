import { test, expect, type Page } from '@playwright/test';

test.describe('Profile Page', () => {
  test('[Prod] Profile page with computer resolution', async ({ page }) => {
    await page.goto('https://ardeco.app/profile');
    page.setViewportSize({width: 1920, height: 966});
    const navbar = await page.locator('.navbar').first();
    await expect(navbar).toHaveScreenshot();

    const title = await page.locator('.title');
    await expect(title).toHaveScreenshot();

    const content = await page.locator('.content');
    await expect(content).toHaveScreenshot();

    await page.locator('#dark-mode-button').first().click();
    await expect(title).toHaveScreenshot();
    await expect(content).toHaveScreenshot();
  });

  test('[Prod] Profile page with mobile resolution', async ({ page }) => {
    await page.goto('https://ardeco.app/profile');
    page.setViewportSize({width: 393, height: 851});
    const navbar = await page.locator('.navbar').first();
    await expect(navbar).toHaveScreenshot();

    const title = await page.locator('.title');
    await expect(title).toHaveScreenshot();

    const content = await page.locator('.content');
    await expect(content).toHaveScreenshot();

    await page.locator('#dark-mode-button').first().click();
    await expect(title).toHaveScreenshot();
    await expect(content).toHaveScreenshot();
  });

  test('[Localhost] Profile page with computer resolution', async ({ page }) => {
    await page.goto('https://ardeco.app/profile');
    page.setViewportSize({width: 1920, height: 966});
    const navbar = await page.locator('.navbar').first();
    await expect(navbar).toHaveScreenshot();

    const title = await page.locator('.title');
    await expect(title).toHaveScreenshot();

    const content = await page.locator('.content');
    await expect(content).toHaveScreenshot();

    await page.locator('#dark-mode-button').first().click();
    await expect(title).toHaveScreenshot();
    await expect(content).toHaveScreenshot();
  });

  test('[Localhost] Profile page with mobile resolution', async ({ page }) => {
    await page.goto('https://ardeco.app/profile');
    page.setViewportSize({width: 393, height: 851});
    const navbar = await page.locator('.navbar').first();
    await expect(navbar).toHaveScreenshot();

    const title = await page.locator('.title');
    await expect(title).toHaveScreenshot();

    const content = await page.locator('.content');
    await expect(content).toHaveScreenshot();

    await page.locator('#dark-mode-button').first().click();
    await expect(title).toHaveScreenshot();
    await expect(content).toHaveScreenshot();
  });
});
