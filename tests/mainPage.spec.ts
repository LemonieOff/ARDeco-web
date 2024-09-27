const { test, expect } = require('@playwright/test');

test.describe('Page ARDeco tests', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');  // Assurez-vous que le serveur est en marche
    });

    // Test du titre de la page
    test('Page title is correct', async ({ page }) => {
        await expect(page).toHaveTitle(/ARDeco - /);  // Vérifie que le titre contient "ARDeco"
    });

    // Test du titre de bienvenue
    test('Welcome title is displayed', async ({ page }) => {
        const welcomeTitle = await page.locator('#welcomeTitle');
        await expect(welcomeTitle).toBeVisible();  // Vérifie que le titre de bienvenue est visible
        await expect(welcomeTitle).toContainText('Bienvenue');  // Assurez-vous que le texte affiché est correct (ou modifiez selon votre contenu)
    });

    // Test de la présence du bouton Google Play
    test('Google Play button is displayed', async ({ page }) => {
        const playButton = await page.locator('a[href*="play.google.com"]');
        await expect(playButton).toBeVisible();  // Vérifie que le bouton Google Play est visible
        await expect(playButton).toHaveAttribute('href', /play.google.com/);  // Vérifie que le lien pointe vers Google Play
    });

    // Test de la présentation du produit
    test('Product presentation is visible', async ({ page }) => {
        const productPresentation = await page.locator('#productPresentation');
        await expect(productPresentation).toBeVisible();  // Vérifie que la présentation du produit est visible
        await expect(productPresentation).toContainText('ARDeco');  // Vérifie que le texte contient "ARDeco"
    });

    // Test du bouton "click here"
    test('Click here button is working', async ({ page }) => {
        const clickHereButton = await page.locator('#clickHere');
        await expect(clickHereButton).toBeVisible();  // Vérifie que le bouton est visible
        await clickHereButton.click();  // Simule un clic
        await expect(page).toHaveURL(/\/team/);  // Vérifie que la page change après le clic
    });
});