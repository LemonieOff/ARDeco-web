<!-- ChangePassword.vue -->
<template>
  <div>
    <h1>Changer le mot de passe</h1>
    <form @submit.prevent="changePassword">

      <label for="newPassword">Nouveau mot de passe:</label>
      <input type="password" id="newPassword" v-model="newPassword" required>
      
      <label for="token">Token</label>
      <input type="password" id="token" v-model="token" required>
      
      <button type="submit">Changer le mot de passe</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      newPassword: '',
      token: '',
    };
  },
  methods: {
    changePassword() {
      // Effectuer une requête POST vers le serveur avec axios
      axios.post('http://localhost:8000/resetConfirm', { password: this.newPassword, token: this.token })
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