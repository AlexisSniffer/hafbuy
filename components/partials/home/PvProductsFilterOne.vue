<template>
  <div
    class="category-filter-section bg-gray appear-animate"
    data-aniamtion-name="fadeInUpShorter"
    data-animation-delay="200"
    v-animate
  >
    <div class="container">
      <pv-tabs>
        <div class="row">
          <div class="col-lg-3 pr-lg-3 pr-sm-0 col-sm-6 order-1 order-sm-0">
            <div class="shop-list h-100">
              <h4>Sort By</h4>

              <ul class="nav nav-tabs flex-sm-column border-0" role="tablist">
                <li
                  v-for="category in categories"
                  :key="category.attributes.name"
                  @click="setFilterRoute"
                  class="nav-item"
                >
                  <!-- <nuxt-link to="/shop" class="nav-link">{{
                    category.attributes.name
                  }}</nuxt-link> -->
                  <button
                    class="nav-link"
                    @click="shorBy(category.attributes.slug)"
                  >
                    {{ category.attributes.name }}
                  </button>
                </li>
              </ul>

              <nuxt-link
                class="view-all"
                :to="{ path: '/shop', query: { category: 'fashion' } }"
                >View All<i class="fas fa-long-arrow-alt-right"></i
              ></nuxt-link>
            </div>
          </div>

          <div class="col-lg-3 col-sm-6 pl-lg-3 pl-sm-0 order-0">
            <div
              class="banner banner3"
              style="background-color: #efeeec"
              v-lazy:background-image="'./images/home/banners/banner3.jpg'"
            >
              <div class="container d-flex justify-content-center">
                <div class="banner-layer text-center">
                  <h4 class="font1">
                    <i class="font2">Find the Boundaries. Push Through!</i>
                  </h4>

                  <h3 class="text-dark mb-0">MEGA SALE</h3>
                  <h2 class="text-dark">70% OFF</h2>
                  <h5 class="coupon-sale-text justify-content-end">
                    <span class="text-dark">STARTING AT</span>
                    <b class="text-white align-middle"
                      ><sup>$</sup><em class="align-text-top">199</em
                      ><sup>99</sup></b
                    >
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6 tab-content mt-2 mt-lg-0 order-2 order-sm-0">
            <div class="product-content products-with-divide">
              <div class="row row-joined h-100" v-if="products.length === 0">
                <div
                  class="col-6 col-sm-4 mb-2"
                  v-for="item in [1, 2, 3, 4, 5, 6]"
                  :key="'product' + item"
                >
                  <div class="swiper-slide product-loading-overlay"></div>
                </div>
              </div>

              <div class="row row-joined h-100">
                <div
                  class="col-6 col-sm-4 appear-animate"
                  v-for="(product, index) in products"
                  :key="'product-' + index"
                  data-animation-name="fadeIn"
                  data-animation-duration="1000"
                  :data-animation-delay="200"
                  v-animate
                >
                  <pv-product-three :product="product"></pv-product-three>
                </div>
              </div>
            </div>
          </div>
        </div>
      </pv-tabs>
    </div>
  </div>
</template>

<script>
import PvProductThree from '~/components/features/product/PvProductThree'
import PvTabs from '~/components/features/PvTabs'
import API, { baseUrl, currentDemo } from '~/api'
import { filter } from '~/utils/filters'

export default {
  components: {
    PvTabs,
    PvProductThree,
  },
  data: function () {
    return {
      products: [],
      categories: [],
    }
  },
  mounted: function () {
    this.setFilterRoute()
    this.shorBy()
  },
  methods: {
    shorBy(slug) {
      let filterCategories = filter(
        {
          pagination: {
            page: 1,
            pageSize: 12,
          },
          populate: ['products'],
          filters: {
            parentName: {
              $notNull: true,
            },
            products: {
              name: {
                $notNull: true,
              },
            },
          },
        },
        {
          encodeValuesOnly: true,
        }
      )

      API.get(`${baseUrl}/api/categories?${filterCategories}`)
        .then((response) => {
          this.categories = response.data.data

          let filterProduct2 = filter(
            {
              pagination: {
                page: 1,
                pageSize: 6,
              },
              filters: {
                categories: {
                  slug:
                    slug == null ? this.categories[0].attributes.slug : slug, //'tv-receivers-1',
                },
              },
              populate: '*',
            },
            {
              encodeValuesOnly: true,
            }
          )

          console.log(`${baseUrl}/api/products?${filterProduct2}`)

          API.get(`${baseUrl}/api/products?${filterProduct2}`)
            .then((response) => {
              console.log(response.data.data)
              this.products = response.data.data
            })
            .catch((error) => ({ error: JSON.stringify(error) }))
        })
        .catch((error) => ({ error: JSON.stringify(error) }))
    },
    setFilterRoute: function (e) {
      /*this.products = []
      if (e) {
        this.category = e.currentTarget.getAttribute('data-category')

        e.currentTarget.parentNode
          .querySelector('.active')
          .classList.remove('active')
        e.currentTarget.querySelector('a').classList.add('active')
      }

      Api.get(`${baseUrl}/shop`, {
        params: { category: this.category, demo: currentDemo },
      })
        .then((response) => {
          this.products = response.data.products
        })
        .catch((error) => ({ error: JSON.stringify(error) }))*/
    },
  },
}
</script>
