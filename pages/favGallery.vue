<template>
    <div class="form">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <br>
            <th>nom</th>
            <br>
            <th>prix</th>
            <br>
            <th>styles</th>
            <br>
            <th>couleurs</th>
            <br>
            <th>pièces</th>
            <br>
            <th>dimensions</th>
            <br>
            <th>entreprise</th>
            <br>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in GalleryData" :key="index">
            <td>{{ item.gallery_id }}</td>
            <br>
            <td>{{ "le nom" }}</td>
            <br>
            <td>{{ "prix" }}</td>
            <br>
            <td>{{ "styles" }}</td>
            <br>
            <td>{{ "couleurs" }}</td>
            <br>
            <td>{{ "pièces" }}</td>
            <br>
            <td>{{ "dimensions" }}</td>
            <br>
            <td>{{ "entreprise" }}</td>
            <br>
            <td><button class="custom-button" @click="deleteGallery(item.gallery_id)">Supprimer</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: "FavFourniture",
    data() {
      return {
        GalleryData: [],
        errorMessage: '',
        successMessage: ''
      };
    },
    created() {
      this.getFavGallery();
    },
    methods: {
      async getFavGallery() {
        try {
          const userID = localStorage.getItem('userID');
          if (!userID) {
            throw new Error('No user found, redirecting to login');
          }
          
          const response = await fetch('https://api.ardeco.app/favorite/gallery', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
  
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
  
          const result = await response.json();
          this.GalleryData = result.data;
        } catch (error) {
          console.error(error.message);
          this.errorMessage = error.message;
        }
      },
      async deleteGallery(id) {
        const response = await fetch(`https://api.ardeco.app/favorite/Gallery/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (response.ok) {
          this.successMessage = 'Gallery deleted successfully';
          this.getFavGallery();
        } else {
          throw new Error('Failed to delete Gallery');
        }
      }
    }
  }
  </script>
  
  <style scoped lang="scss">
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10% 0;
  }
  
  .edit-error {
    color: red;
  }
  
  .edit-success {
    color: green;
  }

  .custom-button {
  padding: 5px 20px;
  background-color: #D2B48C;
  color: rgb(62 64 63);
  border: 2px solid rgb(62 64 63);
  border-radius: 5px;
  cursor: pointer;
  }

  </style>