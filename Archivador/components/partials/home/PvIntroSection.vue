<template>
  <div>
    <pv-carousel
      class="home-slider slide-animate swiper-carousel swiper-theme nav-circle mb-2"
      :options="introSlider"
      data-animation-name="fadeIn"
      data-animation-delay="100"
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
    </pv-carousel>
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
          mainSlider: {
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

    console.log(`${baseUrl}/api/home-page?${query}`)

    API.get(`${baseUrl}/api/home-page?${query}`)
      .then((response) => {
        this.sliders = response.data.data.attributes.mainSlider
      })
      .catch((error) => ({ error: JSON.stringify(error) }))
  },
  data: function () {
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
      sliders: [slider, slider],
    }
  },
}
</script>
