import { createStore } from 'vuex'
import data from '../json/cities.json'

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
    getSettings: state => title => {
      let setCoords = {}
      if(!title) {
        setCoords = state.cities.settings
      } else {
        state.cities.region.find(r => {
          if(r.title === title) {
            setCoords = r.settings
          }
        })
      }
      return setCoords
    },
    getOffices: state => title => {
      let mapOffice = []
      if(state.cities.region) {
        state.cities.region.find(r => {
          if(r.title === title) {
            r.cities.forEach(city => {
              mapOffice.push(city)
            })
          }
        })
      }
      return mapOffice
    }
  },
  modules: {
  }
})