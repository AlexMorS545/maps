<template>
  <div id="map"></div>
</template>
<script>
import { loadYmap } from 'vue-yandex-maps'
import {mapActions, mapGetters} from 'vuex'

const settings = {
  apiKey: '6025a482-aac7-49c7-92f3-80a120e27659',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1'
}

export default {
  name: 'Map',
  computed: {
    ...mapGetters(['allCities']),
    location() {
      return this.$store.getters.updateLocation(+this.$route.params.id)
    },
    setSettings() {
      return this.$store.getters.getSettings(+this.$route.params.id)
    }
  },
  methods: {
    ...mapActions(['getCities']),
    initYandexMap() {
      let Map = new ymaps.Map("map", {...this.setSettings}, {searchControlProvider: 'yandex#search'})
      
      let objectManager = new ymaps.ObjectManager({
        clusterize: true,
        gridSize: 32,
        clusterDisableClickZoom: true
      })
    
      objectManager.add(this.location)
      Map.geoObjects.add(objectManager)
      // let myGeoObject = new ymaps.GeoObject({
      //   geometry: {
      //     type: "Point",
      //     coordinates: [56.8519000, 60.6122000]
      //   },
      //   options: {
      //   fill: true,
      //   fillcolor: "#1e355d"
      //   },
      //   properties: {
      //     balloonContent: '<p>Hello</p>'
      //   }
      // })
      // Map.geoObjects.add(myGeoObject)
    }
  },
  async mounted() {
    this.getCities()
    await loadYmap({ ...settings, debug: true })
    ymaps.ready(this.initYandexMap)
  }
    
}
// this.$store.getters.getSettings(+this.$route.params.id)
</script>
<style lang="less" scoped>
.map-wrap {
  width: 100%;
}
#map {
  display: block;
  width: 100%;
  height: 100%;
}
</style>