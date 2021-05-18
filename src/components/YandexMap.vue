<template>
  <div class="map-wrap">
    <div id="map"></div>
  </div>
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
  data: () => ({
    settings: {
      zoom: 4,
      center: [
        56.8519000,
        60.6122000,
      ]
    }
  }),
  computed: {
    ...mapGetters(['allCities', 'updateLocation', 'getLocations']),
    location() {
      return this.$store.getters.updateLocation(+this.$route.params.id)
    },
  },
  methods: {
    ...mapActions(['getCities']),
    
    initYandexMap() {
      let Map = new ymaps.Map("map", {...this.settings}, {searchControlProvider: 'yandex#search'})
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
    await loadYmap({ ...settings, debug: true });
    ymaps.ready(this.initYandexMap)
  }
    
}
</script>
<style lang="less" scoped>

#map {
  width: 70vw;
  height: 100vh;
}
</style>