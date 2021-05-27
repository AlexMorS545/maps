<template>
  <div class="wrap">
    <div class="city-wrp">
      <Navbar @click="forceRender" />
      <Cities />
    </div>
    <div class="map">
      <Map :key="key" />
    </div>
  </div>
</template>

<script>
import Cities from '@/components/Cities'
import Map from '@/components/YandexMap'
import Navbar from '@/components/Navbar'
import {mapActions, mapGetters} from 'vuex'

export default {
  data: () => ({
    key: 0
  }),
  name: 'Maps',
  components: {Cities, Map, Navbar},
  computed: {
    ...mapGetters(['allCities'])
  },
  methods: {
    ...mapActions(['getCities']),
    forceRender() {
      this.key +=1
    }
  },
  mounted() {
    this.getCities
  }
}
</script>
<style lang="less" scoped>
.wrap {
  display: flex;
}
.city-wrp {
  background-color: #FAFAFA;
}
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
    border: 1px solid #ff9e00;
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