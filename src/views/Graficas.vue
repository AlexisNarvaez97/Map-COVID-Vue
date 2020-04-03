<template>
  <div>
    <div v-if="!mostrar">
      <Loading />
    </div>
    <b-container class="mt-3" v-if="mostrar">
      <b-row>
        <b-col>
          <b-card>
            <h3>Muertos</h3>
            <h2 class="death">{{ deaths }}</h2>
          </b-card>

          <b-alert class="mt-1" variant="danger" show>Casos | Pais | Provincia</b-alert>

          <b-list-group class="mt-2">
            <b-list-group-item
              v-for="task in covid"
              :key="task.ent"
            >{{ task.deaths }} | {{ task.countryregion }} | {{ task.provincestate}}</b-list-group-item>
          </b-list-group>
        </b-col>

        <b-col>
          <b-card>
            <h3>Confirmados</h3>
            <h2 class="suspect">{{ confirmeds }}</h2>
          </b-card>

          <b-alert class="mt-1" variant="primary" show>Casos | Pais | Provincia</b-alert>

          <b-list-group class="mt-2">
            <b-list-group-item
              v-for="task in covid"
              :key="task.ent"
            >{{ task.confirmed }} | {{ task.countryregion }} | {{ task.provincestate}}</b-list-group-item>
          </b-list-group>
        </b-col>

        <b-col>
          <b-card>
            <h3>Recuperados</h3>
            <h2 class="confirmed">{{ recovered }}</h2>
          </b-card>

          <b-alert class="mt-1" variant="success" show>Casos | Pais | Provincia</b-alert>

          <b-list-group class="mt-2">
            <b-list-group-item
              v-for="task in covid"
              :key="task.ent"
            >{{ task.recovered }} | {{ task.countryregion }} | {{ task.provincestate}}</b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "../components/Loading";

export default {
  components: {
    Loading
  },
  data() {
    return {
      covid: [],
      mostrar: false,
      deaths: 0,
      confirmeds: 0,
      recovered: 0
    };
  },
  created() {
    this.getData();
  },

  async mounted() {
    this.allConfirmed();
    this.allDeaths();
    this.allRecovered();
  },
  methods: {
    async getData() {
      const response = axios.get(
        "https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest"
      );
      const { data } = await response;
      let array = [];
      data.forEach(item => {
        if (item.confirmed && item.deaths && item.recovered > 0) {
          array.push(item);
        }
      });
      this.covid = array;
      this.mostrar = true;
      return data;
    },
    reduce(array) {
      const resultado = array.reduce(function(a, b) {
        return a + b;
      });
      return resultado;
    },
    async allConfirmed() {
      const data = await this.getData();
      console.log(data);
      let confirmeds = [];
      data.forEach(item => {
        if (Number(item.confirmed)) {
          confirmeds.push(item.confirmed);
        }
      });
      const total = this.reduce(confirmeds);
      this.confirmeds = total;
      console.log("Confirmeds", total);
    },
    async allDeaths() {
      const data = await this.getData();
      let deaths = [];
      data.forEach(item => {
        if (Number(item.deaths)) {
          deaths.push(item.deaths);
        }
      });
      const total = this.reduce(deaths);
      this.deaths = total;
      console.log("Deaths", total);
    },
    async allRecovered() {
      const data = await this.getData();
      let recovereds = [];
      data.forEach(item => {
        if (Number(item.recovered)) {
          recovereds.push(item.recovered);
        }
      });
      const total = this.reduce(recovereds);
      this.recovered = total;
      console.log("Recovereds", total);
    }
  }
};
</script>
<style>
.list-group {
  max-height: 405px;
  margin-bottom: 10px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>