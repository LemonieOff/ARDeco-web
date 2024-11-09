<template>
    <h1 class="text-center font-bold text-xl md:text-4xl my-8">{{ content.titleCreateFurniture }}</h1>
    <div class="flex flex-col md:flex-row justify-center md:space-x-8 my-8">
      <div class="furniturePictureArea flex justify-center">
        <img id="furnitureImg" src="@/assets/images/furnitures/defaultFurnitureCreationImage.png" class="border-2 border-primary-black rounded-lg h-full md:w-1/2">
      </div>
      <div class="furnitureDetails flex flex-col md:flex-row rounded-lg p-4 w-full">
        <div class="furnitureSpecificDetails md:w-1/2">
          <div class="specificDetailTitle text-lg font-bold" id="furnitureStyles">{{ content.placeholders.furnitureStyles }}</div>
          <div class="options flex flex-wrap justify-center">
            <div v-for="(style, key) in styles" :key="key" class="option">
              <label :for="`style_${key}`" @click="toggleSelection(style)" :class="{ 'selected': style.selected }" class="cursor-pointer border border-primary-black rounded px-2 py-1 m-1">
                {{ style.name }}
              </label>
            </div>
          </div>
          
          <div class="specificDetailTitle text-lg font-bold" id="furnitureRooms">{{ content.placeholders.furnitureRooms }}</div>
          <div class="options flex flex-wrap justify-center">
            <div v-for="(room, key) in rooms" :key="key" class="option">
              <label :for="`room_${key}`" @click="toggleSelection(room)" :class="{ 'selected': room.selected }" class="cursor-pointer border border-primary-black rounded px-2 py-1 m-1">
                {{ room.name }}
              </label>
            </div>
          </div>
          
          <div class="specificDetailTitle text-lg font-bold" id="furnitureColors">{{ content.placeholders.furnitureColors }}</div>
          <div class="options flex flex-wrap justify-center">
            <div v-for="(_color, key) in colors" :key="key" class="colorOption">
              <label :for="`color_${key}`"
                @click="toggleSelection(_color)"
                :class="{ 'selected': _color.selected }"
                :style="{ 'background-color': _color.hex, 'border-color': _color.selected ? 'black' : _color.hex, 'color': _color.selected ? _color.hex : 'black' }"
                class="cursor-pointer border-3 rounded px-2 py-1 m-1">
                {{ _color.name }}
              </label>
            </div>
          </div>
        </div>
        
        <div class="furnitureBasicDetails md:w-1/2 flex flex-col space-y-4">
          <input class="basicButton border border-primary-black rounded py-2 px-4" id="furnitureName" :placeholder="`${content.placeholders.furnitureName}`">
          <input class="basicButton border border-primary-black rounded py-2 px-4" id="furniturePrice" :placeholder="`${content.placeholders.furniturePrice}`">
          <input class="basicButton border border-primary-black rounded py-2 px-4" id="furnitureHeight" :placeholder="`${content.placeholders.furnitureHeight}`">
          <input class="basicButton border border-primary-black rounded py-2 px-4" id="furnitureWidth" :placeholder="`${content.placeholders.furnitureWidth}`">
          <input class="basicButton border border-primary-black rounded py-2 px-4" id="furnitureDepth" :placeholder="`${content.placeholders.furnitureDepth}`">
          <button id="addFurnitureToCatalog" class="basicButton border border-primary-black rounded py-2 px-4 font-bold" @click="addFurniture">{{ content.addFurnitureToCatalog }}</button>
        </div>
      </div>
    </div>
    <Notifications ref="notifications"/>
</template>
  

<script>
import {isLogged, loggedIn} from "public/ts/checkLogin";
import Notifications from "@/components/Notifications.vue";

export default {
    name: "CreateNewFurniture",
    components: {
        Notifications
    },
    data() {
        return {
            content: this.$content.settings.companies,
            notificationsMessages: this.$content.notifications,
            notificationsMessagesFurniture: this.$content.notifications.furniture,
            placeholders: {},
            langPrefix: "/",
            styles: {
                modern: { name: "modern", selected: false },
                scandinavian: { name: "scandinavian", selected: false },
                industrial: { name: "industrial", selected: false },
                traditional: { name: "traditional", selected: false },
                rustic: { name: "rustic", selected: false },
                bohemian: { name: "bohemian", selected: false },
                coastal: { name: "coastal", selected: false },
                farmhouse: { name: "farmhouse", selected: false },
                minimalist: { name: "minimalist", selected: false },
                art_deco: { name: "art_deco", selected: false },
                french_country: { name: "french_country", selected: false },
                shabby_chic: { name: "shabby_chic", selected: false },
                metal: { name: "metal", selected: false },
                retro: { name: "retro", selected: false },
                classic: { name: "classic", selected: false },
                romantic: { name: "romantic", selected: false },
                gothic: { name: "gothic", selected: false },
                victorian: { name: "victorian", selected: false },
                asian: { name: "asian", selected: false },
                african: { name: "african", selected: false },
                bauhaus: { name: "bauhaus", selected: false },
                baroque: { name: "baroque", selected: false },
            },
            rooms: {
                bedroom: { name: "bedroom", selected: false },
                living_room: { name: "living_room", selected: false },
                dining_room: { name: "dining_room", selected: false },
                kitchen: { name: "kitchen", selected: false },
                bathroom: { name: "bathroom", selected: false },
                office: { name: "office", selected: false },
                guest_room: { name: "guest_room", selected: false },
                gaming_room: { name: "gaming_room", selected: false },
                library: { name: "library", selected: false },
                hallway: { name: "hallway", selected: false },
                laundry_room: { name: "laundry_room", selected: false },
                balcony: { name: "balcony", selected: false },
                patio: { name: "patio", selected: false },
                garden: { name: "garden", selected: false },
                family_room: { name: "family_room", selected: false },
                attic: { name: "attic", selected: false },
                garage: { name: "garage", selected: false },
                pantry: { name: "pantry", selected: false },
            },
            colors: {
                white: { name: "white", hex: "#FFFFFF", selected: false },
                ivory: { name: "ivory", hex: "#FFFFD4", selected: false },
                beige: { name: "beige", hex: "#F5F5DC", selected: false },
                yellow: { name: "yellow", hex: "#FDFD96", selected: false },
                pink: { name: "pink", hex: "#FFC0CB", selected: false },
                gold: { name: "gold", hex: "#FFD700", selected: false },
                orange: { name: "orange", hex: "#FF7F00", selected: false },
                red: { name: "red", hex: "#FF0000", selected: false },
                turquoise: { name: "turquoise", hex: "#40e0d0", selected: false },
                green: { name: "green", hex: "#A3E571", selected: false },
                olive: { name: "olive", hex: "#628737", selected: false },
                purple: { name: "purple", hex: "#A020F0", selected: false },
                teal: { name: "teal", hex: "#008080", selected: false },
                blue: { name: "blue", hex: "#0047AB", selected: false },
                silver: { name: "silver", hex: "#C0C0C0", selected: false },
                gray: { name: "gray", hex: "#9B9B9B", selected: false },
                brown: { name: "brown", hex: "#523C20", selected: false },
                navy: { name: "navy", hex: "#000080", selected: false },
                black: { name: "black", hex: "#2A303D", selected: false }
            }
        }
    },
    mounted() {
        this.checkIfLogged();
    },
    methods: {
        toggleSelection(item) {
            item.selected = !item.selected;
        },

        async checkIfLogged() {
            await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
        },

        async addFurniture() {
            const userID = await isLogged();
            if (!loggedIn) {
                location.href = this.langPrefix + "login";
            }
            const COMPANY_API_TOKEN = localStorage.getItem('COMPANY_API_TOKEN');
            const furnitureName = document.querySelector('#furnitureName').value;
            const furniturePrice = Number(document.querySelector('#furniturePrice').value);
            const furnitureHeight = Number(document.querySelector('#furnitureHeight').value);
            const furnitureWidth = Number(document.querySelector('#furnitureWidth').value);
            const furnitureDepth = Number(document.querySelector('#furnitureDepth').value);
            let furnitureColors = [];
            let furnitureStyles = [];
            let furnitureRooms = [];

            for (const color of Object.values(this.colors)) {
                if (color.selected === true) {
                    furnitureColors.push(color.name);
                }
            }

            for (const style of Object.values(this.styles)) {
                if (style.selected === true) {
                    furnitureStyles.push(style.name);
                }
            }

            for (const room of Object.values(this.rooms)) {
                if (room.selected === true) {
                    furnitureRooms.push(room.name);
                }
            }

            if (furnitureName === "") {
                this.$refs.notifications.showError(this.notificationsMessagesFurniture.missingName);
                return;
            } else if (furniturePrice === null || furniturePrice < 0) {
                this.$refs.notifications.showError(furniturePrice === null 
                    ? this.notificationsMessagesFurniture.missingPrice 
                    : this.notificationsMessagesFurniture.negativeNumber);
                return;
            } else if (furnitureStyles.length === 0) {
                this.$refs.notifications.showError(this.notificationsMessagesFurniture.missingStyle);
                return;
            } else if (furnitureRooms.length === 0) {
                this.$refs.notifications.showError(this.notificationsMessagesFurniture.missingRoom);
                return;
            } else if (furnitureHeight === null || furnitureHeight < 0) {
                this.$refs.notifications.showError(furnitureHeight === null 
                    ? this.notificationsMessagesFurniture.missingHeight 
                    : this.notificationsMessagesFurniture.negativeNumber);
                return;
            } else if (furnitureWidth === null || furnitureWidth < 0) {
                this.$refs.notifications.showError(furnitureWidth === null 
                    ? this.notificationsMessagesFurniture.missingWidth 
                    : this.notificationsMessagesFurniture.negativeNumber);
                return;
            } else if (furnitureDepth === null || furnitureDepth < 0) {
                this.$refs.notifications.showError(furnitureDepth === null 
                    ? this.notificationsMessagesFurniture.missingDepth 
                    : this.notificationsMessagesFurniture.negativeNumber);
                return;
            } else if (furnitureColors.length === 0) {
                this.$refs.notifications.showError(this.notificationsMessagesFurniture.missingColor);
                return;
            }

            console.log('https://api.ardeco.app/catalog/' + `${userID}` + '/add?company_api_key=' + `${COMPANY_API_TOKEN}`);
            const response = await fetch('https://api.ardeco.app/catalog/' + `${userID}` + '/add?company_api_key=' + `${COMPANY_API_TOKEN}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([{
                    "name": furnitureName,
                    "price": furniturePrice,
                    "styles": furnitureStyles,
                    "rooms": furnitureRooms,
                    "height": furnitureHeight,
                    "width": furnitureWidth,
                    "depth": furnitureDepth,
                    "colors": furnitureColors
                }]),
                credentials: 'include',
            });

            const result = await response.json();
            console.log(result);
            if (result.code === 201) {
                document.querySelector('#furnitureName').value = "";
                document.querySelector('#furniturePrice').value = "";
                document.querySelector('#furnitureHeight').value = "";
                document.querySelector('#furnitureWidth').value = "";
                document.querySelector('#furnitureDepth').value = "";
                this.$refs.notifications.showSuccess(this.notificationsMessages.furnitureCreated);
            } else {
                this.$refs.notifications.showError(this.notificationsMessages.furnitureCreationFailed);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/ProfileSettings.scss";
@import '@/styles/variables/ColorVariables.scss';

.navbar-top-space {
    height: 10vh;
}

.mainContent {
    margin-left: 7.5vw;
    width: 85vw;
    height: 65vh;
    display: flex;
}

.furniturePictureArea {
    height: 100%;
    width: 50%;
}

#furnitureImg {
    border: 2px solid $primary-black;
    height: 100%;
    width: auto;
    border-radius: 10px;
}

.furnitureDetails {
    display: flex;
    margin-left: 2.5%;
    padding: 2.5%;
    width: 100%;
}

.furnitureBasicDetails {
    width: 50%;
}

.furnitureSpecificDetails {
    width: 50%;
}

.basicButton {
    text-align: center;
    border: 1px solid $primary-black;
    border-radius: 5px;
    height: 10%;
    width: 80%;
    margin-bottom: 8%;
    margin-left: 10%;
}

.bottomButton {
    margin-bottom: 0;
}

.specificDetailTitle {
    font-size: 14px;
    border-radius: 5px;
    text-align: center;
    height: 10%;
    width: 50%;
    margin-left: 25%;
    font-weight: bold;
    font-size: 18px;
}

.options {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 90%;
    margin-top: -10%;
    margin-left: 5%;
    margin-bottom: 5%;
}

.option label {
    font-size: 10px;
    cursor: pointer;
    display: inline-block;
    border: 1px solid $primary-black;
    border-radius: 5px;
    padding: 5px;
    margin: 5px 5px 10px;
    align-items: center;
    transition: 0.3s;
}

.option label:hover {
    background-color: $primary-black;
    color: white;
}

.option label.selected {
    background-color: $primary-black;
    color: white;
}

.colorOption label {
    font-size: 10px;
    cursor: pointer;
    display: inline-block;
    border: 3px solid;
    border-radius: 5px;
    margin: 5px 5px 10px;
    align-items: center;
    transition: 0.3s;
}

#addFurnitureToCatalog {
    font-weight: bold;
}


@media screen and (max-width: 768px) {
    .mainContent {
        border: none;
        overflow: auto;
        display: inline;
    }

    .furniturePictureArea {
        width: 80%;
        margin-left: 10%;
        margin-top: 10%;
    }

    .furnitureDetails {
        display: inline;
        margin-left: 10%;
        border: none;
        border-radius: 0;
        padding: 0;
        width: 80%;
    }

    .furnitureBasicDetails {
        border: none;
        width: 100%;
    }

    .furnitureSpecificDetails {
        margin-top: 10%;
        border: none;
        width: 100%;
    }

    .specificDetailTitle {
        border-radius: 0;
        height: 10%;
        width: 100%;
        margin-left: 0;
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 10%;
    }
}

</style>
