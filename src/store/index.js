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
    }
  },
  getters: {
    allCities: state => state.cities,
    updateLocation: state => id => {
      state.cities.region.find(r => {
        if(r.id === id) {
          obj.features = []
          r.cities.forEach(office => {
            office.offices.forEach(o => {
              obj.features.push(o.place)
            })
          })
        }
      })
      return obj
    },
    getSettings: state => id => {
      let setCoords = {}
      if(!id) {
        setCoords = state.cities.settings
      } else {
        state.cities.region.find(r => {
          if(r.id === id) {
            setCoords = r.settings
          }
        })
      }
      return setCoords
    }
  },
  modules: {
  }
})