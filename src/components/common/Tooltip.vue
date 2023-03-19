<template>
  <div class="tooltip">{{ message }}</div>
</template>

<script setup>
defineProps({
  message: String,
});
</script>
