<template>
  <p>From {{ from }} to {{ to }}. Total = {{ total }}</p>
</template>

<script setup>
defineProps({
  total: Number,
  from: Number,
  to: Number,
});
</script>

