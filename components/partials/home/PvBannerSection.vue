<template>
  <div
    class="banner-section appear-animate"
    data-animation-name="fadeInUpShorter"
    data-animation-delay="200"
    v-animate
  >
    <div class="row">
      <template v-for="(slider, index) in sliders">
        <div v-if="index == 0" :key="slider.id" class="col-md-4 mb-2 mb-md-0">
          <div
            class="banner banner1 d-flex align-items-center justify-content-end"
            v-lazy:background-image="
              `${baseUrl}${slider.cover.data.attributes.url}`
            "
            style="background-color: #eee; background-size: cover"
          ></div>
        </div>

        <div v-if="index == 1" :key="slider.id" class="col-md-8">
          <div
            class="banner banner2 d-flex align-items-center justify-content-end"
            v-lazy:background-image="
              `${baseUrl}${slider.cover.data.attributes.url}`
            "
            style="background-color: #eee; background-size: cover"
          ></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import PvCarousel from '~/components/features/PvCarousel'
import { introSlider } from '~/utils/data/carousel'
import API, { baseUrl } from '~/api'

export default {
  components: {
    PvCarousel,
  },
  async mounted() {
    const qs = require('qs')
    const query = qs.stringify(
      {
        populate: {
          category1Promo: {
            populate: {
              cover: {
                fields: 'url',
              },
            },
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    )

    try {
      const response = await API.get(`${baseUrl}/api/home-page?${query}`)
      this.sliders = response.data.data.attributes.category1Promo
    } catch (err) {
      console.error(err)
    }
  },
  data: function () {
    return {
      baseUrl,
      introSlider,
      sliders: [],
    }
  },
}
</script>
