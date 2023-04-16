<template>
  <div id="hero" class="flex h-screen w-full font-black bg-port-brown text-9xl bg-no-repeat bg-cover"
  :style="{backgroundImage: `url(${backgroundUrl})`}">
    <h1 ref=test class="font-black md:mt-16 justify-center text-7xl md:text-9xl mt-72 text-center mx-auto bg-port-brown md:bg-transparent h-fit text-ARgrey w-fit md:w-1/2">Welcome to ARDeco</h1>
  </div>
    <div class="h-screen bg-[#F2EBDF] flex">
      <div class="font-display font-medium w-1/3 ml-9 text-4xl text-ARgrey my-auto bg-port-brown bg-opacity-20 rounded-3xl p-4">
      <h2 class="underline mb-5">ARDECO</h2>
        <p>
          Is innovative application that revolutionizes your interior design experience using Augmented Reality (AR) and Artificial Intelligence (AI). Effortlessly scan your room with your phone, and our intelligent AI algorithms will analyze the space to create personalized, visually stunning decorations tailored to your preferences. Explore new design possibilities and bring your dream space to life with ARDeco.
        </p>
      </div>
      <img class="ml-32 w-1/2 h-2/3 my-auto rounded-xl" src="~assets/images/intro.gif" alt="this slowpoke moves" />
    </div>
  <div class="bg-[#F2EBDF] flex flex-col">
  <div class="text-center h-full items-center">
      <div class="flex w-full overflow-hidden mt-24 z-0 flex-col pt-8 md:pt-0">
        <div class="flex auto-scroll-text items-center justify-start w-full whitespace-nowrap',
        'transition duration-1000 pointer-events-none select-none">
          <div v-for="j in 10" :key="j" class="font-black leading-none text-3 mr-4 text-[3rem] md:text-[5rem] text-port-brown">
            <span class="mr-4">Discover</span><span class="outline-text">Team</span>
          </div>
        </div>

        <div class="mx-auto" >
          <a class="p-5 rounded-full flex h-fit text-port-brown font-extrabold text-3xl md:text-5xl bg-ARgrey ease-in-out
      duration-700 hover:text-ARgrey hover:bg-port-brown  hover:border-2 hover:border-ARgrey hover:p-8" href="/team">Click here!</a>
        </div>
        <div class=" auto-scroll-text flex items-center justify-start w-full whitespace-nowrap',
        'transition duration-1000 pointer-events-none select-none ">
          <div v-for="j in 10" :key="j" class="font-black leading-none mr-4 text-3  text-[3rem] md:text-[5rem] text-port-brown animation-reverse">
            <span class="mr-4">Discover</span><span class="outline-text">Team</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="h-screen bg-[#F2EBDF] flex">
    <img class="ml-32 w-1/2 h-2/3 my-auto rounded-xl" src="~assets/images/intro.gif" alt="this slowpoke moves" />
    <div class="font-display font-medium w-1/3 ml-9 text-4xl text-ARgrey my-auto bg-port-brown bg-opacity-20 rounded-3xl p-4">
      <h2 class="underline mb-5">ARDECO</h2>
      <p>
        Is innovative application that revolutionizes your interior design experience using Augmented Reality (AR) and Artificial Intelligence (AI). Effortlessly scan your room with your phone, and our intelligent AI algorithms will analyze the space to create personalized, visually stunning decorations tailored to your preferences. Explore new design possibilities and bring your dream space to life with ARDeco.
      </p>
    </div>
  </div>
  <!--test threeJS-->

</template>

<script setup lang="ts">
import backgroundUrl from '~/assets/images/homeHero.jpg'

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

@keyframes scrollText {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
