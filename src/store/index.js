import { createStore } from 'vuex'
import data from '../json/cities.json'

const obj = {
  "type": "FeatureCollection",
  "features": []
}

export default createStore({
  state: {
    cities: [],
  },
  actions: {
    async getCities(ctx) {
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
    getRussiaLocation: state => {
      state.cities.region.forEach(r => {
        if(r.id === 1) {
          r.cities.forEach(office => {
            office.offices.forEach(o => {
              obj.features.push(o.place)
            })
          })
        }
      })
      return obj
    },
    getLocations: state => {
      state.cities.region.forEach(r => {
        if(r.id === 2) {
          r.cities.forEach(office => {
            office.offices.forEach(o => {
              obj.features.push(o.place)
            })
          })
        }
        console.log(r)
      })
      return obj
    },
    getBelarusLocation: state => {
      state.cities.region.forEach(r => {
        if(r.id === 2) {
          r.cities.forEach(office => {
            office.offices.forEach(o => {
              obj.features.push(o.place)
            })
          })
        }
      })
      return obj
    }
  },
  modules: {
  }
})
