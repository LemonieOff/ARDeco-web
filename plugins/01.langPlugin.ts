export default defineNuxtPlugin(() => {
    const langCookie = useCookie<string>('lang');

    if (!langCookie.value) langCookie.value = "fr";

    /**
     * @function changeLang
     * @description Changes the language based on the provided input.
     *  * If no input is provided or the input is `undefined` or `null`, the language cookie is reset to the default ("fr").
     *
     * @param newLang The new language to set.
     * It can be one of the following:
     *  * "fr": Sets the language to French.
     *  * "en": Sets the language to English.
     *  * "toggle": Toggles the language between French and English.
     *  If the current language is not "fr" or "en", it defaults to "fr".
     *  * "" (empty string): Resets the language cookie to the default ("fr").
     *  * undefined or null: Resets the language cookie to the default ("fr").
     *
     * @returns The updated language value from the cookie.
     */
    const changeLang = (newLang: "fr" | "en" | "toggle" | "" | undefined | null = null): string => {
        if (newLang === "toggle") {
            // If the current cookie value is not "fr" nor "en", set it to "fr" by default, else toggle it
            if (langCookie.value !== "fr" && langCookie.value !== "en") {
                langCookie.value = "fr";
            } else if (langCookie.value === "fr") {
                langCookie.value = "en";
            } else {
                langCookie.value = "fr";
            }
        } else if (newLang === "fr" || newLang === "en") {
            // If valid lang is explicitly passed as input, sets language cookie value accordingly
            langCookie.value = newLang;
        } else {
            // If undefined or null input, reset the cookie value.
            langCookie.value = "fr";
        }

        return langCookie.value;
    };

    // Retrieve lang param from url
    const route = useRoute();
    let urlLang = route.params.lang; // Raw lang passed in parameters (can be a wrong value)

    // If lang selector is not passed in url, get the user's one or set it to French if inexistant (default language)
    let lang = urlLang; // Language to use for translation (always good value)
    if (lang !== 'en' && lang !== 'fr') {
        lang = langCookie.value;
    }

    // Set prefix for links based on urlLang
    let langPrefix = "/"; // Prefix to use for links (always good value)
    let rawLangPrefix = ""; // General prefix, the same as langPrefix without '/' (always good value)
    if (urlLang === "fr") {
        langPrefix = "/fr/";
        rawLangPrefix = "fr";
    } else if (urlLang === "en") {
        langPrefix = "/en/";
        rawLangPrefix = "en";
    }

    const result = {
        urlLang: urlLang,
        langPrefix: langPrefix,
        rawLangPrefix: rawLangPrefix,
        lang: lang,
        langCookieValue: langCookie.value,
        changeLang: changeLang
    };
    console.debug("Lang plugin result :", result);

    return {
        provide: result,
    }
})
