<script setup >
import { ref, onMounted } from "vue";
import SelectButton from "primevue/selectbutton";
import Chart from "primevue/chart";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
const period = ref("По годам");
const options = ref(["По годам", "По месяцам"]);
const icons = ref([
  { icon: "minus", value: "Minus" },
  { icon: "caret-down", value: "Down" },
]);
const data = ref([
  {
    name: "Фактическое значение",
    color: "rgba(255, 255, 255, 1.0)",
    2015: 18,
    2016: 19,
    2017: 18,
    2018: 32,
    2019: 31,
    2020: 24,
    2021: "-",
  },
  {
    name: "Плановое значение",
    color: "rgba(132, 136, 184, 1.0)",
    2015: "-",
    2016: "-",
    2017: "-",
    2018: "-",
    2019: "-",
    2020: "-",
    2021: 21,
  },
  {
    name: "Зона внимания",
    color: "rgba(245, 192, 78, 0.5)",
    2015: 10,
    2016: 10,
    2017: 10,
    2018: 15,
    2019: 30,
    2020: 30,
    2021: 30,
  },
  {
    name: "Критическая зона",
    color: "rgba(247, 21,32, 0.5)",
    2015: 5,
    2016: 5,
    2017: 5,
    2018: 10,
    2019: 15,
    2020: 15,
    2021: 15,
  },
]);
const data2 = ref([
  {
    indicator: "Численность на начало года",
    fact: "2533670,00",
    plan: "3465391,60",
  },
  { indicator: "Число родившихся в году", fact: "19178,00", plan: "33807,00" },
  { indicator: "Число умерших в году", fact: "54252,00", plan: "29160,60" },
  {
    indicator:
      "Число прибывших на данную территорию (в данный субъект Российской Федерации) в году",
    fact: "68223,00",
    plan: "85184,00",
  },
  {
    indicator:
      "Число выбывших с данной территории (из данного субъекта Российской Федерации) в году",
    fact: "58558,00",
    plan: "50858,00",
  },
  {
    indicator:
      "Изменение численности населения территории в результате изменения ее границ в году",
    fact: "0,00",
    plan: "0,00",
  },
]);
const labels = Object.keys(data.value[0]).filter(
  (e) => e !== "name" && e !== "color"
);
const names = data.value.map((e) => e.name);
const colors = data.value.map((e) => e.color);
const dataset = JSON.parse(JSON.stringify(data.value));
for (let i in dataset) {
  delete dataset[i]["name"];
  delete dataset[i]["color"];
}

// индексы [0], [1]  и пр сделаны чтобы не загружать короткую отрисовку лишней логикой
// в реальном проекте я бы использовала indexOf чтобы оперировать конкретными ключами, а не индексами
const fact = Object.values(dataset[0]);
const plan = Object.values(dataset[1]);
const zone = Object.values(dataset[2]);
const critical = Object.values(dataset[3]);
onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});
const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  return {
    labels: labels,
    datasets: [
      {
        label: names[0],
        data: fact,
        borderWidth: 1,
        pointRadius: 2,
        color: colors[0],
        borderColor: colors[0],
        borderDash: [5, 5],
        backgroundColor: colors[0],
      },
      {
        label: names[1],
        data: plan,
        borderWidth: 1,
        pointRadius: 2,
        borderColor: ["rgba(132, 136, 184, 1.0)"],
        backgroundColor: ["rgba(132, 136, 184, 1.0)"],
      },
      {
        label: names[2],
        data: zone,
        fill: true,
        fillOpacity: 0.3,
        borderWidth: 1,
        pointRadius: 0,
        borderColor: colors[2],
        backgroundColor: colors[2],
      },
      {
        label: names[3],
        data: critical,
        fill: true,
        borderWidth: 1,
        pointRadius: 0,
        fillOpacity: 1,
        color: colors[3],
        borderColor: colors[3],
        backgroundColor: colors[3],
      },
    ],
  };
};
const setChartOptions = () => {
  return {
    aspectRatio: 4,
    plugins: {
      legend: {
        align: "start",
        labels: {
          boxWidth: 6,
          boxHeight: 6,
          usePointStyle: true,
          font: {
            size: 8,
          },

          generateLabels: (chart) => {
            return chart.data.datasets.map((dataset, index) => ({
              text: dataset.label,
              fillStyle: dataset.backgroundColor,
              strokeStyle: dataset.borderColor,
              fontColor: dataset.borderColor,
            }));
          },
        },
      },
    },
  };
};
const compareValues = (val1, val2) => {
  //упрощенная логика для демо-отрисовки. В реальности на картинке я заметила,
  //  что для "хороших" и "плохих" показателей операторы "больше" и "меньше" меняются местами
  return val1 > val2 ? "green" : val1 == val2 ? "white" : "red";
};
</script>

<template>
  <div class="select-buttons flex justify-content-start">
    <SelectButton v-model="period" :options="options" aria-labelledby="basic" />
    <SelectButton :options="icons" aria-labelledby="custom">
      <template #option="slotOptions">
        <span class="action-icons"
          ><font-awesome-icon :icon="slotOptions.option.icon" />
          <i :class="slotOptions.option.icon"></i
        ></span>
      </template>
    </SelectButton>
  </div>
  <div class="data-view">
    <div class="data-view-row flex">
      <Chart type="line" :data="chartData" :options="chartOptions" />
      <DataTable :value="data2">
        <Column field="indicator" header="Индикаторы"></Column>
        <Column field="fact" header="Факт, 2023">
          <template #body="slotProps">
            <span
              :style="{
                color: compareValues(slotProps.data.plan, slotProps.data.fact),
              }"
            >
              {{ slotProps.data.fact }}</span
            >
          </template>
        </Column>
        <Column field="plan" header="План, 2023"></Column>
      </DataTable>
    </div>
    <div class="table-row">
      <DataTable :value="data">
        <Column field="name" header="Значение">
          <template #body="slotProps">
            <span :style="{ color: slotProps.data.color }">{{
              slotProps.data.name
            }}</span></template
          >
        </Column>
        <Column field="2015" header="2015"></Column>
        <Column field="2016" header="2016"></Column>
        <Column field="2017" header="2017"></Column>
        <Column field="2018" header="2018"></Column>
        <Column field="2019" header="2019"></Column>
        <Column field="2020" header="2020"></Column>
        <Column field="2021" header="2021"></Column>
      </DataTable>
    </div>
  </div>
</template>
