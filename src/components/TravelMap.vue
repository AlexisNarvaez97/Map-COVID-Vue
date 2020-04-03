<template>
  <GoogleMapLoader
    :mapConfig="mapConfig"
    apiKey="AIzaSyBmV8I1mjdduDK0gsbRMq-ObtR207URdBo"
  >
  </GoogleMapLoader>
</template>

<script>
import GoogleMapLoader from "./GoogleMapLoader";


export default {
  components: {
    GoogleMapLoader
  },

  data() {
    return {
      markers: [
      ]
    };
  },

  computed: {
    mapConfig() {
      return {
        center: {
          lat: 0,
          lng: 0
        },
        zoom: 2
      };
    }
  }
};
</script>
