import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://ardeco.app/');
});

test.describe('Main Page', () => {
  test('Check the main page\'s elements with a computer resolution', async ({ page }) => {
    page.setViewportSize({width: 1920, height: 966});
    const navbar = await page.locator('.navbar');
    await expect(navbar).toHaveScreenshot();

    const frontPage = await page.locator('#hero');
    await expect(frontPage).toHaveScreenshot();

    const ardeco = await page.locator(`[alt="this slowpoke moves"]`).first();
    await expect(ardeco).toHaveScreenshot();

    // const augmentedReality = await page.locator('.h-screen.bg-gradient-to-t.from-port-brown.to-[#F2EBDF].flex');
    // await expect(augmentedReality).toHaveScreenshot();

    // const keyPoints = await page.locator('.flex.flex-col.items-center.justify-center.bg-gradient-to-b.h-screen.w-screen.from-port-brown.to-[#F2EBDF]');
    // await expect(keyPoints).toHaveScreenshot();
  });

  test('Check the main page\'s elements with a mobile resolution', async ({ page }) => {
    page.setViewportSize({width: 393, height: 851});
    const navbar = await page.locator('.navbar');
    await expect(navbar).toHaveScreenshot();

    const frontPage = await page.locator('#hero');
    await expect(frontPage).toHaveScreenshot();

    // const ardeco = await page.locator(`[alt="this slowpoke moves"]`).first();
    // await expect(ardeco).toHaveScreenshot();

    // const augmentedReality = await page.locator('.h-screen.bg-gradient-to-t.from-port-brown.to-[#F2EBDF].flex');
    // await expect(augmentedReality).toHaveScreenshot();

    // const keyPoints = await page.locator('.flex.flex-col.items-center.justify-center.bg-gradient-to-b.h-screen.w-screen.from-port-brown.to-[#F2EBDF]');
    // await expect(keyPoints).toHaveScreenshot();
  });
});
