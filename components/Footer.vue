<template xmlns="http://www.w3.org/1999/html">
  <div class="flex bg-port-brown flex-row border-ARgrey border-t-4 pb-8" >
    <div class="w-1/3 flex flex-col justify-around mx-auto justify-center ml-14">
      <h1 id="stayTuned" class="font-display font-black text-ARgrey text-3xl mt-8 mb-8">Stay tuned</h1>
      <a class="font-display text-ARgrey text-xl font-bold decoration-0 mb-2 hover:text-white decoration-0" href="https://instagram.com/ardeco_officiel">@ardeco_officiel</a>
      <a class="font-display text-ARgrey text-xl font-bold decoration-0 mb-8 hover:text-white decoration-0" href="https://linkedin.com/company/ardeco-nice">ARdeco</a>
    </div>
    <div class="w-1/3 flex flex-col justify-around ml-14">
      <h1 id="contactUs" class="font-display font-black text-ARgrey text-3xl mt-8 mb-8">Contact us</h1>
      <p class="font-display text-ARgrey text-xl font-bold decoration-0 mb-2 hover:text-white">+33 6 31 99 95 71</p>
      <p class="font-display text-ARgrey text-xl font-bold decoration-0 mb-8 hover:text-white">ardeco.officiel@gmail.com</p>
    </div>
    <div class="w-1/3 flex flex-col justify-around ml-14">
      <h1 id="newsletter" class="font-display font-black text-ARgrey text-3xl mt-8 mb-8">Join our newsletter</h1>
      <div class="w-3/4 py-2 px-3 mb-2 rounded-full bg-ARgrey">
        <input class="pl-5 w-3/4 bg-transparent py-3 outline-0 text-port-brown text-2xl font-display"/>
        <button id="subscribe" class="rounded-full w-1/4 p-4 bg-port-brown text-ARgrey text-lg font-bold font-display hover:border-4">Subscribe</button>
      </div>
    </div>
  </div>
</template>

<script>
import en from "~/src/lang/en.json";
import fr from "~/src/lang/fr.json";

export default {
  name: "Footer",
  mounted() {
    let lang = localStorage.getItem('lang')
    if (lang == null || lang == 'en') {
        document.getElementById('stayTuned').innerText = en.footer.stayTuned
        document.getElementById('contactUs').innerText = en.footer.contactUs
        document.getElementById('newsletter').innerText = en.footer.newsletter
        document.getElementById('subscribe').innerText = en.footer.subscribe
    } else {
        document.getElementById('stayTuned').innerText = fr.footer.stayTuned
        document.getElementById('contactUs').innerText = fr.footer.contactUs
        document.getElementById('newsletter').innerText = fr.footer.newsletter
        document.getElementById('subscribe').innerText = fr.footer.subscribe
    }
  },
}
</script>

<style scoped>

</style>