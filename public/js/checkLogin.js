let loggedIn = false;

const isLogged = async () => {
    const userID_LS = localStorage.getItem("userID");

    // Set userID to undefined type if it is "undefined" string
    const userID = userID_LS === "undefined" ? undefined : userID_LS;

    if (userID) {
        const response = await fetch('https://api.ardeco.app/checkjwt/' + userID, {
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
            const role_LS = localStorage.getItem("role");

            // Set userID to undefined type if it is "undefined" string
            const role = role_LS === "undefined" ? undefined : role_LS;

            // If role is not stored locally, retrieve it from the server
            if (!role) {
                console.log("No stored role, retrieving it");
                const response = await fetch('https://api.ardeco.app/user/' + userID, {
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
        }
    } else {
        console.log("No local stored userID, not logged in");
        localStorage.removeItem("userID");
        localStorage.removeItem("role");
        loggedIn = false;
    }
    return userID;
}

const disconnect = async () => {
    loggedIn = false;
    localStorage.removeItem("userID");
    localStorage.removeItem("role");
}

export {
    loggedIn,
    isLogged,
    disconnect
}
