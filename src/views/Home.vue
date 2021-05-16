<template>
  <div class="container">
    <Cities/>
    <Map />
  </div>
</template>

<script>
import Cities from '@/components/Cities'
import Map from '@/components/YandexMap'
        
import data from '../json/data.json'

export default {
  name: 'Home',
  components: {Cities, Map},
  computed: console.log(data)
}
</script>
<style lang="less" scoped>
.container {
  display: flex;
  justify-content: flex-end;
}
</style>