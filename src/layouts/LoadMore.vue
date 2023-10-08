<template>
  <div ref="triggerEl" id="trigger" :class="{ 'd-none': isLoading || !canLoadMore }"></div>
  <div class="spinner-grow spinner-grow-sm m-3" :class="{ 'd-none': isLoading || !canLoadMore }" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  loadMoreHandler: { type: Function, required: true },
  canLoadMore: Boolean
});

const triggerEl = ref(null);
const isLoading = ref(false);

onMounted(createObserver);

function createObserver() {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0 // Use 100% thresholds value as the element height is very small
  };

  /*
   Exploit here API IntersectionObserver for infinite scroll 
   https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
   */
  const observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(triggerEl.value);
}

function handleIntersect(entries, _) {
  entries.forEach(async ({ isIntersecting }) => {
    if (isIntersecting && props.canLoadMore) {
      isLoading.value = true;
      await props.loadMoreHandler();
      isLoading.value = false;
    }
  });
}
</script>

<style scoped>
#trigger {
  height: 2px;
  width: 100%;
}
</style>
