<template>
  <div>
    <div class="google-map" ref="googleMap"></div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot :google="google" :map="map" />
    </template>
  </div>
</template>

<script>
import axios from "axios";
import GoogleMapsApiLoader from "google-maps-api-loader";

export default {
  props: {
    mapConfig: Object,
    apiKey: String
  },

  data() {
    return {
      data: [],
      google: null,
      map: null,
      popup: ""
    };
  },

  // Consumir la api
  created() {
    this.renderData();
  },

  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey
    });
    this.google = googleMapApi;
    this.initializeMap();
    this.popup = new window.google.maps.InfoWindow();
  },

  methods: {
    initializeMap() {
      const mapContainer = this.$refs.googleMap;
      this.map = new this.google.maps.Map(mapContainer, this.mapConfig);
    },
    async getData() {
      const response = axios.get(
        "https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest"
      );
      const { data } = await response;
      // console.log(data);
      return data;
    },

    dataInfo({ confirmed, deaths, recovered, provincestate, countryregion }) {
      return `
          <div>
            <p> <strong> ${provincestate} - ${countryregion} </strong> </p>
            <p> Confirmados: ${confirmed} </p>
            <p> Muertes: ${deaths} </p>
            <p> Recuperados: ${recovered} </p>
          </div>
          `;
    },

    async renderData() {
      const data = await this.getData();
      const map = this.map;
      const popup = this.popup;

      data.forEach(item => {
        if (item.confirmed > 0) {
          // eslint-disable-next-line no-unused-vars
          const marker = new this.google.maps.Marker({
            position: {
              lat: item.location.lat,
              lng: item.location.lng
            },
            map
          });

          marker.addListener("click", () => {
            popup.setContent(this.dataInfo(item));
            popup.open(map, marker);
          });
        }
      });
    }
  }
};
</script>

<style scoped>
body {
  margin: 0;
}

.google-map {
  width: 100%;
  min-height: 100%;
}
</style>
