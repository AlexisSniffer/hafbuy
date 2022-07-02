<template>
  <pv-carousel
    class="info-boxes-slider swiper-carousel swiper-theme appear-animate"
    data-animation-name="fadeInUpShorter"
    data-animation-delay="200"
    v-animate
    :options="serviceSlider"
  >
    <div
      class="info-box info-box-icon-left swiper-slide"
      v-for="service in services"
      :key="service.id"
    >
      <i class="text-primary" :class="service.attributes.icon"></i>

      <div class="info-box-content">
        <h4>{{ service.attributes.title }}</h4>

        <p class="text-body">{{ service.attributes.description }}</p>
      </div>
    </div>
  </pv-carousel>
</template>

<script>
import PvCarousel from '~/components/features/PvCarousel'
import { serviceSlider } from '~/utils/data/carousel'
import API, { baseUrl } from '~/api'

export default {
  components: {
    PvCarousel,
  },
  async mounted() {
    const qs = require('qs')
    const query = qs.stringify(
      {},
      {
        encodeValuesOnly: true,
      }
    )

    API.get(`${baseUrl}/api/services?${query}`)
      .then((response) => {
        this.services = response.data.data
      })
      .catch((error) => ({ error: JSON.stringify(error) }))
  },
  data() {
    return {
      serviceSlider: serviceSlider,
      services: [],
    }
  },
}
</script>
