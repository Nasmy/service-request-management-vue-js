<template>
    <div v-if="success" class="alert alert-success alert-dismissible fade show" role="alert">
      <p>{{ success }}</p>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="emitClosed"></button>
</div>
</template>

<script setup>
defineProps({
  success: String,
});

const emit = defineEmits(['emit-closed']);

function emitClosed() {
  emit('emit-closed');
}
</script>