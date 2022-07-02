<template>
  <div
    class="categories-section appear-animate"
    data-animation-name="fadeIn"
    data-animation-delay="100"
    v-animate
  >
    <pv-carousel
      class="categories-slider swiper-carousel swiper-theme show-nav-hover nav-outer appear-animate"
      :options="categorySlider"
      data-animation-name="fadeInUpShorter"
      data-animation-delay="200"
      data-animation-duration="1000"
      v-animate
    >
      <div
        v-for="category in categories"
        :key="category.name"
        class="product-category swiper-slide"
        data-animation-name="fadeInUpShorter"
        v-animate
      >
        <nuxt-link
          :to="{ path: '/shop', query: { category: category.attributes.slug } }"
        >
          <!--TODO: colocar imagen de no categoria -->
          <figure>
            <img
              v-lazy="
                `${baseUrl}${
                  category.attributes.thumbnail.data != null
                    ? category.attributes.thumbnail.data.attributes.url
                    : '/uploads/category_none_88b81bcff6.jpg'
                }`
              "
              alt="category"
              width="280"
              height="240"
              style="background: #f4f4f4"
            />
          </figure>
          <div class="category-content">
            <h3>{{ category.attributes.name }}</h3>
            <span v-if="category.attributes.products.data"
              ><mark class="count">{{
                category.attributes.products.data.length
              }}</mark>
              products</span
            >
          </div>
        </nuxt-link>
      </div>
    </pv-carousel>
  </div>
</template>

<script>
import PvCarousel from '~/components/features/PvCarousel'
import { categorySlider } from '~/utils/data/carousel'
import API, { baseUrl } from '~/api'

export default {
  components: {
    PvCarousel,
  },
  data() {
    return {
      baseUrl,
      categorySlider,
      categories: [],
    }
  },
  mounted() {
    const qs = require('qs')
    const query = qs.stringify(
      {
        pagination: {
          page: 1,
          pageSize: 20,
        },
        filters: {
          category: {
            id: {
              $null: true,
            },
          },
          categories: {
            id: {
              $notNull: true,
            },
          },
        },
        populate: {
          thumbnail: {
            fields: '*',
          },
          products: {
            fields: ['name'],
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    )

    API.get(`${baseUrl}/api/categories?${query}`)
      .then((response) => {
        this.categories = response.data.data
      })
      .catch((error) => ({ error: JSON.stringify(error) }))
  },
}
</script>
