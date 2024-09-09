export type ProfilePictureData = {
    id: number,
    url: string
}

const defaultProfilePicture: ProfilePictureData = {
    id: -1,
    url: "images/profile-pictures/Unknown.webp"
}

export default defineNuxtPlugin(() => {
    const profilePictureCookie = useCookie<ProfilePictureData>("profile_picture", {
        sameSite: "lax",
        secure: true
    });

    // If cookie value is undefined, set it to default value
    if (!profilePictureCookie.value) profilePictureCookie.value = defaultProfilePicture;

    const value = profilePictureCookie.value;
    // If the value is different from the default one, check its compliance with API and expected format
    if (value !== defaultProfilePicture) {
        try {
            if (!value.url.startsWith("https://api.ardeco.app/profile_pictures")) {
                // Reset to default if URL is not from the expected API
                profilePictureCookie.value = defaultProfilePicture;
            }
        } catch (e) {
            // Reset to default if there's an error accessing the URL
            profilePictureCookie.value = defaultProfilePicture;
        }
    }

    /**
     * @function changeProfilePicture
     * @description Updates the profile picture cookie with the provided data or resets it to the default.
     *
     * @param newProfilePicture The new profile picture data to set.
     * * If this parameter is provided (not null), it updates the `profilePictureCookie` with the new data.
     * * If this parameter is null, undefined or omitted, it resets the `profilePictureCookie` to the default profile picture.
     *
     * @returns The updated profile picture data from the cookie after the change.
     */
    const changeProfilePicture = (newProfilePicture: ProfilePictureData | null = null): ProfilePictureData => {
        if (newProfilePicture) {
            profilePictureCookie.value = newProfilePicture;
        } else {
            profilePictureCookie.value = defaultProfilePicture;
        }

        return profilePictureCookie.value;
    };

    const result = {
        profilePicture: profilePictureCookie.value,
        defaultProfilePicture: defaultProfilePicture,
        changeProfilePicture: changeProfilePicture
    };

    if (import.meta.client) console.debug("Profile picture plugin result :", result);

    return {
        provide: result,
    }
})
