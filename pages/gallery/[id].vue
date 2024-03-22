<template>
    <Navbar/>
    <div class="container">
        <div class="title">Details</div>
            <div class="form">
                <div class="grid">
                    <div class="grid-header">
                    <div class="grid-item">ID</div>
                    <div class="grid-item">Nom</div>
                    <div class="grid-item">Description</div>
                    <div class="grid-item">Auteur</div>
                    <div class="grid-item">Pieces</div>
                    <div class="grid-item">Meubles</div>
                </div>
                <div class="grid-row">
                        <div class="grid-item">{{ GalleryData.id }}</div>
                        <div class="grid-item">{{ GalleryData.name }}</div> 
                        <div class="grid-item">{{ GalleryData.description }}</div>
                        <div class="grid-item"  v-if="GalleryData.user_id" >{{ UserData.data.lastname }} {{ UserData.data.firstname }}</div>
                        <div class="grid-item">{{ GalleryData.room_type }}</div>
                        <div class="grid-item">{{ GalleryData.furniture }}</div>
                </div>
            </div>
            <br>
            <button class="custom-button" @click="goToGallery">Retour à la Gallery</button>
        </div>
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

.custom-button {
  padding: 10px 25px;
  padding-top: 10px;
  background-color: #F2EBDF;
  color: rgb(62, 64, 63);
  border: 2px solid rgb(62, 64, 63);
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.custom-button:hover {
  background-color: #e0d8c6;
  color: rgb(35, 37, 36);
  border-color: rgb(35, 37, 36);
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
</style>