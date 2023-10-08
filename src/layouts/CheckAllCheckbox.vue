<template>
  <input 
    type="checkbox"
    class="m-2 fw-bold" 
    v-model="allSelected" 
    @change="selectAll" 
    id="selectAll"
  />
  <label class="fw-bold" for="selectAll">Select all</label>
</template>

<script setup>
import { ref } from "vue";

const allSelected = ref(false);
const checkedArray = ref([]);

const props = defineProps({
  arrayCheckboxData: Array,
});

const emit = defineEmits(["emitCheckedAllCheckbox"]);

const selectAll = () => {
  if (allSelected.value) {
    const listAllCheckbox = props.arrayCheckboxData.map(
      (itemArray) => itemArray.id
    );
    checkedArray.value = listAllCheckbox;
  } else {
    checkedArray.value = [];
  }
  emit("emitCheckedAllCheckbox", checkedArray.value);
};
</script>