<template>
  <button 
    type="button" 
    class="btn btn-danger"
    @click="Cancel()"
  >
  Cancel
  </button>
</template>

<script setup>
  const Cancel = () => {
    window.history.go(-1);
  }
</script>

