<template>
    <Head>
        <Title>ARDeco - {{ content.welcomeTitle }}</Title>
        <Meta name="description" content="Une application innovante qui révolutionne votre expérience de design et d'aménagement intérieur en utilisant la Réalité Augmentée (AR) et l'Intelligence Artificielle (IA) depuis votre smartphone." />
    </Head>
    <div id="hero" class="flex h-dvh w-full bg-port-brown bg-no-repeat bg-cover"
         :style="{backgroundImage: `url(${backgroundUrl})`}">
        <h1 id="welcomeTitle"
            class="font-black mt-72 md:mt-16 p-2 justify-center text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-center mx-auto bg-port-brown md:bg-transparent rounded-lg text-ARgrey h-fit w-fit md:w-1/2">
            {{content.welcomeTitle}}</h1>
    </div>
    <div class="bg-[#F2EBDF] flex flex-col 2xl:flex-row items-center mt-9 mb-9">
        <div class="font-display font-medium 2xl:w-1/3 ml-9 mr-9 text-2xl 2xl:text-4xl text-ARgrey my-auto bg-port-brown bg-opacity-20 rounded-3xl p-4 max-2xl:mb-9">
            <h2 class="underline mb-2 text-center">ARDeco</h2>
            <p id="productPresentation" class="">
                {{content.productPresentation}}
            </p>
        </div>
        <img class="2xl:ml-24 w-1/2 h-2/3 my-auto rounded-xl" src="~assets/images/intro.gif" alt="ARDeco concept demo"/>
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
    <div class="timelineTitle">{{ timeline.title }}</div>
    <div class="timeline">
        <div class="outer">
            <div class="card">
                <div class="info">
                    <h3 class="title">TEST & LEARN</h3>
                    <h3 class="title">{{ timelineDates.june2023 }}</h3>
                    <p>{{ timeline.testAndLearn }}</p>
                </div>
            </div>
            <div class="card">
                <div class="info">
                    <h3 class="title">MANAGEMENT & PROCESS</h3>
                    <h3 class="title">{{ timelineDates.october2023 }}</h3>
                    <p>{{ timeline.managementAndProcess }}</p>
                </div>
            </div>
            <div class="card">
                <div class="info">
                    <h3 class="title">FAST FORWARD</h3>
                    <h3 class="title">{{ timelineDates.january2024 }}</h3>
                    <p>{{ timeline.fastForward }}</p>
                </div>
            </div>
            <div class="card">
                <div class="info">
                    <h3 class="title">BETA & GROWTH HACKING</h3>
                    <h3 class="title">{{ timelineDates.may2024 }}</h3>
                    <p>{{ timeline.betaAndGrowthHacking }}</p>
                </div>
            </div>
            <div class="card">
                <div class="info">
                    <h3 class="title">CONSOLIDATION</h3>
                    <h3 class="title">{{ timelineDates.september2024 }}</h3>
                    <p>{{ timeline.consolidation }}</p>
                </div>
            </div>
            <div class="card">
                <div class="info">
                    <h3 class="title">LAUNCH AND METRIC</h3>
                    <h3 class="title">{{ timelineDates.december2024 }}</h3>
                    <p>{{ timeline.launchAndMetric }}</p>
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
        this.timelineDates = this.content.timeline.dates;
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

</style>

<!--<style lang="scss" scoped>

.timelineTitle {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-top: -5%;
}

/* Timeline Container */
.timeline {
    background: var(&#45;&#45;primary-color);
    margin-left: 40%;
    margin-bottom: 5%;
    width: 20%;
}

/* Card container */
.card {
    position: relative;
    max-width: 400px;
}

/* setting padding based on even or odd */
.card:nth-child(odd) {
    padding: 30px 0 30px 30px;
}

.card:nth-child(even) {
    padding: 30px 30px 30px 0;
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
    left: 0px;
    top: -4.5px;
    bottom: -4.5px;
    border-width: 5px 0 5px 5px;
    border-radius: 50px 0 0 50px;
}

/* Setting the top and bottom to "-5px" because earlier it was out of a pixel in mobile devices */
@media only screen and (max-width: 400px) {
    .card:nth-child(odd)::before {
        top: -5px;
        bottom: -5px;
    }
}

/* Setting the border of top, bottom, right */
.card:nth-child(even)::before {
    right: 0;
    top: 0;
    bottom: 0;
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

/* Information about the timeline */
.info {
    display: flex;
    flex-direction: column;
    background: #333;
    color: gray;
    border-radius: 10px;
    padding: 10px;
}

/* Title of the card */
.title {
    color: orangered;
    position: relative;
}

/* Timeline dot  */
.title::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    background: white;
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

@media only screen and (max-width: 500px) {
    #welcomeTitle {
        font-size: 72px;
    }

    #productPresentation {
        font-size: 16px;
    }

    #augmentedRealityText {
        font-size: 16px;
    }

    .timelineTitle {
        margin-top: 100%;
    }

    .timeline {
        width: 80%;
        margin-left: 10%;
    }
}


@media only screen and (max-width: 800px) {
    #welcomeTitle {
        font-size: 96px;
    }

    #productPresentation {
        font-size: 18px;
    }

    #augmentedRealityText {
        font-size: 18px;
    }

    .timelineTitle {
        margin-top: 5%;
    }

    .timeline {
        width: 60%;
        margin-left: 20%;
    }
}

</style>-->
