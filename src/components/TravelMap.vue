<template>
  <GoogleMapLoader
    :mapConfig="mapConfig"
    apiKey="AIzaSyBmV8I1mjdduDK0gsbRMq-ObtR207URdBo"
  >
  // insert your google maps api key to render styled map
    <!-- <template slot-scope="{ google, map }">
      <GoogleMapMarker
        v-for="marker in markers"
        :key="marker.id"
        :marker="marker"
        :google="google"
        :map="map"
      />
    </template> -->
  </GoogleMapLoader>
</template>

<script>
import GoogleMapLoader from "./GoogleMapLoader";
// import GoogleMapMarker from "./GoogleMapMarker";
// import GoogleMapLine from "./GoogleMapLine";


export default {
  components: {
    GoogleMapLoader,
    // GoogleMapMarker
  },

  data() {
    return {
      markers: [
        {
          id: "a",
          position: { lat: 3, lng: 101 }
        },
        {
          id: "b",
          position: { lat: 5, lng: 99 }
        },
        {
          id: "c",
          position: { lat: 6, lng: 97 }
        }
      ],
      lines: [
        {
          id: "1",
          path: [{ lat: 3, lng: 101 }, { lat: 5, lng: 99 }]
        },
        {
          id: "2",
          path: [{ lat: 5, lng: 99 }, { lat: 6, lng: 97 }]
        }
      ]
    };
  },

  computed: {
    mapConfig() {
      return {
        center: {
          lat: 23.6345005,
          lng: -102.5527878
        },
        zoom: 5
      };
    },

    mapCenter() {
      return this.markers[1].position;
    }
  }
};
</script>
