<template>
  <div id="app">
    <header-v2 v-if="!this.$route.meta.disableHeader"></header-v2>
    <div :class="!this.$route.meta.disableHeader ? 'content-container' : ''">
      <transition name="fade" mode="out-in">
        <router-view :key="$route.fullPath" />
      </transition>
    </div>

    <Footer v-if="!this.$route.meta.disableFooter" />
  </div>
</template>
<script>
import SupportForm from '@/components/Home/Support-Form.vue';
import HeaderV2 from '@/components/HeaderV2.vue';

import Footer from '@/components/Footer.vue';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  metaInfo() {
    return {
      titleTemplate: (titleChunk) => {
        return titleChunk
          ? `${titleChunk} – ${this.trans('marketplace.app_name', null, 'PWA')}`
          : `${this.trans('marketplace.app_name', null, 'PWA')}`;
      },
      link: this.links,
      meta: [
        { property: 'og:site_name', content: 'PWA' },
        { property: 'og:type', content: 'website' },
        { name: 'robots', content: 'index,follow' },
      ],
    };
  },
  data() {
    return {
      isSupportForm: false,
    };
  },
  components: {
    Footer,
    SupportForm,
    Popup,
    'header-v2': HeaderV2,
  },
  methods: {
    showSupport() {
      this.isSupportForm = true;
    },

    ...mapActions('cart', {
      fetchCart: 'fetch',
    }),

    ...mapActions('wishlist', {
      fetchWishlist: 'fetch',
    }),
    ...mapActions('locale', {
      setLocale: 'setLocale',
    }),
    ...mapActions('auth', {
      iam: 'iam',
    }),
  },
  computed: {
    ...mapState('auth', {
      user: 'user',
    }),
    ...mapGetters('locale', {
      locales: 'getLocales',
      currentLocale: 'getLocale',
    }),
  },
  created() {
    this.fetchCart();
    this.fetchWishlist();
    if (this.user) {
      this.iam();
    }
  },
};
</script>
