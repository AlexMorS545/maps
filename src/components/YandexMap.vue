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
    Cities: []
  }),
  name: 'Map',
  computed: {
    ...mapGetters(['allCities']),
    setSettings() {
      return this.$store.getters.getSettings(this.$route.params.title)
    },
    getCoordinates() {
      return this.$store.getters.getOffices(this.$route.params.title)
    }
  },
  methods: {
    ...mapActions(['getCities']),
    renderCities(office) {
      return `<div class="office">
								<span class="office__office">Офис&nbsp;<span class="office__title">${office.title}</span></span>
								<span class="office__name">${office.name}</span>
								<div class="phone">
									<a class="phone__links" href="tel:${office.phone1}">${office.phone1}</a>
									<a class="phone__links" href="tel:${office.phone2}">${office.phone2}</a>
								</div>
								<a class="office__email" href="mailto:${office.email}">${office.email}</a>
							</div>`
    },
    initYandexMap() {
      let Map = new ymaps.Map("map", {...this.setSettings}, {searchControlProvider: 'yandex#search'})

			let Placemarks = []

      this.Cities.forEach(city => {
        city.offices.forEach(office => {
					Placemarks.push(new ymaps.Placemark(office.coordinates, {
						balloonContentBody: this.renderCities(office),
					}))
        })
      })

			let customItemContentLayout = ymaps.templateLayoutFactory.createClass(
				'<div class="ballon">'+
					'{% for geoObject in properties.geoObjects %}'+
						'<div class=ballon_body>{{ geoObject.properties.balloonContentBody|raw }}</div>'+
					'{% endfor %}'+
				'</div>'
    	);

      let Clusterer = new ymaps.Clusterer({
        preset: 'islands#invertedBlueClusterIcons',
        clusterIconColor: '#1e355d',
        clusterDisableClickZoom: true,
				clusterBalloonContentLayout: customItemContentLayout,
        hideIconOnBalloonOpen: false
      });
      Clusterer.add(Placemarks);

      Map.geoObjects.add(Clusterer)
    }
  },
  async mounted() {
    this.getCities()
    await loadYmap({ ...settings, debug: true })
    ymaps.ready(this.initYandexMap)
    this.getCoordinates.forEach(city => this.Cities.push(city))
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
<style lang="less">
.ballon {
	background-color: #1e355d;
	color: #fff;
	width: 100%;
	height: 100%;
	padding: 10px 30px;
	&_header {
		font-size: 16px;
		margin-top: 0;
		margin-bottom: 10px;
	}
	&_body {
		font-size: 14px;
		text-align: center;
	}
	&_footer {
		font-size: 12px;
		margin-top: 10px;
	}
}
.office {
	display: flex;
	flex-direction: column;
	margin-top: 20px;
	&__office {
		color: #ff9e00;
		font-weight: bold;
		margin-bottom: 20px;
		text-align: start;
	}
	&__name {
		text-align: start;
		margin-bottom: 15px;
	}
	&__email {
		text-align: start;
		text-decoration: none;
		color: #32b3e9;
		font-size: 16px;
	}
}
.phone {
	margin-bottom: 20px;
	display: flex;
	flex-direction: row;
	justify-content: start;
	&__links {
		display: block;
		text-decoration: none;
		color: #fff;
		margin-right: 20px;
		&:last-of-type {
			margin-right: 0;
		}
	}
}
</style>