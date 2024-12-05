const { test, expect } = require('@playwright/test');

const BUSINESS_EMAIL = "valentin-company@ardeco.app";
const PASSWORD = "123";

const PLAYWRIGHT_TEST = "This is a text written by playwright";

test.describe('Company user tests', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/login');
        const emailInput = await page.locator('#loginEmail');
        const passwordInput = await page.locator('#loginPassword');
        const connectionButton = page.locator('button:has-text("Se connecter"), button:has-text("Login")');

        await emailInput.fill(BUSINESS_EMAIL);
        await passwordInput.fill(PASSWORD);
        await connectionButton.click();

        await expect(page).toHaveURL(/profile/);
        await page.goto('http://localhost:3000');
    });

    test('Does the dropdown menu work (company user)', async ({ page }) => {
        const dropdownButton = page.locator('#user');

        const profilePageLink = page.locator('[href="/profile"]');
        const settingsPageLink = page.locator('[href="/settings"]');
        const companyPageLink = page.locator('[href="/company"]');
        const catalogPageLink = page.locator('[href="/catalog"]');
        const cartPageLink = page.locator('[href="/cart"]');
        const ticketsPageLink = page.locator('[href="/tickets"]');
        const feedbackPageLink = page.locator('[href="/feedback"]');
        const logoutPageLink = page.locator('#logoutMenuOption');

        await page.waitForTimeout(500);
        await dropdownButton.click();

        await expect(profilePageLink).toBeVisible()
        await expect(settingsPageLink).toBeVisible()
        await expect(companyPageLink).toBeVisible()
        await expect(catalogPageLink).toBeVisible()
        await expect(cartPageLink).toBeVisible()
        await expect(ticketsPageLink).toBeVisible()
        await expect(feedbackPageLink).toBeVisible()
        await expect(logoutPageLink).toBeVisible()
    });

    test('Go to settings page', async ({ page }) => {
        const dropdownButton = page.locator('#user');

        const settingsPageLink = page.locator('[href="/settings"]');

        await page.waitForTimeout(500);
        await dropdownButton.click();

        await settingsPageLink.click();
        await expect(page).toHaveURL(/.*settings/);
    });

    test('Reset the API key', async ({ page }) => {
        const dropdownButton = page.locator('#user');

        const companyPageLink = page.locator('[href="/company"]');
        const resetAPIKey = page.getByText("Réinitialiser la clé API")
        const infosUpdated = page.getByText("Informations mises à jour.")

        await page.waitForTimeout(500);
        await dropdownButton.click();

        await page.waitForTimeout(500);
        await companyPageLink.click();
        await resetAPIKey.click()
        await expect(infosUpdated).toBeVisible()
    });

    test('Go to public gallery page', async ({ page }) => {
        const dropdownButton = page.locator('#user');

        const profilePageLink = page.locator('[href="/profile"]');
        const targetButton = page.locator('[href="/gallery"]');
        const createFurniturePageLink = page.getByText("Accéder aux détails").first();
        const galleryDetails = page.getByText("Détails d'un aménagement");

        await page.waitForTimeout(500);
        await dropdownButton.click()

        await page.waitForTimeout(500);
        await profilePageLink.click();

        await page.waitForTimeout(500);
        await targetButton.click();
        await expect(page).toHaveURL(/.*gallery/);

        await createFurniturePageLink.click();
        await expect(galleryDetails).toBeVisible();
    });

    test('Go to favorite galleries page', async ({ page }) => {
        const dropdownButton = page.locator('#user');

        const profilePageLink = page.locator('[href="/profile"]');
        const targetButton = page.locator('[href="/favGallery"]');

        await page.waitForTimeout(500);
        await dropdownButton.click()

        await page.waitForTimeout(500);
        await profilePageLink.click();

        await page.waitForTimeout(500);
        await targetButton.click();
        await expect(page).toHaveURL(/.*favGallery/);
    });

    test('Go to favorite furnitures page', async ({ page }) => {
        const dropdownButton = page.locator('#user');

        const profilePageLink = page.locator('[href="/profile"]');
        const targetButton = page.locator('[href="/favFurniture"]');

        await page.waitForTimeout(500);
        await dropdownButton.click()

        await page.waitForTimeout(500);
        await profilePageLink.click();

        await page.waitForTimeout(500);
        await targetButton.click();
        await expect(page).toHaveURL(/.*favFurniture/);
    });

    test('Go to order history page', async ({ page }) => {
        const dropdownButton = page.locator('#user');

        const profilePageLink = page.locator('[href="/profile"]');
        const targetButton = page.locator('[href="/orderHistory"]');

        await page.waitForTimeout(500);
        await dropdownButton.click()

        await page.waitForTimeout(500);
        await profilePageLink.click();

        await page.waitForTimeout(500);
        await targetButton.click();
        await expect(page).toHaveURL(/.*orderHistory/);
    });

    test('Go to blocked user page', async ({ page }) => {
        const dropdownButton = page.locator('#user');

        const profilePageLink = page.locator('[href="/profile"]');
        const targetButton = page.locator('[href="/blockedUsers"]');

        await page.waitForTimeout(500);
        await dropdownButton.click()

        await page.waitForTimeout(500);
        await profilePageLink.click();

        await page.waitForTimeout(500);
        await targetButton.click();
        await expect(page).toHaveURL(/.*blockedUsers/);
    });

    test('Go to company page', async ({ page }) => {
        const dropdownButton = page.locator('#user');

        const companyPageLink = page.locator('[href="/company"]');

        await page.waitForTimeout(500);
        await dropdownButton.click();

        await page.waitForTimeout(500);
        await companyPageLink.click();
        await expect(page).toHaveURL(/.*company/);
    });

    test('Go to create new furniture page', async ({ page }) => {
        const dropdownButton = page.locator('#user');

        const companyPageLink = page.locator('[href="/company"]');
        const createFurniturePageLink = page.getByText("Créer un nouveau meuble");

        await page.waitForTimeout(500);
        await dropdownButton.click();

        await page.waitForTimeout(500);
        await companyPageLink.click();
        await expect(page).toHaveURL(/.*company/);

        await page.waitForTimeout(500);
        await createFurniturePageLink.click()
        await expect(page).toHaveURL(/.*furniture-creation/);
    });

    test('Go to catalog page', async ({ page }) => {
        const dropdownButton = page.locator('#user');

        const catalogPageLink = page.locator('[href="/catalog"]');

        await page.waitForTimeout(500);
        await dropdownButton.click();

        await page.waitForTimeout(500);
        await catalogPageLink.click();
        await expect(page).toHaveURL(/.*catalog/);
    });

    test('Go to furniture details page', async ({ page }) => {
        const dropdownButton = page.locator('#user');

        const catalogPageLink = page.locator('[href="/catalog"]');
        const createFurniturePageLink = page.getByText("Accéder aux détails").first();
        const addToCart = page.getByText("Ajouter au panier");

        await page.waitForTimeout(500);
        await dropdownButton.click();

        await catalogPageLink.click();
        await expect(page).toHaveURL(/.*catalog/);

        await page.waitForTimeout(500);
        await createFurniturePageLink.click();
        await expect(addToCart).toBeVisible(5000);
    });

    test('Go to cart page', async ({ page }) => {
        const dropdownButton = page.locator('#user');

        const cartPageLink = page.locator('[href="/cart"]');

        await page.waitForTimeout(500);
        await dropdownButton.click();

        await cartPageLink.click();
        await expect(page).toHaveURL(/.*cart/);
    });

    test('Go to tickets page && write a ticket', async ({ page }) => {
        const dropdownButton = page.locator('#user');

        const ticketsPageLink = page.locator('[href="/tickets"]');
        const ticketTitle = page.locator('[placeholder="Écrivez le titre de votre problème ici"]');
        const ticketDescription = page.locator('[placeholder="Décrivez votre problème en quelques mots"]');
        const ticketDetails = page.locator('[placeholder="Détaillez clairement votre problème ici"]');
        const sendTicket = page.getByText("Créer une demande");
        const ticketCreationConfirmation = page.getByText("Ticket créé avec succès !");

        await page.waitForTimeout(500);
        await dropdownButton.click();

        await ticketsPageLink.click();
        await expect(page).toHaveURL(/.*tickets/);

        await ticketTitle.fill(PLAYWRIGHT_TEST);
        await ticketDescription.fill(PLAYWRIGHT_TEST);
        await ticketDetails.fill(PLAYWRIGHT_TEST);

        await sendTicket.click();
        await expect(ticketCreationConfirmation).toBeVisible(5000);
    });

    test('Go to feedback page && write a feedback', async ({ page }) => {
        const dropdownButton = page.locator('#user');

        const feedbackPageLink = page.locator('[href="/feedback"]');
        const textInput = page.locator('#textInput')
        const sendButton = page.locator('button:has-text("Envoyer")');
        const confirmationNotification = page.getByText('Formulaire envoyé !')

        await page.waitForTimeout(500);
        await dropdownButton.click();

        await feedbackPageLink.click();
        await expect(page).toHaveURL(/.*feedback/);
        await textInput.fill(PLAYWRIGHT_TEST);

        await sendButton.click();
        await expect(confirmationNotification).toBeVisible(5000);

    });

});
