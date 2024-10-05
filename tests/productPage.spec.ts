const { test, expect } = require('@playwright/test');

test.describe('Product Page tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/product');  // Accès à l'URL de la page produit
    });

    // Test du titre des détails du projet
    test('Project details title is displayed', async ({ page }) => {
        const projectDetailsTitle = await page.locator('#projectDetailsTitle');
        await expect(projectDetailsTitle).toBeVisible();  // Vérifie que le titre est visible
        await expect(projectDetailsTitle).toContainText('Découvrez les détails de notre projet');  // Ajustez selon `content.projectDetailsTitle`
    });

    // Test du sous-titre de la FAQ
    test('FAQ subtitle is displayed', async ({ page }) => {
        const faqSubtitle = await page.locator('#findYourAnswersSubtitle');
        await expect(faqSubtitle).toBeVisible();  // Vérifie que le sous-titre est visible
        await expect(faqSubtitle).toContainText('Trouvez les réponses à vos questions dans notre FAQ !');  // Ajustez selon `content.findYourAnswersSubtitle`
    });

    // Test des cartes de questions et de leur contenu
    test('Question cards are displayed with correct titles', async ({ page }) => {
        const questionTitles = [
            { id: '#q-whatIsArdecoTitle', expectedText: 'Qu\'est-ce que ARDeco ?' },
            { id: '#q-howToUseArdecoTitle', expectedText: 'Comment utiliser ARDeco ?' },
            { id: '#q-furnitureChoiceTitle', expectedText: 'Comment sont choisis mes meubles ?' },
            { id: '#q-modelsOriginsTitle', expectedText: 'D\'où viennent les modèles ?' },
            { id: '#q-whyUseArdecoTitle', expectedText: 'Pourquoi utiliser ARDeco ?' },
            { id: '#q-inAppPurchaseTitle', expectedText: 'Puis-je acheter des meubles depuis l\'application ?' }
        ];

        for (let question of questionTitles) {
            const card = await page.locator(question.id);
            await expect(card).toBeVisible();  // Vérifie que chaque carte de question est visible
            await expect(card).toContainText(question.expectedText);  // Vérifie que le texte est correct
        }
    });
});
