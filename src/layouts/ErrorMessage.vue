<template>
  <div v-if="error" class="alert alert-warning alert-dismissible fade show" role="alert">
    <p>{{ error }}</p>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="emitClosed"></button>
  </div>
</template>

<script setup>
defineProps({
  error: String
});

const emit = defineEmits(['emit-closed']);

function emitClosed() {
  emit('emit-closed');
}
</script>
