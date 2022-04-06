<template>
  <main class="main home skeleton-body">
    <!-- <div class="bg-gray pb-5">
      <div class="container pb-3">
        <pv-intro-section></pv-intro-section>
        <pv-category-section></pv-category-section>
        <pv-promo-section></pv-promo-section>
      </div>
    </div> -->

    <div class="container">
      <!-- <pv-service-section></pv-service-section>
      <pv-banner-section></pv-banner-section> -->
      <pv-special-collection></pv-special-collection>
    </div>

    <!--  <pv-products-filter-one></pv-products-filter-one> -->

    <!-- <div class="bg-gray">
      <div class="container">
        <pv-category-section-two></pv-category-section-two>

        <pv-products-collection-one
          :products="products"
        ></pv-products-collection-one>

        <pv-category-section-three></pv-category-section-three>

        <pv-products-collection-two
          :products="products"
        ></pv-products-collection-two>

        <pv-banner-section-two></pv-banner-section-two>

        <pv-category-section-four
          :products="products"
          v-if="products && products.length > 0"
        ></pv-category-section-four>

        <pv-brand-section></pv-brand-section>

        <pv-products-collection-three
          :newProducts="newProducts"
          :best-products="bestProducts"
          :top-rated-products="topRatedProducts"
        ></pv-products-collection-three>

        <pv-feature-section></pv-feature-section>

        <pv-products-collection-four
          :products="products"
        ></pv-products-collection-four>
      </div>
    </div> -->
  </main>
</template>

<script>
import PvIntroSection from '~/components/partials/home/PvIntroSection.vue'
import PvCategorySection from '~/components/partials/home/PvCategorySection.vue'
import PvFeatureSection from '~/components/partials/home/PvFeatureSection.vue'
import PvPromoSection from '~/components/partials/home/PvPromoSection.vue'
import PvBrandSection from '~/components/partials/home/PvBrandSection.vue'
import PvBannerSection from '~/components/partials/home/PvBannerSection.vue'
import PvBannerSectionTwo from '~/components/partials/home/PvBannerSectionTwo.vue'
import PvServiceSection from '~/components/partials/home/PvServiceSection.vue'
import PvSpecialCollection from '~/components/partials/home/PvSpecialCollection.vue'
import PvProductsFilterOne from '~/components/partials/home/PvProductsFilterOne.vue'
import PvCategorySectionTwo from '~/components/partials/home/PvCategorySectionTwo.vue'
import PvProductsCollectionOne from '~/components/partials/home/PvProductsCollectionOne.vue'
import PvProductsCollectionTwo from '~/components/partials/home/PvProductsCollectionTwo.vue'
import PvProductsCollectionThree from '~/components/partials/home/PvProductsCollectionThree.vue'
import PvProductsCollectionFour from '~/components/partials/home/PvProductsCollectionFour.vue'
import PvCategorySectionThree from '~/components/partials/home/PvCategorySectionThree.vue'
import PvCategorySectionFour from '~/components/partials/home/PvCategorySectionFour.vue'

import { getCookie } from '~/utils'
import API, { baseUrl } from '~/api'

export default {
  components: {
    PvIntroSection,
    PvPromoSection,
    PvServiceSection,
    PvBrandSection,
    PvBannerSection,
    PvBannerSectionTwo,
    PvSpecialCollection,
    PvProductsFilterOne,
    PvProductsCollectionOne,
    PvProductsCollectionTwo,
    PvProductsCollectionThree,
    PvProductsCollectionFour,
    PvCategorySection,
    PvCategorySectionTwo,
    PvCategorySectionThree,
    PvCategorySectionFour,
    PvFeatureSection,
  },
  data: function () {
    return {
      products: [],
      // posts: [],
      featuredProducts: [],
      newProducts: [],
      bestProducts: [],
      topRatedProducts: [],
    }
  },
  computed: {
    /* lightBoxMedia: function () {
      let pictures = []
      for (let i = 0; i < this.posts.length; i++) {
        pictures.push(this.posts[i].picture[0])
      }
      return pictures.reduce((acc, cur) => {
        return [
          ...acc,
          {
            src: `${baseUrl}${cur.url}`,
            thumb: `${baseUrl}${cur.url}`,
          },
        ]
      }, [])
    }, */
  },
  async mounted() {
    const qs = require('qs')
    const query = qs.stringify(
      {
        pagination: {
          page: 1,
          pageSize: 9,
        },
        populate: '*',
      },
      {
        encodeValuesOnly: true,
      }
    )

    API.get(`${baseUrl}/api/products?${query}`)
      .then((response) => {
        this.products = response.data.data
        this.featuredProducts = response.data.data
        this.newProducts = response.data.data
        this.bestProducts = response.data.data
        this.topRatedProducts = response.data.data
      })
      .catch((error) => ({ error: JSON.stringify(error) }))

    /* TODO: corregir coockies de newsletter */
    this.timerId = setTimeout(() => {
      if (this.$route.path === '/' && getCookie('newsletter') !== 'false') {
        this.$modal.show(
          () => import('~/components/features/modal/PvNewsletterModal'),
          {},
          {
            width: '740',
            height: 'auto',
            adaptive: true,
            class: 'newsletter-modal',
          }
        )
      }
    }, 10000)
  },
  destroyed: function () {
    clearTimeout(this.timerId)
  },
  methods: {
    toggleSidebar: function () {
      let body = document.querySelector('body')
      if (body.classList.contains('sidebar-opened')) {
        body.classList.remove('sidebar-opened')
      } else {
        body.classList.add('sidebar-opened')
      }
    },
  },
}
</script>
