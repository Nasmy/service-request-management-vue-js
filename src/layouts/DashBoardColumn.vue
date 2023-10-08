<template>
  <div class="col bg-light rounded-3 m-2">
    <h6 class="m-3 text-muted">
      <slot name="DashboardColumnTitle"></slot>
    </h6>
    <hr />
    <div class="scroller-y">
      <slot name="DashboardColumn"></slot>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>

.scroller-y {
  height: 60vh;
  overflow-y: scroll;
  scrollbar-color: rgb(94, 94, 94) rgb(249, 249, 249);
  scrollbar-width: thin;
}
</style>