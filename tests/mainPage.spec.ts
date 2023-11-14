import { test, expect, type Page } from '@playwright/test';

test.describe('Main Page', () => {
  test('[Prod] Main page with computer resolution', async ({ page }) => {
    await page.goto('https://ardeco.app/');
    page.setViewportSize({width: 1920, height: 966});
    const navbar = await page.locator('.navbar');
    await expect(navbar).toHaveScreenshot();

    const frontPage = await page.locator('#hero');
    await expect(frontPage).toHaveScreenshot();
  });

  test('[Prod] Main page with mobile resolution', async ({ page }) => {
    await page.goto('https://ardeco.app/');
    page.setViewportSize({width: 393, height: 851});
    const navbar = await page.locator('.navbar');
    await expect(navbar).toHaveScreenshot();

    const frontPage = await page.locator('#hero');
    await expect(frontPage).toHaveScreenshot();
  });

  test('[Localhost] Main page with computer resolution', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    page.setViewportSize({width: 1920, height: 966});
    const navbar = await page.locator('.navbar');
    await expect(navbar).toHaveScreenshot();

    const frontPage = await page.locator('#hero');
    await expect(frontPage).toHaveScreenshot();
  });

  test('[Localhost] Main page with mobile resolution', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    page.setViewportSize({width: 393, height: 851});
    const navbar = await page.locator('.navbar');
    await expect(navbar).toHaveScreenshot();

    const frontPage = await page.locator('#hero');
    await expect(frontPage).toHaveScreenshot();
  });
});
