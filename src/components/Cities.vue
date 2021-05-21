<template>
  <div class="cities-wrap">
    <ul class="city">
      <li class="city__links" v-for="office of getOffices" :key="office.id" @click="showOffice(office.id, $event)">
        <span class="city__title" :data-id="`${office.id}`">{{ office.name }}</span>
        <ul class="office">
          <li class="office__links" v-for="o of office.offices" :key="o.id">
            <span class="office__office">Офис&nbsp;<span class="office__title">{{o.title}}</span></span>
            <span class="office__name">{{o.name }}</span>
            <div class="phone">
              <a class="phone__links" :href="`tel:${o.phone1}`">{{ o.phone1 }}</a>
              <a class="phone__links" :href="`tel:${o.phone2}`">{{ o.phone2 }}</a>
            </div>
            <a class="office__email" :href="`mailto:${o.email}`">{{o.email}}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Cities',
  computed: {
    getOffices() {
      return this.$store.getters.getOffices(this.$route.params.title)
    }
  },
  methods: {
    showOffice(id, e) {
      let cities = document.querySelectorAll('.city__title')
      cities.forEach(c => c.classList.toggle('active')) 
      let office = document.querySelectorAll('.office')
      office.forEach(o => o.classList.toggle('active'))
    }
  }
}
</script>
<style lang="less" scoped>
.cities-wrap {
  margin-top: 20px;
}
.city {
  background: #fafafa;
  padding: 0;
  &__links {
    list-style: none;
    padding: 0 40px 0 25px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    min-height: 75px;
  }
  &__title {
    font-size: 17px;
    font-weight: bold;
    position: relative;
    transition: all .2s ease;
    cursor: pointer;
    line-height: 75px;
    display: block;
    &.active {
      color: #ff9e00;
      &::after {
        top: -2px;
        transform: rotate(-135deg);
      }
    }
    &:hover {
      color: #ff9e00;
      &::after {
        top: -2px;
        transform: rotate(-135deg);
      }
    }
    &::after {
      content: '\2519';
      display: block;
      position: absolute;
      right: 0;
      top: 2px;
      transform: rotate(45deg);
      transition: all .2s linear;
    }
  }
  &:last-of-type {
    border-bottom: 1px solid #00000020;
  }
}
.office {
  padding: 0;
  display: none;
  &.active {
    display: block;
  }
  &__links {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    margin-bottom: 20px;
    font-weight: bold;
    list-style: none;
    margin-bottom: 40px;
  }
  &__office {
    display: flex;
  }
  &__title {
    text-transform: uppercase;
    font-weight: bold;
  }
  &__name {
    font-size: 14px;
    margin: 20px 0;
  }
  &__email {
    text-decoration: none;
    font-size: 16px;
    color: #32b3e9;
  }
}
.phone {
    display: flex;
    &__links {
      text-decoration: none;
      display: block;
      margin: 0 15px 15px 0;
      color: #000;
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
</style>