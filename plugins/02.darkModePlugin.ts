export default defineNuxtPlugin(() => {
    const darkModeCookie = useCookie<boolean>('dark_mode', {
        sameSite: "lax",
        secure: true,
    });

    if (!darkModeCookie.value) darkModeCookie.value = false;

    /**
     * @function changeDarkMode
     * @description Changes the dark mode setting based on the provided input.
     *
     * @param newMode The new dark mode setting to apply.
     * It can be one of the following:
     *  * true: Sets the dark mode to on.
     *  * false: Sets the dark mode to off.
     *  * "toggle": Toggles the dark mode between on and off.
     *  If the current dark mode setting is not explicitly set, it defaults to off before toggling.
     *  * undefined or null: Resets the dark mode setting to its default (off).
     *
     * @returns The updated dark mode value from the cookie.
     */
    const changeDarkMode = (newMode: boolean | "toggle" | undefined | null = null): boolean => {
        if (newMode === "toggle") {
            // If the current cookie value is not set, set it to false by default, else toggle it
            if (darkModeCookie.value === undefined) darkModeCookie.value = false;
            else darkModeCookie.value = !darkModeCookie.value;
        } else if (newMode === true || newMode === false) {
            // If a valid value is explicitly passed as input, sets theme cookie value accordingly
            darkModeCookie.value = newMode;
        } else {
            // If undefined or null input, reset the cookie value to its default value (false).
            darkModeCookie.value = false;
        }

        return darkModeCookie.value;
    };

    const result = {
        darkMode: darkModeCookie.value,
        changeDarkMode: changeDarkMode
    };

    if (import.meta.client) console.debug("Dark mode plugin result :", result);

    return {
        provide: result,
    }
})
