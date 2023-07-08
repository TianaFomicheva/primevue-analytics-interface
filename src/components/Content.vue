<script setup>
import { ref } from "vue";
import TabMenu from "primevue/tabmenu";
import Divider from "primevue/divider";
const items = ref([
  { label: "Динамика показателя",  to: "/" },
  { label: "Методика расчета", to: "/skeleton1" },
  { label: "Мероприятия", to: "/skeleton2" },
]);
const active = ref(0);
</script>

<template>
  <div class="content-wrapper">
    <TabMenu :model="items" v-model:activeIndex="active" />
    <Divider />
    <router-view />
  </div>
</template>