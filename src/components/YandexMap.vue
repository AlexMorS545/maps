<template>
  <yandex-map 
    :coords="coords"
    :zoom="10" 
    :settings="settings"
  >
    <ymap-marker 
      :coords="coords" 
      marker-id="123" 
      hint-content="some hint" 
    />
  </yandex-map>
</template>
<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'

export default {
  name: 'Map',
  data: () => ({
    coords: [
      54.82896654088406,
      39.831893822753904,
    ],
    settings: {
      apiKey: '6025a482-aac7-49c7-92f3-80a120e27659',
      lang: 'ru_RU',
      coordoder: 'latlong',
      version: '2.1'
    }
  }),
  components: {yandexMap, ymapMarker},
  methods: {
    onClick(e) {
      this.coords = e.get('coords');
    },
  }
}
</script>