<template>
  <div class="product-default deal-product" v-if="product">
    <figure>
      <nuxt-link :to="`/product/default/${product.slug}`">
        <img
          v-for="(item, index) in product.attributes.images.data.slice(0, 2)"
          :key="`deal-product-${index}`"
          :src="`${baseUrl}${item.attributes.url}`"
          alt="large-picture"
          width="450"
          height="450"
        />
      </nuxt-link>

      <div
        class="product-countdown-container custom-product-countdown"
        v-if="product.attributes.until"
      >
        <span class="product-countdown-title">offer ends in:</span>
        <pv-count-down
          class="product-countdown countdown-compact"
          :until="product.attributes.until"
          :compact="true"
        ></pv-count-down>
      </div>
    </figure>
    <div class="product-details">
      <div class="category-list">
        <span
          v-for="(cat, index) in product.attributes.categories.data"
          :key="`product-category-${index}`"
        >
          <nuxt-link :to="{ path: '/shop', query: { category: cat.slug } }">{{
            cat.name
          }}</nuxt-link>
          <template v-if="index < product.attributes.categories.length - 1"
            >,</template
          >
        </span>
      </div>

      <h3 class="product-title">
        <nuxt-link :to="'/product/default/' + product.attributes.slug">{{
          product.attributes.name
        }}</nuxt-link>
      </h3>

      <div class="ratings-container">
        <div class="product-ratings">
          <span
            class="ratings"
            :style="{ width: product.attributes.ratings * 20 + '%' }"
          ></span>
          <span class="tooltiptext tooltip-top">{{
            product.attributes.ratings.toFixed(2)
          }}</span>
        </div>
      </div>

      <div class="price-box" v-if="product.attributes.price" key="singlePrice">
        <template v-if="!product.attributes.is_sale">
          <span class="product-price"
            >${{ product.attributes.price | priceFormat }}</span
          >
        </template>

        <template v-else>
          <span class="old-price"
            >${{ product.attributes.price | priceFormat }}</span
          >
          <span class="product-price"
            >${{ product.attributes.sale_price | priceFormat }}</span
          >
        </template>
      </div>

      <div class="price-box" v-else>
        <template v-if="minPrice !== maxPrice">
          <span class="product-price"
            >${{ minPrice | priceFormat }} &ndash; ${{
              maxPrice | priceFormat
            }}</span
          >
        </template>

        <template v-else>
          <span class="product-price">${{ minPrice | priceFormat }}</span>
        </template>
      </div>

      <div class="product-action">
        <nuxt-link
          to="/pages/wishlist"
          class="btn-icon-wish added-wishlist"
          title="Go to Wishlist"
          v-if="isWishlisted"
        >
          <i class="icon-wishlist-2"></i>
        </nuxt-link>

        <a
          href="javascript:;"
          class="btn-icon-wish"
          title="Add to Wishlist"
          @click="addWishlist($event)"
          v-if="!isWishlisted"
        >
          <i class="icon-wishlist-2"></i>
        </a>

        <nuxt-link
          :to="'/product/default/' + product.attributes.slug"
          class="btn-icon btn-add-cart"
          v-if="product.attributes.variants.length > 0"
          key="variantProduct"
        >
          <i class="fa fa-arrow-right"></i>
          <span>SELECT OPTIONS</span>
        </nuxt-link>

        <a
          href="javascript:;"
          class="btn-icon btn-add-cart product-type-simple"
          v-else
          @click="addCart"
        >
          <i class="icon-shopping-cart"></i>
          <span>ADD TO CART</span>
        </a>

        <a
          href="javascript:;"
          class="btn-quickview"
          title="Quick View"
          @click="openQuickview"
        >
          <i class="fas fa-external-link-alt"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { baseUrl } from '~/api/index'
import PvCountDown from '~/components/features/PvCountDown'

export default {
  components: {
    PvCountDown,
  },
  props: {
    product: Object,
    adClass: String,
    isActions: {
      type: Boolean,
      default: true,
    },
  },
  data: function () {
    return {
      baseUrl: baseUrl,
      minPrice: 0,
      maxPrice: 0,
      discount: 0,
    }
  },
  computed: {
    ...mapGetters('wishlist', ['wishList']),
    isWishlisted: function () {
      /* if (
        this.wishList.findIndex(
          (item) => item.name === this.product.attributes.name
        ) > -1
      )
        return true */
      return false
    },
  },
  mounted: function () {
    if (this.product.attributes.is_sale && this.product.attributes.price) {
      this.discount =
        ((this.product.attributes.price - this.product.attributes.sale_price) /
          this.product.attributes.price) *
        100
      this.discount = parseInt(this.discount)
    }

    if (this.product.attributes.variants.length > 0) {
      this.minPrice = this.product.attributes.variants[0].price
      this.product.attributes.variants.forEach((item) => {
        let itemPrice = item.is_sale ? item.sale_price : item.price
        if (this.minPrice > itemPrice) this.minPrice = itemPrice
        if (this.maxPrice < itemPrice) this.maxPrice = itemPrice
      })
    }
  },
  methods: {
    ...mapActions('wishlist', ['addToWishlist']),
    ...mapActions('cart', ['addToCart']),
    openQuickview: function () {
      this.$modal.show(
        () => import('~/components/features/product/PvQuickview'),
        { slug: this.product.attributes.slug },
        {
          width: '931',
          height: 'auto',
          adaptive: true,
          class: 'quickview-modal',
        }
      )
    },
    addWishlist: function (e) {
      /*e.currentTarget.classList.add('load-more-overlay', 'loading')

      setTimeout(() => {
        this.addToWishlist({ product: this.product })
        document.querySelector('.wishlist-popup').classList.add('active')

        setTimeout(() => {
          document.querySelector('.wishlist-popup').classList.remove('active')
        }, 1000)
      }, 1000)*/
    },
    addCart: function () {
      if (this.product.attributes.stock > 0) {
        let saledProduct = { ...this.product }
        if (this.product.attributes.is_sale) {
          saledProduct.price = this.product.attributes.sale_price
        }

        this.addToCart({ product: saledProduct })
      }
    },
  },
}
</script>
