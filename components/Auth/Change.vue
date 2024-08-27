<!-- EmailInput.vue -->
<template>
    <div>
        <h1 class="text-center font-bold text-xl md:text-4xl my-8">Remplir l'adresse e-mail pour réinitialiser le mot de passe</h1>
        <form @submit.prevent="submitEmail">
            <label for="email">Adresse e-mail :</label>
            <input type="email" id="email" v-model="email" required>
            <button type="submit">Valider</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
        };
    },
    methods: {
        submitEmail() {
            console.log("AZEAZE")
            axios.post('https://api.ardeco.app/reset', {email: this.email})
                    .then(response => {
                        // La requête a réussi, vous pouvez traiter la réponse ici
                        console.log('Réponse du serveur :', response.data);
                    })
                    .catch(error => {
                        // La requête a échoué, vous pouvez traiter l'erreur ici.
                        console.error('Erreur lors de la requête :', error);
                    });
        },
    },
};
</script>

<style scoped>
@import "@/styles/ProfileSettings.scss";

form {
    z-index: 999; /* Valeur à ajuster selon votre mise en page */
    padding-top: 120px;
    width: 100%;
    margin-top: 20%;
}

div {
    width: 400px;
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 9% auto;
}

h1 {
    text-align: center;
    color: #333;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin-top: 10px;
    color: #555;
}

input {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    background-color: #4caf50;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #45a049;
}
</style>
