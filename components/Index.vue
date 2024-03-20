<template>
    <div id="hero" class="flex h-screen w-full font-black bg-port-brown text-9xl bg-no-repeat bg-cover"
         :style="{backgroundImage: `url(${backgroundUrl})`}">
        <h1 id="welcomeTitle"
            class="font-black md:mt-16 justify-center text-7xl md:text-9xl mt-72 text-center mx-auto bg-port-brown md:bg-transparent h-fit text-ARgrey w-fit md:w-1/2">
            {{content.welcomeTitle}}</h1>
    </div>
    <div class="h-screen bg-[#F2EBDF] flex">
        <div class="font-display font-medium w-1/3 ml-9 text-4xl text-ARgrey my-auto bg-port-brown bg-opacity-20 rounded-3xl p-4">
            <h2 class="underline mb-5">ARDECO</h2>
            <p id="productPresentation">
                {{content.productPresentation}}
            </p>
        </div>
        <img class="ml-32 w-1/2 h-2/3 my-auto rounded-xl" src="~assets/images/intro.gif" alt="this slowpoke moves"/>
    </div>
    <div class="bg-[#F2EBDF] flex flex-col">
        <div class="text-center h-full items-center">
            <div class="flex w-full overflow-hidden mt-24 z-0 flex-col pt-8 md:pt-0">
                <div class="flex auto-scroll-text items-center justify-start w-full whitespace-nowrap',
        'transition duration-1000 pointer-events-none select-none">
                    <div v-for="j in 10" :key="j"
                         class="font-black leading-none text-3 mr-4 text-[3rem] md:text-[5rem] text-port-brown">
                        <span id="discover" class="mr-4">{{transition.discover}}</span><span id="team" class="outline-text">{{transition.team}}</span>
                    </div>
                </div>

                <div class="mx-auto">
                    <a id="clickHere" class="p-5 rounded-full flex h-fit text-port-brown font-extrabold text-3xl md:text-5xl bg-ARgrey ease-in-out
      duration-700 hover:text-ARgrey hover:bg-port-brown  hover:border-2 hover:border-ARgrey hover:p-8" href="/team">{{transition.clickHere}}</a>
                </div>
                <div class=" auto-scroll-text flex items-center justify-start w-full whitespace-nowrap',
        'transition duration-1000 pointer-events-none select-none ">
                    <div v-for="j in 10" :key="j"
                         class="font-black leading-none mr-4 text-3  text-[3rem] md:text-[5rem] text-port-brown animation-reverse">
                        <span id="discover2" class="mr-4">{{transition.discover}}</span><span id="team2" class="outline-text">{{transition.team}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="h-screen bg-gradient-to-t from-port-brown to-[#F2EBDF] flex">
        <img class="ml-32 w-1/2 h-2/3 my-auto rounded-xl" src="~assets/images/ar_illu.png" alt="this slowpoke moves"/>
        <div class="font-display font-medium w-1/3 ml-9 text-4xl text-ARgrey my-auto bg-port-brown bg-opacity-20 rounded-3xl p-4">
            <h2 id="augmentedRealityTitle" class="underline mb-5">{{content.augmentedRealityTitle}}</h2>
            <p id="augmentedRealityText">
                {{content.augmentedRealityText}}
            </p>
        </div>
    </div>
    <div class="flex flex-col items-center justify-center bg-gradient-to-b h-screen w-screen from-port-brown to-[#F2EBDF]">
        <span id="keyPoints" class="text-9xl font-bold mb-12 w-full text-center outline-text">{{content.keyPoints}}</span>
        <ul class="flex flex-wrap justify-center">
            <li v-for="(feature, index) in features" :key="index"
                class="m-3 flex flex-col justify-between bg-port-brown border border-ARgrey text-ARgrey p-4 rounded-md shadow-md w-1/3 font-sans hover:bg-ARgrey hover:text-port-brown">
                <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
                <p class="">{{ feature.description }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import backgroundUrl from "assets/images/homeHero.jpg";
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

import {ref} from "vue";

export default {
    name: "Index",
    props: {
        urlLang: String | null
    },
    data() {
        return {
            content: {},
            transition: {},
            langPrefix: "/",
            backgroundUrl: backgroundUrl,
            features: ref([])
        }
    },
    mounted() {
        let lang = this.urlLang;

        // If lang selector is not passed in url, get the user's one or set it to french
        if (lang !== 'en' && lang !== 'fr') {
            const localStorageLang = localStorage.getItem('lang');
            if (localStorageLang) {
                lang = localStorageLang;
            } else {
                lang = 'fr';
            }
        }

        // Set the content variable to the correct language
        this.content = lang === 'en' ? en.home : fr.home;
        this.transition = this.content.transitionEffect;

        this.features = this.content.keyPointsBlocks;

        // Prefix for links
        if (location.href.includes("/fr/")) {
            this.langPrefix = "/fr/";
        } else if (location.href.includes("/en/")) {
            this.langPrefix = "/en/";
        }
    }
}
</script>

<style lang="scss" scoped>
.auto-scroll-text {
    & > div {
        animation: scrollText 16s infinite linear;

        &.animation-reverse {
            animation-direction: reverse;
        }

        span.outline-text {
            -webkit-text-stroke: 1px theme('colors.ARgrey');
            color: transparent;
        }
    }
}

span.outline-text {
    -webkit-text-stroke: 1px theme('colors.ARgrey');
    color: transparent;
}

@keyframes scrollText {
    from {
        transform: translateX(0%);
    }
    to {
        transform: translateX(-100%);
    }
}
</style>
