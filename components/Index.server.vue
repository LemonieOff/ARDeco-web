<template>
    <Head>
        <Title>ARDeco - {{ content.welcomeTitle }}</Title>
        <Meta
            content="Une application innovante qui révolutionne votre expérience de design et d'aménagement intérieur en utilisant la Réalité Augmentée (AR) et l'Intelligence Artificielle (IA) depuis votre smartphone."
            name="description" />
    </Head>
    <!-- Welcome title -->
    <h1 id="welcomeTitle"
        class="font-black mt-9 p-2 justify-center text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-center mx-auto h-fit w-fit">
        {{ content.welcomeTitle }}
    </h1>

    <!-- App and store -->
    <div
        class="bg-gradient-to-t from-port-brown to-AR-Beige dark:from-AR-Grey dark:to-AR-Dark-Grey flex flex-col xl:flex-row items-center py-9">
        <NuxtImg alt="ARDeco logo"
                 class="min-w-32 max-w-32 lg:min-w-64 lg:max-w-64 xl:ml-9 my-auto rounded-xl dark:bg-port-brown"
                 height="128"
                 loading="lazy"
                 src="images/ardeco.webp" width="128" />
        <div
            class="font-display font-medium mx-9 text-xl md:text-2xl my-auto bg-port-brown bg-opacity-20 rounded-3xl p-4 max-2xl:mt-9">
            <h2 id="appTitle" class="underline mb-2 text-center">
                {{ content.appTitle }}</h2>
            <p id="appText">
                {{ content.appTextIntro }}
                <a v-if="lang === 'fr'" class="block w-fit mx-auto"
                   href="https://play.google.com/store/apps/details?id=app.ARDeco.ARDeco" target="_blank">
                    <NuxtImg alt="Télécharger sur Google Play" class="max-h-20"
                             src="images/google-play-badge_fr.webp"></NuxtImg>
                </a>
                <a v-else class="block w-fit mx-auto"
                   href="https://play.google.com/store/apps/details?id=app.ARDeco.ARDeco&hl=en"
                   target="_blank">
                    <NuxtImg alt="Download on Google Play" class="max-h-20"
                             src="images/google-play-badge_en.webp"></NuxtImg>
                </a>
                {{ content.appTextFeedback }}
                <span class="block italic text-sm text-center pt-2.5">{{ content.appTextLegalAttributionGoogle }}</span>
            </p>
        </div>
    </div>

    <!-- Product presentation -->
    <div
        class="flex flex-col xl:flex-row items-center py-9 bg-gradient-to-b to-AR-Beige from-port-brown dark:to-AR-Dark-Grey dark:from-AR-Grey">
        <div
            class="font-display font-medium mx-9 text-xl md:text-2xl my-auto bg-port-brown bg-opacity-20 rounded-3xl p-4 max-xl:mb-9">
            <h2 class="underline mb-2 text-center">ARDeco</h2>
            <p id="productPresentation" class="">
                {{ content.productPresentation }}
            </p>
        </div>
        <video autoplay class="2xl:ml-24 xl:mr-9 my-auto rounded-xl" loop
               muted src="~assets/images/intro.webm" type="video/webm"></video>
    </div>

    <!-- Team link -->
    <div>
        <div class="text-center h-full items-center">
            <div class="flex w-full overflow-hidden py-5 z-0 flex-col">
                <div
                    class="flex auto-scroll-text items-center justify-start w-full whitespace-nowrap transition duration-1000 pointer-events-none select-none">
                    <div v-for="j in 5" :key="j"
                         class="font-black leading-none mr-4 text-[2rem] md:text-[5rem]">
                        <span id="discover" class="mr-4 text-AR-Grey dark:text-port-brown">{{
                                content.transitionEffect.discover
                            }}</span><span
                        id="team" class="text-transparent outline-text">{{
                            content.transitionEffect.team
                        }}</span>
                    </div>
                </div>

                <div class="mx-auto mt-2 md:mt-4 mb-1 md:mb-3">
                    <a id="clickHere"
                       :href="`${langPrefix}team`"
                       class="p-2 md:p-5 rounded-full flex h-fit text-port-brown font-extrabold text-2xl md:text-5xl bg-AR-Grey ease-in-out duration-700 border-2 border-transparent hover:text-AR-Grey hover:bg-port-brown hover:border-AR-Grey">{{ content.transitionEffect.clickHere
                        }}</a>
                </div>

                <div
                    class="flex auto-scroll-text items-center justify-start w-full whitespace-nowrap transition duration-1000 pointer-events-none select-none">
                    <div v-for="j in 5" :key="j"
                         class="font-black leading-none mr-4 text-[2rem] md:text-[5rem] animation-reverse">
                            <span id="discover2"
                                  class="mr-4 text-AR-Grey dark:text-port-brown">
                                {{ content.transitionEffect.discover }}</span><span
                        id="team2"
                        class="text-transparent outline-text">{{ content.transitionEffect.team }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Augmented reality -->
    <div
        class="bg-gradient-to-t from-port-brown to-AR-Beige dark:from-AR-Grey dark:to-AR-Dark-Grey flex flex-col-reverse xl:flex-row items-center py-9">
        <NuxtImg alt="ARDeco conceptual mobile in-use illustration" class="2xl:ml-24 xl:w-1/3 w-1/2 my-auto rounded-xl"
                 height="503" loading="lazy"
                 src="images/ar_illu.webp" width="612" />
        <div
            class="font-display font-medium mx-9 text-xl md:text-2xl my-auto bg-port-brown bg-opacity-20 rounded-3xl p-4 max-2xl:mt-9">
            <h2 id="augmentedRealityTitle" class="underline mb-2 text-center">
                {{ content.augmentedRealityTitle }}</h2>
            <p id="augmentedRealityText">
                {{ content.augmentedRealityText }}
            </p>
        </div>
    </div>

    <!-- Features -->
    <div
        class="flex flex-col items-center justify-center bg-gradient-to-b from-port-brown to-AR-Beige dark:to-AR-Dark-Grey dark:from-AR-Grey">
            <span id="keyPoints"
                  class="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-12 w-full text-center text-transparent outline-text">
                {{ content.keyPoints }}</span>
        <ul class="flex flex-col lg:flex-row flex-wrap justify-center content-center">
            <li v-for="(feature, index) in content.keyPointsBlocks" :key="index"
                class="m-3 flex flex-col justify-between bg-port-brown border border-AR-Grey text-AR-Grey p-4 rounded-md shadow-md w-5/6 lg:w-2/5 font-sans hover:bg-AR-Grey hover:text-port-brown">
                <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
                <p class="">{{ feature.description }}</p>
            </li>
        </ul>
    </div>

    <!-- Timeline -->
    <div id="timelineTitle" class="font-bold text-center text-2xl mt-9 mb-5">{{ content.timeline.title }}</div>
    <div id="timeline">
        <div class="flex flex-col items-center">
            <div v-for="(object, index) in content.timeline.steps"
                 :key="index" class="card w-4/5 xl:w-3/5 2xl:w-2/5 relative py-[30px] odd:pl-[30px] even:pr-[30px]">
                <div class="info flex flex-col p-2.5 rounded-xl bg-[#333]">
                    <h3 class="title text-[#ffaf91] relative">{{ object.title }}</h3>
                    <h3 class="title text-[#ffaf91] relative">{{ object.date }}</h3>
                    <p class="text-[#c2c2c2]">{{ object.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "Index",
    data() {
        return {
            content: this.$content.home,
            langPrefix: this.$langPrefix,
            lang: this.$lang
        };
    }
};
</script>

<style lang="scss" scoped>
.auto-scroll-text {
    & > div {
        animation: scrollText 16s infinite linear;

        &.animation-reverse {
            animation-direction: reverse;
        }
    }
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

/* Removing the border if it is the last card */
.card:last-child::before {
    border-bottom: 0;
    border-bottom-left-radius: 0;
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
