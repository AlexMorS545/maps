<template>
  <div class="map-wrap">
    <div id="map"></div>
  </div>
</template>
<script>
export default {
  name: 'Map',
  data: () => ({
    coords: [
      56.8519000,
      60.6122000,
    ],
    settings: {
      zoom: 12
    }
  }),
  methods: {
    getCoordData() {
      return new Promise(r => setTimeout(() => {
        this.coords
        r()
      }, 1000));
    },
    initializeYandexMap() {
      ymaps.ready(() => {
        this.map = new ymaps.Map("map", {
          center: this.coords,
          ...this.settings
        });
      });
    }
  },
  mounted() {
    let scriptYandexMap = document.createElement('script');
    scriptYandexMap.setAttribute('src', 'https://api-maps.yandex.ru/2.1/?lang=ru_RU');
    document.head.appendChild(scriptYandexMap);
    scriptYandexMap.addEventListener("load", this.initializeYandexMap);
  }
}
</script>
<style lang="less" scoped>
.map-wrap {

}
#map {
  width: 70vw;
  height: 100vh;
  background: blue;
}
</style>