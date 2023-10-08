<template>
  <div id="citizen-popup" v-if="api" @click="closeThisModal()">
    <div class="backdrop"></div>
    <div class="content">
      <h5 class="text-capitalize text-break">
        <i class="bi bi-person-fill"></i>
        {{ api.firstname }} {{ api.lastname }} ({{ api.birthdate }})
        <i class="bi bi-x-lg text-end" @click="closeThisModal()"></i>
      </h5>

      <hr />

      <div v-for="item in api.contacts" :key="item.id">
        <h6>Contacts</h6>
        <div class="d-flex">
          <i class="bi bi-house-fill mx-3"></i>
          <p>{{ item.address }} {{ item.city }} {{ item.zip }}</p>
        </div>
        <div class="d-flex">
          <i class="bi bi-telephone-fill mx-3"></i>
          <p>{{ item.mobile }}/{{ item.phone }}</p>
        </div>
        <div class="d-flex">
          <p class="mx-3">@</p>
          <p>{{ item.email }}</p>
        </div>
        <div class="d-flex">
          <i class="bi bi-building mx-3"></i>
          <p>{{ item.organization?.name }} / Position : {{ item.position }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import client from '@/interceptors/client';
import { ref, watch, onMounted } from 'vue';

const error = ref();
const api = ref();

const props = defineProps({
  id: Number
});

const emit = defineEmits(['emitClosed']);

watch(
  () => props.id,
  () => {
    getCitizenById();
  }
);

const getCitizenById = () => {
  client
    .get(`citizens/${props.id}`)
    .then(res => {
      api.value = res.data.data;
    })
    .catch(err => {
      error.value = err.response.data.message;
    });
};

const closeThisModal = () => {
  api.value = false;
  emit('emitClosed');
};

onMounted(() => {
  getCitizenById();
});
</script>

<style scoped>
#citizen-popup {
  background: transparent;
  position: fixed;
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

#citizen-popup .content {
  overflow: hidden;
  overflow-y: scroll;
  border: 2px solid #bababa;
  background-color: #fff;
  padding: 1%;
  border-radius: 5px;
  width: 50%;
  height: 50%;
  z-index: 2;
}

#citizen-popup .backdrop {
  z-index: 1;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
