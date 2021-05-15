<template>
  <div>
    <h2>Hello</h2>
    <Cities/>
    <Map />
  </div>
</template>

<script>
import Cities from '@/components/Cities'
import Map from '@/components/YandexMap'

export default {
  name: 'Home',
  components: {Cities, Map}
}
</script>
