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
    updateLocation: state => title => {
      state.cities.region.find(r => {
        if(r.title === title) {
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
      state.cities.region.find(r => {
        if(r.title === title) {
          r.cities.forEach(office => {
            mapOffice.push(office)
          })
        }
      })
      return mapOffice
    }
  },
  modules: {
  }
})