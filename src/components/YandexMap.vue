<template>
  <div class="map-wrap">
    <div id="map"></div>
  </div>
</template>
<script>
import { loadYmap } from 'vue-yandex-maps'

const settings = {
  apiKey: '6025a482-aac7-49c7-92f3-80a120e27659',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1'
}

export default {
  name: 'Map',
  data: () => ({
    Map: null,
    settings: {
      center: [
        56.8519000,
        60.6122000,
      ],
      zoom: 5,
    }
  }),
  methods: {
    initYandexMap() {
      this.Map = new ymaps.Map("map", {...this.settings})
    }
  },
  async mounted() {
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