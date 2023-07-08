

<script setup>
import { ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const data = ref([
  {
    status: "Ноябрь 2023",
    plan: "-27,7",
    fact: "-92,6",
    divergence: "-64,9(234%3%)",
  },
]);

const compareValues = (val1, val2) => {
  return val1 > val2 ? "green" : val1 == val2 ? "white" : "red";
};
</script>

<template>
  <div class="flex flex-row justify-content-between align-items-end">
    <div class="header-text">
      <div class="title-wrapper">
        <i class="pi pi-align-right"></i>
        <p class="title">Показатели эффективности губернатора Пермского края</p>
      </div>
      <div class="links-wrapper">
        <i class="pi pi-arrow-left"></i>
        <p class="header-link">
          <a class="active">Показатель</a><a>Все показатели</a
          ><a>Редактировать</a>
        </p>
      </div>
      <p>Численность населения Российской Федерации</p>
    </div>
    <div class="header-table">
      <DataTable :value="data">
        <Column field="status" header="Текущий статус">
          <template #body="slotProps">
            <span :style="{color: 'rgba(132, 136, 184, 1.0)'}"> {{ slotProps.data.status }}</span>
            <i class="pi pi-circle-fill"></i>
          </template>
        </Column>
        <Column field="plan" header="План"></Column>
        <Column field="fact" header="Факт"></Column>
        <Column field="divergence" header="Отклонение">
          <template #body="slotProps">
            <span
              :style="{
                color: compareValues(slotProps.data.plan, slotProps.data.fact),
              }"
              >{{ slotProps.data.divergence }}</span
            >
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>