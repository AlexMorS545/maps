<template>
  <div class="container">
    <Cities/>
    <Map />
  </div>
</template>

<script>
import Cities from '@/components/Cities'
import Map from '@/components/YandexMap'
        
export default {
  name: 'Russia',
  components: {Cities, Map},
}
</script>
<style lang="less" scoped>
.container {
  display: flex;
  justify-content: flex-end;
}
</style>