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
  data: () => ({
    coordinates: []
  }),
  name: 'Map',
  computed: {
    ...mapGetters(['allCities']),
    location() {
      return this.$store.getters.getLocation(this.$route.params.title)
    },
    setSettings() {
      return this.$store.getters.getSettings(this.$route.params.title)
    },
    getCoordinates() {
      return this.$store.getters.getOffices(this.$route.params.title)
    }
  },
  methods: {
    ...mapActions(['getCities']),
    initYandexMap() {
      let Map = new ymaps.Map("map", {...this.setSettings}, {searchControlProvider: 'yandex#search'})

      let countryCities = new ymaps.GeoObjectCollection(null, {
        preset: 'islands#circleIcon',
        iconColor: '#1e355d',
        hideIconOnBalloonOpen: false
      })
      
      let countryCoords = this.coordinates

      for (var i = 0, l = countryCoords.length; i < l; i++) {
        countryCities.add(new ymaps.Placemark(countryCoords[i],
        {
          balloonContent: `<p>Hello</p>`
        }))
      } 
      Map.geoObjects.add(countryCities)
    }
  },
  async mounted() {
    this.getCities()
    await loadYmap({ ...settings, debug: true })
    ymaps.ready(this.initYandexMap)
    this.coordinates.push(this.setCoords)
    this.getCoordinates.forEach(city => city.offices.forEach(c => this.coordinates.push(c.coordinates)))
  }
}
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