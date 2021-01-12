<template>
  <div
    class="header-v2 headroom"
    :class="{ 'headroom--unpinned': scrolled }"
    v-scroll="handleScroll"
  >
    <div class="header-v2__container">
      <header-top></header-top>
      <header-bottom></header-bottom>
      <mobile-header @open-nav="openMobileNav"></mobile-header>
    </div>
    <transition name="slide">
      <side-menu
        :isCategoriesOpen="isMobileMenu"
        @close="closeMobileMenu"
        :cartCount="cartCount"
      />
    </transition>
  </div>
</template>

<script>
import HeaderTop from '../components/Header/HeaderTop';
import HeaderBottom from '../components/Header/HeaderBottom';
import MobileHeader from '../components/Header/MobileHeader';
import SideMenu from '../components/Header/SideMenu';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  components: {
    'header-top': HeaderTop,
    'header-bottom': HeaderBottom,
    'mobile-header': MobileHeader,
    SideMenu
  },
  data() {
    return {
      isMobileMenu: false,

      limitPosition: 500,
      scrolled: false,
      lastPosition: 0
    };
  },
  computed: {
    ...mapGetters('cart', {
      cartCount: 'countProducts'
    })
  },
  methods: {
    ...mapActions('navigation_menu', {
      fetch: 'fetch'
    }),
    closeMobileMenu() {
      this.isMobileMenu = false;
      document.documentElement.style.overflowY = 'auto';
    },
    openMobileNav() {
      this.isMobileMenu = true;
      document.documentElement.style.overflowY = 'hidden';
    },
    handleScroll(e) {
      if (
        this.lastPosition < window.scrollY &&
        this.limitPosition < window.scrollY
      ) {
        this.scrolled = true;
      }

      if (this.lastPosition > window.scrollY) {
        this.scrolled = false;
      }

      this.lastPosition = window.scrollY;
    }
  },
  mounted() {
    let backdrop = document.createElement('div');
    backdrop.classList.add('header-v2__backdrop');
    document.body.appendChild(backdrop);

    document.documentElement.addEventListener('scroll', this.handleScroll);
    this.fetch('main-menu');
    this.fetch('top-menu');
  }
};
</script>

<style lang="scss" scoped></style>
