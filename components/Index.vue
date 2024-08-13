<template>
    <Head>
        <Title>ARDeco - {{ content.welcomeTitle }}</Title>
        <Meta name="description" content="Une application innovante qui révolutionne votre expérience de design et d'aménagement intérieur en utilisant la Réalité Augmentée (AR) et l'Intelligence Artificielle (IA) depuis votre smartphone." />
    </Head>
    <!-- Welcome title -->
    <div id="hero" class="flex h-dvh w-full bg-port-brown bg-no-repeat bg-cover"
         :style="{backgroundImage: `url(${backgroundUrl})`}">
        <h1 id="welcomeTitle"
            class="font-black mt-72 md:mt-16 p-2 justify-center text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-center mx-auto bg-port-brown md:bg-transparent rounded-lg text-ARgrey h-fit w-fit md:w-1/2">
            {{content.welcomeTitle}}</h1>
    </div>

    <!-- Product presentation -->
    <div class="bg-[#F2EBDF] flex flex-col xl:flex-row items-center my-9">
        <div class="font-display font-medium mx-9 text-2xl text-ARgrey my-auto bg-port-brown bg-opacity-20 rounded-3xl p-4 max-xl:mb-9">
            <h2 class="underline mb-2 text-center">ARDeco</h2>
            <p id="productPresentation" class="">
                {{content.productPresentation}}
            </p>
        </div>
        <img class="2xl:ml-24 xl:mr-9 my-auto rounded-xl" src="~assets/images/intro.gif" alt="ARDeco concept demo"/>
    </div>

    <!-- Team link -->
    <div class="bg-[#F2EBDF]">
        <div class="text-center h-full items-center">
            <div class="flex w-full overflow-hidden py-5 z-0 flex-col">
                <div class="flex auto-scroll-text items-center justify-start w-full whitespace-nowrap transition duration-1000 pointer-events-none select-none">
                    <div v-for="j in 5" :key="j"
                         class="font-black leading-none mr-4 text-[2rem] md:text-[5rem] text-port-brown">
                        <span id="discover" class="mr-4">{{transition.discover}}</span><span id="team" class="outline-text">{{transition.team}}</span>
                    </div>
                </div>

                <div class="mx-auto mt-2 md:mt-4 mb-1 md:mb-3">
                    <a id="clickHere" class="p-2 md:p-5 rounded-full flex h-fit text-port-brown font-extrabold text-2xl md:text-5xl bg-ARgrey ease-in-out duration-700 border-2 border-transparent hover:text-ARgrey hover:bg-port-brown hover:border-ARgrey" href="/team">{{transition.clickHere}}</a>
                </div>

                <div class="flex auto-scroll-text items-center justify-start w-full whitespace-nowrap transition duration-1000 pointer-events-none select-none">
                    <div v-for="j in 5" :key="j"
                         class="font-black leading-none mr-4 text-[2rem] md:text-[5rem] text-port-brown animation-reverse">
                        <span id="discover2" class="mr-4">{{transition.discover}}</span><span id="team2" class="outline-text">{{transition.team}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Augmented reality -->
    <div class="bg-gradient-to-t from-port-brown to-[#F2EBDF] flex flex-col-reverse xl:flex-row items-center py-9">
        <img class="2xl:ml-24 xl:w-1/3 w-1/2 my-auto rounded-xl" src="~assets/images/ar_illu.png" alt="ARDeco conceptual mobile in-use illustration"/>
        <div class="font-display font-medium mx-9 text-2xl text-ARgrey my-auto bg-port-brown bg-opacity-20 rounded-3xl p-4 max-2xl:mt-9">
            <h2 id="augmentedRealityTitle" class="underline mb-2 text-center">{{content.augmentedRealityTitle}}</h2>
            <p id="augmentedRealityText">
                {{content.augmentedRealityText}}
            </p>
        </div>
    </div>

    <!-- Features -->
    <div class="flex flex-col items-center justify-center bg-gradient-to-b from-port-brown to-[#F2EBDF]">
        <span id="keyPoints" class="text-9xl font-bold mb-12 w-full text-center outline-text">{{content.keyPoints}}</span>
        <ul class="flex flex-col lg:flex-row flex-wrap justify-center content-center">
            <li v-for="(feature, index) in features" :key="index"
                class="m-3 flex flex-col justify-between bg-port-brown border border-ARgrey text-ARgrey p-4 rounded-md shadow-md w-5/6 lg:w-2/5 font-sans hover:bg-ARgrey hover:text-port-brown">
                <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
                <p class="">{{ feature.description }}</p>
            </li>
        </ul>
    </div>

    <!-- Timeline -->
    <div id="timelineTitle" class="font-bold text-center text-2xl mt-9 mb-5">{{ timeline.title }}</div>
    <div id="timeline">
        <div class="flex flex-col items-center">
            <div class="card w-4/5 xl:w-3/5 2xl:w-2/5 relative py-[30px] odd:pl-[30px] even:pr-[30px]" v-for="(object, index) in timeline.steps" :key="index">
                <div class="info flex flex-col p-2.5 rounded-xl bg-[#333]">
                    <h3 class="title text-[#ffaf91] relative">{{ object.title }}</h3>
                    <h3 class="title text-[#ffaf91] relative">{{ object.date }}</h3>
                    <p class="text-[#c2c2c2]">{{ object.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import backgroundUrl from "assets/images/homeHero.jpg";
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

import { ref } from "vue";

export default {
    name: "Index",
    props: {
        urlLang: String | null
    },
    data() {
        return {
            content: {},
            timeline: {},
            timelineDates: {},
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
        this.timeline = this.content.timeline;
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

/* Global ::before */
.card::before {
    content: "";
    position: absolute;
    width: 50%;
    border: solid orangered;
}

/* Setting the border of top, bottom, left */
.card:nth-child(odd)::before {
    left: 0;
    top: -5px;
    bottom: -5px;
    border-width: 5px 0 5px 5px;
    border-radius: 50px 0 0 50px;
}

/* Setting the border of top, bottom, right */
.card:nth-child(even)::before {
    right: 0;
    top: 0;
    bottom: 0.5px;
    border-width: 5px 5px 5px 0;
    border-radius: 0 50px 50px 0;
}

/* Removing the border if it is the first card */
.card:first-child::before {
    border-top: 0;
    border-top-left-radius: 0;
}

/* Removing the border if it is the last card  and it's odd */
.card:last-child:nth-child(odd)::before {
    border-bottom: 0;
    border-bottom-left-radius: 0;
}

/* Removing the border if it is the last card  and it's even */
.card:last-child:nth-child(even)::before {
    border-bottom: 0;
    border-bottom-right-radius: 0;
}

/* Timeline dot  */
.title::before {
    top: 5px;
    content: "";
    position: absolute;
    width: 15px;
    height: 15px;
    background: #ffaf91;
    border-radius: 999px;
    border: 3px solid orangered;
}

/* text right if the card is even  */
.card:nth-child(even) > .info > .title {
    text-align: right;
}

/* setting dot to the left if the card is odd */
.card:nth-child(odd) > .info > .title::before {
    left: -45px;
}

/* setting dot to the right if the card is odd */
.card:nth-child(even) > .info > .title::before {
    right: -45px;
}
</style>
