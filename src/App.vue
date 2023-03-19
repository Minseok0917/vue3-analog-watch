<template>
  <div class="container">
    <h1>{{ storeHello.message }}</h1>
    <div class="clock-container">
      <Clock />
    </div>
  </div>
</template>

<script setup>
import Clock from "@components/common/Clock.vue";
import { useStoreHello } from "@stores/hello";

const storeHello = useStoreHello();
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  padding: 2rem 0;
}
.container {
  width: 1440px;
  margin: 0 auto;
}
.clock-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
