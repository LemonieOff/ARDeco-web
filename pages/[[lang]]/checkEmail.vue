<template>
    <div>
        <Navbar/>
        <div class="blocked-users">
            <div class="title">Check email address</div>
            <div id="loading">
                Loading...
            </div>
            <div id="tokenPresent" style="display: none">
                <p class="info-text">Please check your email address to confirm your account</p>
                <form @submit.prevent="checkEmail" class="form">
                    <div class="form-group">
                        <label for="email">Email address</label>
                        <input type="email" id="email" v-model="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" v-model="password" required>
                    </div>
                    <div class="form-group">
                        <label for="confirmPassword">Password confirmation</label>
                        <input type="password" id="confirmPassword" v-model="confirmPassword" required>
                    </div>
                    <button type="submit">Check email address</button>
                </form>
            </div>
            <p class="error-message" v-show="errorMessage">{{ errorMessage }}</p>
            <p class="success-message" v-show="successMessage">{{ successMessage }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "CheckEmail",
    data() {
        return {
            email: "",
            password: "",
            confirmPassword: "",
            errorMessage: "",
            successMessage: ""
        };
    },
    async mounted() {
        const token = this.$route.query.token;
        document.getElementById("loading").style.display = "none";
        if (!token || token === "") {
            this.errorMessage = "No token provided";
            const form = document.getElementById("tokenPresent");
            form.remove();
        } else {
            document.getElementById("tokenPresent").style.display = "block";
        }
    },
    methods: {
        async checkEmail() {
            this.errorMessage = "";
            this.successMessage = "";
            if (this.email && this.password && this.confirmPassword) {
                if (this.password !== this.confirmPassword) {
                    this.errorMessage = "Passwords do not match";
                    this.successMessage = "";
                    return;
                }
                const response = await fetch("https://api.ardeco.app/checkEmail", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: this.email,
                        password: this.password,
                        token: this.$route.query.token
                    })
                });
                const data = await response.json();
                if (data.status !== "OK") {
                    this.errorMessage = data.description;
                    this.successMessage = "";
                } else {
                    const form = document.getElementById("tokenPresent");
                    form.remove();
                    this.successMessage = data.description;
                    console.log(data);
                    this.errorMessage = "";
                }
            } else {
                this.errorMessage = "Please fill all fields";
                this.successMessage = "";
            }
        }
    }
};

</script>

<style scoped>
.blocked-users {
    padding-top: 56px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title {
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 20px;
}

.form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    border-radius: 15px;
    padding: 25px;
    background-color: #f4f4f4;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Add shadow to the form */
    margin-bottom: 15px;
    margin-top: 15px;
}

.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px; /* Add some space between each form group */
}

.form-group label {
    font-weight: bold; /* Make the label text bold */
    margin-bottom: 5px; /* Add some space between the label and the input */
}

.form-group input {
    padding: 10px; /* Add some padding inside the input */
    border: 1px solid #ccc; /* Add a border to the input */
    border-radius: 4px; /* Add rounded corners to the input */
}

button {
    outline-style: none;
    background-color: #4CAF50; /* Green background */
    border: none;
    color: white; /* White text */
    padding: 15px 32px; /* Padding */
    text-align: center; /* Centered text */
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer; /* Pointer cursor on hover */
    border-radius: 4px; /* Rounded corners */
}

button:hover {
    background-color: #45a049; /* Darker green on hover */
}

.info-text {
    text-align: center;
    margin-top: 20px;
    font-style: italic;
    color: #888;
}

.error-message {
    color: #f44336; /* Red color */
    background-color: #ffebee; /* Light red background */
    border: 1px solid #f44336; /* Red border */
    padding: 10px; /* Padding */
    border-radius: 4px; /* Rounded corners */
    margin-bottom: 15px; /* Add some space below the message */
}

.success-message {
    color: #4caf50; /* Green color */
    background-color: #e8f5e9; /* Light green background */
    border: 1px solid #4caf50; /* Green border */
    padding: 10px; /* Padding */
    border-radius: 4px; /* Rounded corners */
    margin-bottom: 15px; /* Add some space below the message */
}
</style>
