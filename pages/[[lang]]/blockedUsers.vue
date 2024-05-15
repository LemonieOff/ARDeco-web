<template>
  <div>
    <Navbar/>
    <div class="blocked-users">
      <div class="title">Utilisateurs bloqués</div>
      <div v-if="UserData.length > 0">
        <div class="blocked-user" v-for="userData in UserData" :key="userData.data.userId">
          <div class="user-cube">
            <div class="user-details">
              <p class="user-name">{{ 'Nom : '+ userData.data.lastname }}</p>
              <p class="user-name">{{ 'Prenom : '+ userData.data.firstname }}</p>
              <p class="user-name">{{ 'ID : '+ userData.data.userId }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="no-blocked-users">Aucun utilisateur bloqué</p>
      </div>
    </div>
  </div>
</template>

  <script>
  import { isLogged } from "public/js/checkLogin";
  
  export default {
    name: "Blocked",
    data() {
      return {
        BlockedData: [],
        UserData:[],
        errorMessage: "",
        successMessage: ""
      };
    },
    created() {
      this.checkLogin();
      this.getBlocked();
    },
    methods: {
      async checkLogin() {
        const userID = await isLogged();
        if (!userID) {
          location.href = "/login";
        }
      },
      
      async getBlocked() {
    try {
        const userID = localStorage.getItem("userID");
        if (!userID) {
            throw new Error("No user found, redirecting to login");
        }

        const response = await fetch("https://api.ardeco.app/blocked_users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        this.BlockedData = result.data;
        } catch (error) {
            console.error(error.message);
            this.errorMessage = error.message;
        }
        for(let x = 0; this.BlockedData[x] !== undefined; x++) {
            await this.getUserFullName(this.BlockedData[x]);
        }
    },

    async getUserFullName(userId) {
      try {
        const response = await fetch(`https://api.ardeco.app/user/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include"
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user information");
        }
        const userData = await response.json();
        userData.data.userId = userId; // Ajout de l'ID d'utilisateur
        this.UserData.push(userData);
      } catch (error) {
        console.error("Error fetching user information:", error);
        return "Unknown user";
      }
    },  

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
  
  .blocked-user {
    margin-bottom: 20px;
  }
  
  .user-cube {
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  
  .user-details {
    padding: 20px;
  }
  
  .user-name {
    font-weight: bold;
  }
  
  .no-blocked-users {
    text-align: center;
    margin-top: 20px;
    font-style: italic;
    color: #888;
  }
  </style>
