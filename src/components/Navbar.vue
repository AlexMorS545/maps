<template>
  <nav class="links-wrp">
    <router-link v-for="city of allCities.region" :key="city.id" :to="'/'+ city.title " class="links">{{city.title}}</router-link>
  </nav>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'Navbar',
  computed: mapGetters(['allCities']),
  methods: mapActions(['getCities']),
  mounted() {
    this.getCities
  }
}
</script>
<style lang="less" scoped>
.links-wrp {
  display: flex;
}
.links {
  display: block;
  text-decoration: none;
  padding: 15px 70px;
  color: #929292;
  font-size: 11px;
  background-color: #ffffff;
  border: 1px solid #929292;
  transition: all .2s ease;
  &:hover {
    background-color: #ff9e00;
    color: #ffffff;
  }
  &.router-link-exact-active {
    background-color: #ff9e00;
    border: 1px solid #ff9e00;
    color: #ffffff;
  }
}
.map {
  width: 100%;
  height: 100vh;
}
</style>