<template>
<p v-if="pagination" class="m-2">
  {{props.pagination.from}} - {{props.pagination.to}} of {{props.pagination.total}}
</p>
</template>

<script setup>

const props = defineProps({
  pagination: Object
});
</script>

