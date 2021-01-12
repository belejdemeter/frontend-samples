import _ from 'lodash';

const nav = [
  {
    path: 'orders',
    icon: 'orders',
    title: 'marketplace.nav_link_orders',
    placeholder: 'Orders',
  },

  {
    path: 'addresses',
    icon: 'address',
    title: 'marketplace.nav_link_addresses',
    placeholder: 'Addresses',
  },

  {
    path: 'wishlist',
    icon: 'wishlist',
    title: 'marketplace.nav_link_wish',
    placeholder: 'Wishlist',
  },
  { divider: true },

  {
    path: 'seller-orders',
    icon: 'orders',
    title: 'marketplace.profile_page_tab_seller_orders',
    placeholder: 'Seller Orders',
  },

  { divider: true },

  {
    path: 'info',
    icon: 'account',
    title: 'marketplace.nav_link_profile',
    placeholder: 'Profile',
  },
];

const state = () => ({
  nav: nav,
});

export default {
  namespaced: true,
  state: state,
};
