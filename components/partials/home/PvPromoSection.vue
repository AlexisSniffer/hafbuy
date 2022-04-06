<template>
  <div
    class="promo-section bg-white appear-animate"
    data-animation-name="fadeIn"
    data-animation-delay="100"
    v-animate
  >
    <div class="swiper-slide" v-for="(slider, index) in sliders" :key="index">
      <a :href="slider.link" target="_blank">
        <img
          class="slide-bg"
          v-lazy="`${baseUrl}${slider.cover.data.attributes.url}`"
          alt="slider image"
          width="1420"
          height="350"
          image-ratio="24.64"
        />
      </a>
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
  mounted() {
    const qs = require('qs')
    const query = qs.stringify(
      {
        populate: {
          mainPromo: {
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

    API.get(`${baseUrl}/api/home-page?${query}`)
      .then((response) => {
        this.sliders = response.data.data.attributes.mainPromo
      })
      .catch((error) => ({ error: JSON.stringify(error) }))
  },
  data() {
    let slider = {
      id: 0,
      __component: '',
      link: '',
      cover: {
        data: {
          id: 0,
          attributes: {
            url: '',
          },
        },
      },
    }

    return {
      baseUrl,
      introSlider,
      sliders: [slider],
    }
  },
}
</script>
