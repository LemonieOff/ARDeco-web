<template>
    <div class="form">
      <table>
        <thead>
            <tr>
            <th>ID</th>
            <br>
            <th>nom</th>
            <br>
            <th>description</th>
            <br>
            <th>auteur</th>
            <br>
            <th>type</th>
            <br>
            <th>tableau des item</th>
            <br>
            <th></th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in furnitureData" :key="index">
            <td>{{ item.furniture_id }}</td>
            <br>
            <td>{{ "le nom" }}</td> 
            <br>
            <td>{{ "description" }}</td>
            <br>
            <td>{{ "auteur" }}</td>
            <br>
            <td>{{ "type" }}</td>
            <br>
            <td>{{ "tableau" }}</td>
            <br>
            <td><button class="custom-button" @click="deleteFurniture(item.furniture_id)">Supprimer</button></td>
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
        furnitureData: [],
        errorMessage: '',
        successMessage: ''
      };
    },
    created() {
      this.getFavFurniture();
    },
    methods: {
      async getFavFurniture() {
        try {
          const userID = localStorage.getItem('userID');
          if (!userID) {
            throw new Error('No user found, redirecting to login');
          }
          
          const response = await fetch('https://api.ardeco.app/favorite/furniture', {
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
          this.furnitureData = result.data;
        } catch (error) {
          console.error(error.message);
          this.errorMessage = error.message;
        }
      },
      async deleteFurniture(id) {
        const response = await fetch(`https://api.ardeco.app/favorite/furniture/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (response.ok) {  
          this.successMessage = 'Furniture deleted successfully';
          this.getFavFurniture();
        } else {
          throw new Error('Failed to delete furniture');
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