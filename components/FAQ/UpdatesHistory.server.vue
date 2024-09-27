<template>
    <div class="centered topMargin title"> Historique de mises à jour </div>
    <div class="centered topMargin bordered bottomMargin">
        <table v-if="updatesData.length">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Version</th>
                    <th>Date</th>
                    <th>Changelog</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="update in updatesData" :key="update.id">
                    <td>{{ update.id }}</td>
                    <td>{{ update.name }}</td>
                    <td>{{ update.version }}</td>
                    <td>{{ new Date(update.date).toLocaleDateString() }}</td>
                    <td>{{ update.changelog }}</td>
                </tr>
            </tbody>
        </table>
        <p v-else>Aucune mise à jour disponible pour le moment.</p>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const nuxtApp = useNuxtApp();
const updatesData = ref([]);

onMounted(async () => {
    await getUpdates();
});

async function getUpdates() {
    try {
        const response = await fetch('https://api.ardeco.app/changelog', {
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
        updatesData.value = result.data;
        console.log(updatesData);
    } catch (error) {
        console.error(error.message);
    }
}
</script>

<style scoped>

.title {
    font-size: 24px;
    font-weight: bold;
}

.centered {
    width: 60%;
    margin-left: 20%;
    text-align: center;
}

.topMargin {
    margin-top: 50px;
}

.bottomMargin {
    margin-bottom: 50px;
}

.bordered {
    border: 1px solid #846700;
    border-radius: 5px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 10px;
    border: 1px solid #ddd;
}

th {
    background-color: #f4f4f4;
}

tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}
</style>
