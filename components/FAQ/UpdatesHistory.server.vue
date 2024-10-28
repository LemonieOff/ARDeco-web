<template>
    <div class="w-4/5 xl:w-3/5 mx-auto">
        <h2 class="text-center text-xl md:text-3xl text-black dark:text-white mb-6">
            {{ content.updatesHistoryTitle }}
        </h2>

        <div v-if="updatesData.length > 0">
            <div v-for="update in updatesData" :key="update.id"
                 class="mb-3 flex flex-col bg-card-background dark:bg-card-background-dark border-card-border dark:border-card-border-dark rounded-xl p-2 px-4 border-2">
                <div class="flex justify-between mb-2">
                    <span class="font-bold">{{ update.version }} - {{ update.name }}</span>
                    <span class="opacity-50">{{ new Date(update.date).toLocaleDateString() }}</span>
                </div>
                <ul class="list-disc list-inside">
                    <li v-for="change in update.changelog">
                        {{ change }}
                    </li>
                </ul>
            </div>
        </div>
        <p v-else class="text-center"> {{ error }} </p>
    </div>
</template>

<script lang="ts" setup>

const nuxtApp = useNuxtApp();
const updatesData = ref<{
    changelog: string[],
    date: Date,
    id: number,
    name: string,
    version: string
}[]>([]);
const content = nuxtApp.$content.productPages;

const error = ref(content.updatesHistoryLoading);

onMounted(async () => {
    await getUpdates();
});

async function getUpdates() {
    const response = await fetch("https://api.ardeco.app/changelog", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    if (!response.ok) {
        error.value = content.updatesHistoryError;
        console.error("Error while fetching changelog", response.status, response);
        return;
    }

    const result: {
        status: "OK" | "KO",
        description: string,
        code: number,
        data: [{
            changelog: string,
            date: Date,
            id: number,
            name: string,
            version: string
        }]
    } = await response.json();

    updatesData.value = result.data.map(item => {
        return {
            ...item,
            changelog: item.changelog.split("\n")
        };
    });
    console.debug(updatesData);
}
</script>
