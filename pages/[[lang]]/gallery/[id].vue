<template>
  <Navbar/>
  <div class="container">
    <div class="title">Détails de la Galerie</div>
    <div class="card">
      <div class="card-content">
        <div class="card-item">
          <strong>ID:</strong> {{ GalleryData.id }}
        </div>
        <div class="card-item">
          <strong>Nom:</strong> {{ GalleryData.name }}
        </div> 
        <div class="card-item">
          <strong>Description:</strong> {{ GalleryData.description }}
        </div>
        <div class="card-item" v-if="GalleryData.user_id" >
          <strong>Auteur:</strong> {{ UserData.data.lastname }} {{ UserData.data.firstname }}
        </div>
        <div class="card-item">
          <strong>Pièces:</strong> {{ GalleryData.room_type }}
        </div>
        <div class="card-item">
          <strong>Meubles:</strong> {{ GalleryData.furniture }}
        </div>
      </div>
    </div>
    <br>
    <button class="custom-button" @click="goToGallery">Retour à la Galerie</button>
  </div>
</template>
  
<script>
  import {isLogged} from "public/js/checkLogin";
  export default {
    name: "Gallery",
    data() {
      return {
        GalleryData: [],
        UserData:[],
        errorMessage: '',
        successMessage: ''
      };
    },
    created() {
      this.checkLogin();
      const id = this.$route.params.id;
      this.getGallery(id);
    },
    methods: {
      async checkLogin() {
        const userID = await isLogged();
        if (!userID) {
          location.href = "/login";
        }
      },

      async getGallery(id) {
        try {
          const userID = localStorage.getItem('userID');
          if (!userID) {
            throw new Error('No user found, redirecting to login');
          }
          
          const response = await fetch(`https://api.ardeco.app/gallery/${id}`, {
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
        this.getUserFullName(this.GalleryData.user_id);
      },

      async getUserFullName(userId) {
        try {
            const response = await fetch(`https://api.ardeco.app/user/${userId}`);
            if (!response.ok) {
            throw new Error("Failed to fetch user information");
            }
            const userData = await response.json();
           this.UserData = userData;
        } catch (error) {
            console.error("Error fetching user information:", error);
            return "Unknown user";
        }
    },

      async redirectDetails(id) {
        window.location.href = '/voirDetails/' + id;
      },

        async openSidebar(id) {
            var sidebar = document.getElementById("sidebar");
            if (sidebar.style.left === "-250px") {
                sidebar.style.left = "0";
            } else {
                sidebar.style.left = "-250px";
            }
        },
        goToGallery() {
        this.$router.push('/gallery');
      },
    }
  }
</script>

<style scoped lang="scss">
  .container {
    padding: 20px;
  }

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

.custom-button:active {
  transform: translateY(2px);
}

.grid {
  display: flex;
  flex-direction: column;
  border: 2px solid #000;
  border-radius: 5px;
}

.grid-header {
  min-width: 1400px;
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
  padding: 12px;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

.title {
  text-align : center;
  font-size: 25px;
  font-weight: bold;
}
.container{
    padding-top: 90px;
}

.sidebar {
  position: fixed;
  top: 0;
  left: -250px; /* Caché par défaut */
  width: 250px;
  height: 100%;
  background-color: #333;
  color: #fff;
  padding: 20px;
  transition: left 0.3s ease;
}

.card {
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background: linear-gradient(to bottom right, #f3f3f3, #e0e0e0);
    color: #333; /* Couleur du texte */
  }

  .card-content {
    padding: 20px;
  }

  .card-item {
    margin-bottom: 15px;
  }

  .custom-button {
    background-color: rgb(191, 178, 170);
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .custom-button:hover {
    background-color: #5d5249; /* Couleur de survol */
  }

</style>