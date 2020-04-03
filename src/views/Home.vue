<template>
  <div class="home">
    <div v-if="!mostrar">
      <Loading />
    </div>

    <b-container class="mt-3" v-if="mostrar">
      <b-row>
        <b-col>
          <b-card>
            <h3>Confirmados</h3>
            <h2 class="confirmed">{{ confirmados.length }}</h2>
          </b-card>

          <b-alert class="mt-1" variant="success" show>No Caso | Estado | Procedencia</b-alert>

          <b-list-group>
            <b-list-group-item
              v-for="task in confirmados"
              :key="task.ent"
            >{{ task.nCaso }} | {{ task.estado }} | {{ task.procedencia}}</b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col>
          <b-card>
            <h3>Sospechosos</h3>
            <h2 class="suspect">{{ sospechosos.length }}</h2>
          </b-card>

          <b-alert class="mt-1" variant="primary" show>No Caso | Estado | Procedencia</b-alert>

          <b-list-group>
            <b-list-group-item
              v-for="task in sospechosos"
              :key="task.ent"
            >{{ task.nCaso }} | {{ task.estado }} | {{ task.procedencia}}</b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col>
          <b-card>
            <h3>Muertos</h3>
            <h2 class="death">{{ muertos.length }}</h2>
          </b-card>

          <b-alert class="mt-1" variant="danger" show>Estado | Fallecidos</b-alert>

          <b-list-group>
            <b-list-group-item
              v-for="task in muertos"
              :key="task.ent"
            >{{ task.Estado }} | {{ task.Fallecidos }}</b-list-group-item>
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
  name: "Home",
  components: {
    Loading
  },
  data() {
    return {
      confirmados: [],
      sospechosos: [],
      muertos: [],
      mostrar: false,
      data: ""
    };
  },
  created() {},
  mounted() {
    this.getConfirmados();
    this.getSospechosos();
    this.getMuertos();
  },
  methods: {
    async peticion(gql) {
      try {
        let response = await axios({
          method: "POST",
          url: "https://covid-graphql12.herokuapp.com/graphql",
          data: {
            query: gql
          }
        });
        return response;
      } catch (error) {
        return error;
      }
    },
    async getConfirmados() {
      const query = `
           {
            confirmados {
              nCaso
              estado
              sexo
              edad
              procedencia
            }
          }
          `;
      const { data } = await this.peticion(query);
      this.confirmados = data.data.confirmados;
    },
    async getSospechosos() {
      const query = `
           {
            sospechosos {
              nCaso
              estado
              sexo
              edad
              procedencia
            }
          }
          `;
      const { data } = await this.peticion(query);
      this.sospechosos = data.data.sospechosos;
      this.mostrar = true;
    },
    async getMuertos() {
      const query = `
           {
            muertos {
              Estado
              Fallecidos
            }
          }
          `;
      const { data } = await this.peticion(query);
      this.muertos = data.data.muertos;
    }
  }
};
</script>
<style>
.suspect {
  color: blue;
}

.confirmed {
  color: green;
}

.death {
  color: red;
}
</style>
