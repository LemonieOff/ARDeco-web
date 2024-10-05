const { test, expect } = require('@playwright/test');

test.describe('Team Page tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/team');  // Accès à l'URL de la page d'équipe
    });

    // Test du titre de la page d'équipe
    test('Team page title is displayed', async ({ page }) => {
        const title = await page.locator('#title');
        await expect(title).toBeVisible();  // Vérifie que le titre est visible
        await expect(title).toContainText('Rencontrez notre équipe de rêve');  // Modifiez selon le contenu réel de `content.title`
    });

    // Test des sous-titres des photos d'équipe
    test('Pictures title and subtitle are displayed', async ({ page }) => {
        const picturesTitle = await page.locator('#picturesTitle');
        const picturesSubtitle = await page.locator('#picturesSubtitle');

        await expect(picturesTitle).toBeVisible();
        await expect(picturesTitle).toContainText('Vous voulez mieux nous connaître ?');  // Ajustez selon `content.picturesTitle`
        
        await expect(picturesSubtitle).toBeVisible();
        await expect(picturesSubtitle).toContainText('Cliquez sur ces images pour en savoir plus sur nous !');  // Ajustez selon `content.picturesSubtitle`
    });

    // Test de la présence des images de profil
    test('Profile pictures are displayed', async ({ page }) => {
        const profilePictures = await page.locator('.profile-pictures img');

        // Vérifie qu'il y a plusieurs images de profil (ajustez le nombre si nécessaire)
        await expect(profilePictures).toHaveCount(5);  // Il y a 5 images dans le template fourni

        // Vérifie que chaque image a une source valide et qu'elle est visible
        for (let i = 0; i < 5; i++) {
            await expect(profilePictures.nth(i)).toBeVisible();
            await expect(profilePictures.nth(i)).toHaveAttribute('src', /profile-pictures/);  // Assurez-vous que les images ont la bonne source
        }
    });

    // Test des titres de présentation de l'école
    test('School presentation title and subtitles are visible', async ({ page }) => {
        const presentationTitle = await page.locator('#presentationTitle');
        const presentationSubtitle = await page.locator('#presentationSubtitle');

        await expect(presentationTitle).toBeVisible();
        await expect(presentationTitle).toContainText('Vous voulez savoir ce qui nous a amenés ici ?');  // Ajustez selon `content.presentationTitle`

        await expect(presentationSubtitle).toBeVisible();
        await expect(presentationSubtitle).toContainText('Apprenez-en plus sur notre programme scolaire et nos expériences professionnelles précédentes !');  // Ajustez selon `content.presentationSubtitle`
    });

    // Test des textes de présentation de l'école
    test('School presentation text parts are visible', async ({ page }) => {
        const textPart1 = await page.locator('#presentationTextPart1');
        const textPart2 = await page.locator('#presentationTextPart2');

        await expect(textPart1).toBeVisible();  // Vérifie que la première partie du texte est visible
        await expect(textPart2).toBeVisible();  // Vérifie que la deuxième partie du texte est visible
    });

    // Test de la présence de l'image Epitech et du lien
    test('Epitech logo and link are working', async ({ page }) => {
        const epitechLogo = await page.locator('img[alt="Epitech"]').first();
        const epitechLink = await page.locator('a[href*="epitech"]').first()

        await expect(epitechLogo).toBeVisible();  // Vérifie que l'image Epitech est visible
        await expect(epitechLink).toHaveAttribute('href', /epitech/);  // Vérifie que le lien pointe vers Epitech
    });
});
