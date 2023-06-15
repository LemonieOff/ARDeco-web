<template>
    <Navbar></Navbar>
    <QuestionsLast></QuestionsLast>
    <QuestionsPage1></QuestionsPage1>
    <QuestionsPage2></QuestionsPage2>
    <QuestionsPage3></QuestionsPage3>
</template>
  
<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
import QuestionsLast from "~/components/FAQ/QuestionsList.vue";
import QuestionsPage1 from "~/components/FAQ/QuestionsPage1.vue";
import QuestionsPage2 from "~/components/FAQ/QuestionsPage2.vue";
import QuestionsPage3 from "~/components/FAQ/QuestionsPage3.vue";

</script>

<style lang="scss" scoped>
// @import '../styles/ColorVariables.scss';
</style>
