<template>
  <div class="cities-wrap">
    <div class="city" v-for="office of getOffices" :key="office.id">
      <span class="city__title">{{ office.name }}</span>
      <div class="office" v-for="o of office.offices" :key="o.id">
        <p>Офис&nbsp;<span class="office__title">{{o.title }}</span></p>
        <span class="office__name">{{o.name }}</span>
        <div class="phone">
          <a class="phone__links" :href="`tel:${o.phone1}`">{{ o.phone1 }}</a>
          <a class="phone__links" :href="`tel:${o.phone1}`">{{ o.phone2 }}</a>
        </div>
        <a class="office__email" :href="`mailto:${o.email}`">{{o.email}}</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
  name: 'Cities',
  computed: {
    getOffices() {
      return this.$store.getters.getOffices(this.$route.params.title)
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
  padding: 30px 40px 40px 25px;
  border-top: 1px solid #00000020;
  &__title {
    font-size: 17px;
    font-weight: bold;
    position: relative;
    cursor: pointer;
    transition: all .2s ease;
    &:hover {
      color: #ff9e00;
    }
    &::after {
      content: '\2519';
      display: block;
      position: absolute;
      right: 0;
      top: -5px;
      transform: rotate(-135deg);
    }
  }
  &:last-of-type {
    border-bottom: 1px solid #00000020;
  }
  span {
    display: block;
  }
  p {
    display: flex;
    margin-bottom: 20px;
    font-weight: bold;
  }
}
.office {
  margin-top: 30px;
  &__title {
    text-transform: uppercase;
    font-weight: bold;
  }
  &__name {
    font-size: 14px;
    margin-bottom: 20px;
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