<template>
  <div id="hero" class="flex h-screen w-full font-black bg-port-brown text-9xl bg-no-repeat bg-cover"
       :style="{backgroundImage: `url(${backgroundUrl})`}"
  >
    <h1 ref=test class="font-black md:mt-16 justify-center text-7xl md:text-9xl mt-72 text-center mx-auto bg-port-brown md:bg-transparent h-fit text-ARgrey w-fit md:w-1/2">Welcome to ARDeco</h1>
  </div>
  <div class="h-screen bg-[#F2EBDF] flex">
    <div class="text-center h-full items-center">
      <div class="auto-scroll-text flex absolute w-full overflow-hidden mt-24 z-[1] flex-col pt-8 md:pt-0">
        <div
            v-for="i in 5"
            :key="i"
            :class="['flex items-center justify-start w-full whitespace-nowrap',
                   'transition duration-1000 pointer-events-none select-none', {'animation-reverse' : i % 2 === 0}]"
        >
        <div v-for="j in 5" :key="j" class="font-black leading-none mr-10 text-3  text-[5rem] md:text-[9rem] text-port-brown">
            <span class="mr-5">Explore</span><span class="outline-text">Project</span>
          </div>
        </div>
      </div>
    </div>
    <div  class="mt-72 md:mt-96 mx-auto z-30" >
      <button class="p-10 rounded-full flex h-fit text-port-brown font-extrabold text-3xl md:text-8xl bg-ARgrey ease-in-out
      duration-700 hover:text-ARgrey hover:bg-port-brown  hover:border-2 hover:border-ARgrey hover:p-20">Click here!</button>
    </div>
  </div>
  <!--test threeJS-->
    <ClientOnly>
      <Cube class="h-1/4 w-1/4"></Cube>
    </ClientOnly>
</template>

<script setup lang="ts">
import backgroundUrl from '~/assets/images/homeHero.jpg'
import Cube from "~/components/Cube.vue";

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
    transform: translateX(-50%);
  }
}
</style>
