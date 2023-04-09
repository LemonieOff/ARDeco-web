<template>
  <canvas ref="canv"></canvas>
  <h1>TEST2</h1>
</template>

<script lang="ts">

import {Scene, PerspectiveCamera, BoxGeometry, Mesh, MeshBasicMaterial, WebGLRenderer, SphereGeometry} from 'three'
import {onMounted, Ref, ref} from "vue";

let renderer: WebGLRenderer
const canv:  Ref<HTMLCanvasElement | null > = ref(null);
const width = 800;
const height = 500;

const scene = new Scene();
const camera = new PerspectiveCamera(75,  width / height, 0.1, 1000);
camera.position.x = 0;
camera.position.z = 4;
camera.position.y = 4;
const sphere = new Mesh(new SphereGeometry(1 , 32, 32), new MeshBasicMaterial({color: 0xff0000}));
scene.add(camera);
scene.add(sphere)

function setRenderer() {
  if (canv.value) {
    renderer = new WebGLRenderer({ canvas : canv.value })
    renderer.setSize(width, height);
    console.log("coucouocoucou\n");
    renderer.render(scene, camera)
  }
  console.log("here");
}

onMounted(() => {
  setRenderer()
})

export default {
  name: "Cube"
}
</script>

<style scoped>

</style>