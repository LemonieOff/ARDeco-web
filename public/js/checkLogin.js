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
        } else {
            console.log("Not logged in");
        }
    } else {
        console.log("No local stored userID, not logged in");
        loggedIn = false;
    }
    return userID;
}

const disconnect = async () => {
    loggedIn = false;
    localStorage.removeItem("userID");
}

export {
    loggedIn,
    isLogged,
    disconnect
}
