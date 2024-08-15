let loggedIn = false;
let userID = null;

const isLogged = async () => {
    const userID_LS = localStorage.getItem("userID");

    // Set localUserID to undefined type if it is "undefined" string
    const localUserID = userID_LS === "undefined" ? undefined : userID_LS;

    if (localUserID) {
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
            userID = localUserID;

            const role_LS = localStorage.getItem("role");

            // Set localUserID to undefined type if it is "undefined" string
            const role = role_LS === "undefined" ? undefined : role_LS;

            // If role is not stored locally, retrieve it from the server
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
    return localUserID;
}

const disconnect = async () => {
    loggedIn = false;
    localStorage.removeItem("userID");
    localStorage.removeItem("role");
}

export {
    loggedIn,
    userID,
    isLogged,
    disconnect
}
