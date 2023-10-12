<!-- EmailInput.vue -->
<template>
  <div>
    <h1>Remplir l'adresse e-mail</h1>
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
      axios.post('http://localhost:8000/reset', { email: this.email })
        .then(response => {
          // La requête a réussi, vous pouvez traiter la réponse ici
          console.log('Réponse du serveur :', response.data);
        })
        .catch(error => {
          // La requête a échoué, vous pouvez traiter l'erreur ici
          console.error('Erreur lors de la requête :', error);
        });
      },
  },
};
</script>

<style scoped>
form {
  z-index: 999; /* Valeur à ajuster selon votre mise en page */
  position: relative;
}
</style>