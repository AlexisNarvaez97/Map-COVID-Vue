<template>
  <div id="app">
    <div id="nav">
      <router-link to="/mapa">Mapa Google</router-link> |
      <router-link to="/">Datos nacionales</router-link> |
      <router-link to="/graficas">Datos internacionales</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 5px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: red;
    }
  }
}
</style>
