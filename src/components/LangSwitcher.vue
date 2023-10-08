<script setup>
import i18n from "@/locales/i18n.js";
</script>

<template>
  <div>
    <select class="form-select" v-model="$i18n.locale">
      <option
        v-for="locale in $i18n.availableLocales"
        :key="`locale-${locale}`"
        :value="locale"
      >
        {{ locale }}
      </option>
    </select>
  </div>
</template>
