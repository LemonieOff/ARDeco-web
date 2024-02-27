<template>
    <div class="form">
      <div class="grid">
        <div class="grid-header">
          <div class="grid-item">ID</div>
          <div class="grid-item">Nom</div>
          <div class="grid-item">Description</div>
          <div class="grid-item">Auteur</div>
          <div class="grid-item">Type</div>
          <div class="grid-item">Tableau des items</div>
          <div class="grid-item">Action</div>
        </div>
        <div v-for="(item, index) in GalleryData" :key="index" class="grid-row">
          <div class="grid-item">{{ item.gallery.id }}</div>
          <div class="grid-item">{{ item.gallery.name }}</div>
          <div class="grid-item">{{ item.gallery.description }}</div>
          <div class="grid-item">{{ item.user.first_name }} {{ item.user.last_name }}</div>
          <div class="grid-item">{{ item.gallery.type }}</div>
          <div class="grid-item">{{ item.gallery.furniture }}</div>
          <div class="grid-item">
            <button class="custom-button" @click="deleteGallery(item.gallery.id)">Supprimer</button>
          </div>
        </div>
      </div>
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
        try {
          const response = await fetch(`https://api.ardeco.app/favorite/Gallery/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
          if (response.ok) {
            this.successMessage = 'Gallery deleted successfully';
            this.GalleryData = this.GalleryData.filter(item => item.gallery.id !== id);
          } else {
            throw new Error('Failed to delete Gallery');
          }
        } catch (error) {
          console.error(error);
          this.errorMessage = 'An error occurred while deleting the gallery.';
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
  background-color:   #F2EBDF;
  color: rgb(62 64 63);
  border: 2px solid rgb(62 64 63);
  border-radius: 5px;
  cursor: pointer;
}

.grid {
  display: flex;
  flex-direction: column;
  border: 2px solid #000;
  border-radius: 5px;
}

.grid-header {
  display: flex;
  font-weight: bold;

}

.grid-row {
  display: flex;
}

.grid-item {
  flex: 1;
  padding: 10px;
  border-right: 1px solid #000;
}

.grid-item:last-child {
  border-right: none;
}

.grid-row:hover {
  background-color: rgb(191,178,170);
}

.grid-item {
  flex: 1;
  padding: 12px; /* Adjust padding */
  border-right: 1px solid #ddd; /* Lighter border */
  border-bottom: 1px solid #ddd; /* Add bottom border */
}


  </style>