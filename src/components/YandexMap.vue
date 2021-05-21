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
      return this.$store.getters.updateLocation(this.$route.params.title)
    },
    setSettings() {
      return this.$store.getters.getSettings(this.$route.params.title)
    }
  },
  methods: {
    ...mapActions(['getCities']),
    initYandexMap() {
      let Map = new ymaps.Map("map", {...this.setSettings}, {searchControlProvider: 'yandex#search'})
      
      let objectManager = new ymaps.ObjectManager({
        clusterize: true,
        clusterDisableClickZoom: true,
        hideIconOnBalloonOpen: false,
        geometry: {
          type: 'Point'
        },
        options: {
          iconColor: '#1e355d'
        }
      })

      // let marker = ymaps.templateLayoutFactory.createClass('<div class="placemark_layout_container"><div class="circle_layout"></div></div>');
      // let markerPlace = new ymaps.Placemark();
    
      objectManager.add(this.location)
      Map.geoObjects.add(objectManager) //.add(markerPlace)
    }
  },
  async mounted() {
    this.getCities()
    await loadYmap({ ...settings, debug: true })
    ymaps.ready(this.initYandexMap)
  }
}
</script>
<style lang="less" scoped>
.placemark_layout_container {
  position: relative;
  font-size: 40px;
  text-align: center;
  font-weight: bold;
}
.circle_layout {
  background-color: rgb(250, 100, 100);
  position: absolute;
  left: -23px;
  top: -23px;
  width: 46px;
  height: 46px;
  border: 2px solid #225D9C;
  color: #225D9C;
  line-height: 46px;
  border-radius: 50px;
}
.map-wrap {
  width: 100%;
}
#map {
  display: block;
  width: 100%;
  height: 100%;
}
</style>