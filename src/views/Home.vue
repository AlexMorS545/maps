<template>
  <div class="wrap">
    <div class="city-wrp">
      <Navbar />
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
  name: 'Home',
  components: {Cities, Map, Navbar},
  computed: mapGetters(['allCities']),
  methods: mapActions(['getCities']),
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
.map {
  width: 100%;
  height: 100vh;
}
</style>