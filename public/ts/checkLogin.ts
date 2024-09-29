let loggedIn: boolean = false;
let userID: number | null = null;

const isLogged = async () => {
    const userID_LS = localStorage.getItem("userID");

    // Set localUserID to an undefined type if it is "undefined" string
    const localUserID = userID_LS === "undefined" ? undefined : userID_LS;

    const localUserIDNumber = Number(localUserID);

    if (localUserID && !isNaN(localUserIDNumber)) {
        const response = await fetch('https://api.ardeco.app/checkjwt/' + localUserID, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });
        const result = await response.json();
        loggedIn = result["status"] === "OK";
        if (loggedIn) {
            console.log("Logged in");
            userID = localUserIDNumber;

            const role_LS = localStorage.getItem("role");

            // Set localUserID to an undefined type if it is "undefined" string
            const role = role_LS === "undefined" ? undefined : role_LS;

            // If the role is not stored locally, retrieve it from the server
            if (!role) {
                console.log("No stored role, retrieving it");
                const response = await fetch('https://api.ardeco.app/user/' + localUserID, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                });
                const result = await response.json();
                localStorage.setItem("role", result.data["role"]);
                console.log("Role is now : " + result.data["role"]);
            }
        } else {
            console.log("Not logged in");
            localStorage.removeItem("userID");
            localStorage.removeItem("role");
            loggedIn = false;
            userID = null;
        }
    } else {
        console.log("No local stored localUserID, not logged in");
        localStorage.removeItem("userID");
        localStorage.removeItem("role");
        loggedIn = false;
        userID = null;
    }
    return userID;
}

/**
 * Logout the current logged-in user
 *
 * If user is not logged-in, this forces the client to be reset to an "anonymous" state
 */
const logout = () => {
    loggedIn = false;
    localStorage.removeItem("userID");
    localStorage.removeItem("role");
}

/**
 * @deprecated Use {@link logout} instead
 */
const disconnect = logout

export {
    loggedIn,
    userID,
    isLogged,
    disconnect,
    logout
}
