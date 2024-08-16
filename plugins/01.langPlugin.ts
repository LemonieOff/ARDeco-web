export default defineNuxtPlugin(() => {
    // Don't execute plugin on the server side (localStorage is only accessible on the client)
    if (import.meta.server) return;

    // Retrieve lang param from url
    const route = useRoute();
    let urlLang = route.params.lang; // Raw lang passed in parameters (can be a wrong value)

    // If lang selector is not passed in url, get the user's one or set it to French if inexistant (default language)
    let lang = urlLang; // Language to use for translation (always good value)
    if (lang !== 'en' && lang !== 'fr') {
        const localStorageLang = localStorage.getItem('lang');
        if (localStorageLang) {
            lang = localStorageLang;
        } else {
            lang = 'fr';
        }
    }

    // Set prefix for links based on urlLang
    let langPrefix = "/"; // Prefix to use for links (always good value)
    if (urlLang === "fr") {
        langPrefix = "/fr/";
    } else if (urlLang === "en") {
        langPrefix = "/en/";
    }

    const result = {
        urlLang: urlLang,
        langPrefix: langPrefix,
        lang: lang,
    };
    console.debug("Lang plugin result : ", result);

    return {
        provide: result,
    }
})
