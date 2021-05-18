import { createStore } from 'vuex'
import data from '../json/cities.json'

const obj = {
  "type": "FeatureCollection",
  "features": []
}

export default createStore({
  state: {
    cities: []
  },
  actions: {
    getCities(ctx) {
      const cities = data
      ctx.commit('updateCities', cities)
    }
  },
  mutations: {
    updateCities: (state, cities) => {
      state.cities = cities
      console.log('cities: ', state.cities)
    }
  },
  getters: {
    allCities: state => state.cities,
    getLocations: state => {
      state.cities.region.forEach(r => {
        r.cities.forEach(office => {
          office.offices.forEach(o => {
            obj.features.push(o.place)
          })
        })
      })
      return obj
    },
    updateLocation: state => id => {
      state.cities.region.find(r => {
        if(r.id === id) {
          obj.features = []
          r.cities.forEach(office => {
            office.offices.forEach(o => {
              obj.features.push(o.place)
            })
          })
          console.log(r)
        }
      })
      console.log(obj)
      return obj
    }
  },
  modules: {
  }
})