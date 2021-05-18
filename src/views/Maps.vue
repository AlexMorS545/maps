<template>
  <div class="wrap">
    <div class="city-wrp">
      <router-link v-for="city of allCities.region" :key="city.id" :to="'/'+city.id " @click.prevent="forceRender" class="links">{{city.title}}</router-link>
      <Cities />
    </div>
    <div class="map">
      <Map :key="key"/>
    </div>
  </div>
</template>

<script>
import Cities from '@/components/Cities'
import Map from '@/components/YandexMap'
import {mapActions, mapGetters} from 'vuex'
export default {
  data: () => ({
    key: 0
  }),
  name: 'Maps',
  components: {Cities, Map},
  computed: mapGetters(['allCities']),
  methods: {
    ...mapActions(['getCities']),
    forceRender() {
      this.key +=1
      console.log(this.key)
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
.links {
  text-decoration: none;
  margin: 15px 30px;
  // &:last-of-type {
  //   margin-right: 0;
  // }
}
</style>