<template>
  <OneColumn>
    <template v-slot:col1>
  
      <p class="display-6 mb-4">Storing</p>
      <SubTitle title="SEARCH"/>

      <div class="row">
        <div class="col">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label fw-bold">
              Name
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder=""
            />
          </div>
        </div>
        <div class="col">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label fw-bold">
              First Name
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder=""
            />
          </div>
        </div>
        <div class="col">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label fw-bold">
              Date
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder=""
            />
          </div>
        </div>
      </div>
    
      <div class="row">
        <div class="col-1">
          <button type="button" class="btn btn-primary">Filter</button>
        </div>
        <div class="col-1">
          <button type="button" class="btn btn-primary">Export</button>
        </div>
      </div>

      <SubTitle title="RESULT" />

      <table class="table mt-4">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">LastName</th>
            <th scope="col">Organisme</th>
            <th scope="col">City</th>
            <th scope="col">Start date</th>
            <th scope="col">End date</th>
            <th scope="col">Service</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>Habitat +</td>
            <td>Tours</td>
            <td>01-06-2022</td>
            <td>29-06-2022</td>
            <td>LOGEMENT</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jean</td>
            <td>ARC</td>
            <td>EDF</td>
            <td>Tours</td>
            <td>01-06-2022</td>
            <td>29-06-2022</td>
            <td>URBANISME</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Dadiv</td>
            <td>DOUILLET</td>
            <td>JUDO ASSO CLUB</td>
            <td>Liles</td>
            <td>01-06-2022</td>
            <td>29-06-2022</td>
            <td>SPORT</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Harry</td>
            <td>Poter</td>
            <td>Club Magie enfant</td>
            <td>Marseille</td>
            <td>11-06-2022</td>
            <td>17-06-2022</td>
            <td>CULTURE</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Kylian</td>
            <td>BUTTEUR</td>
            <td>PSG</td>
            <td>Paris</td>
            <td>01-02-2022</td>
            <td>22-04-2022</td>
            <td>SPORT</td>
          </tr>
        </tbody>
      </table>


    </template>
  </OneColumn>
</template>

<script setup>
import OneColumn from "@/layouts/OneColumn.vue";
import SubTitle from "@/layouts/SubTitle.vue";


</script>

<style>
</style>