<template>
  <div>
    <TravelMap class="travel-map"/>
  </div>
</template>

<script>
import TravelMap from "../components/TravelMap";

export default {
  name: "App",
  components: {
    TravelMap
  }
};
</script>

<style lang="scss" scoped>
.travel-map {
  margin: 0 auto;
  height: 90vh;
  width: 90vw;
}
</style>