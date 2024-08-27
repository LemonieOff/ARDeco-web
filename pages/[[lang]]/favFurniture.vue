<template>
    <div class="text-center font-bold text-xl md:text-4xl my-8">Meubles favoris</div>
    <div class="form">
        <div class="grid">
            <div class="grid-header">
                <div class="grid-item">ID</div>
                <div class="grid-item">Nom</div>
                <div class="grid-item">Prix</div>
                <div class="grid-item">Styles</div>
                <div class="grid-item">Couleurs</div>
                <div class="grid-item">Pièces</div>
                <div class="grid-item">Dimensions</div>
                <div class="grid-item">Entreprise</div>
                <div class="grid-item">Actions</div>
            </div>
            <div v-for="(item, index) in furnitureData" :key="index" class="grid-row">
                <div class="grid-item">{{ item.furniture.id }}</div>
                <div class="grid-item">{{ item.furniture.name }}</div>
                <div class="grid-item">{{ item.furniture.price }}</div>
                <div class="grid-item">{{ item.furniture.styles }}</div>
                <div class="grid-item">{{ item.furniture.colors }}</div>
                <div class="grid-item">{{ item.furniture.rooms }}</div>
                <div class="grid-item">{{ item.furniture.height }} x {{ item.furniture.width }} x
                    {{ item.furniture.depth }}
                </div>
                <div class="grid-item">{{ item.furniture.company }}</div>
                <div class="grid-item">
                    <button class="custom-button" @click="deleteFurniture(item.furniture.id)">Supprimer</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {isLogged} from "public/ts/checkLogin";

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
        this.checkLogin();
        this.getFavFurniture();
    },
    methods: {
        async checkLogin() {
            const userID = await isLogged();
            if (!userID) {
                location.href = "/login";
            }
        },

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
            try {
                const response = await fetch(`https://api.ardeco.app/favorite/Furniture/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                if (response.ok) {
                    this.successMessage = 'Furniture deleted successfully';
                    this.furnitureData = this.furnitureData.filter(item => item.furniture.id !== id);
                } else {
                    throw new Error('Failed to delete furniture');
                }
            } catch (error) {
                console.error(error);
                this.errorMessage = 'An error occurred while deleting the furniture.';
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
    background-color: #F2EBDF;
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
    background-color: rgb(191, 178, 170);
}

.grid-item {
    flex: 1;
    padding: 12px; /* Adjust padding */
    border-right: 1px solid #ddd; /* Lighter border */
    border-bottom: 1px solid #ddd; /* Add bottom border */
}
</style>
