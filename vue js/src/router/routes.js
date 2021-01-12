const Home = () => import('../views/Home.vue');

const ProductAddV2 = () => import('../views/Profile/ProductAddV2.vue');

const Wishlist = () => import('../views/Wishlist.vue');

const Article = () => import('../views/Article.vue');

const NotFound = () => import('../views/NotFound.vue');

export default [
  {
    path: '/:lang(ar|ku)?/',
    name: 'home',
    component: Home,
  },

  {
    path: '/:lang(ar|ku)?/product/:id',
    name: 'product',
    component: Product,
  },
  {
    path: '/:lang(ar|ku)?/search',
    name: 'search',
    component: Search,
  },
  {
    path: '/:lang(ar|ku)?/seller/:uuid',
    name: 'seller-page',
    component: Seller,
    props: true,
  },
  {
    path: '/:lang(ar|ku)?/category/:parent',
    name: 'category',
    component: Category,
  },
  {
    path: '/:lang(ar|ku)?/collection/:parent',
    name: 'collection',
    component: Category,
    props: {
      isCollection: true,
    },
  },

  {
    path: '/:lang(ar|ku)?/login/SignIn',
    name: 'SignIn',
    component: SignIn,
    meta: {
      disableHeader: true,
      disableFooter: true,
    },
  },
  {
    path: '/:lang(ar|ku)?/login/SignUp',
    name: 'SignUp',
    component: SignUp,
    meta: {
      disableHeader: true,
      disableFooter: true,
    },
  },
  {
    path: '/:lang(ar|ku)?/password/reset/:token',
    name: 'PasswordReset',
    component: ResetPassword,
    props: true,
    meta: {
      disableHeader: true,
      disableFooter: true,
    },
  },
  {
    path: '/:lang(ar|ku)?/login/Reset',
    name: 'SignInReset',
    component: SignInRest,
    meta: {
      disableHeader: true,
      disableFooter: true,
    },
  },
  {
    path: '/:lang(ar|ku)?/cart',
    name: 'cart',
    component: Cart,
  },
  {
    path: '/:lang(ar|ku)?/profile/',
    name: 'profile',
    component: Profile,
    meta: { auth: true },
    children: [
      {
        path: 'orders',
        name: 'orders',
        component: ProfileOrders,
        props: { isPlaceholder: false },
      },
      {
        path: 'order-edit/:uuid',
        name: 'order-edit',
        component: OrderEdit,
        props: true,
      },
      {
        path: 'seller-orders',
        name: 'seller-orders',
        component: SellerOrders,
      },
      {
        path: 'orders/progress/:uuid',
        name: 'order-progress',
        component: OrderProgress,
        props: true,
      },

      {
        path: 'addresses',
        name: 'addresses',
        component: ProfileAddresses,
        props: { isPlaceholder: false },
        children: [
          {
            path: 'edit/:uuid?',
            name: 'addresses.edit',
            component: AddressEdit,
          },
        ],
      },

      { path: 'info', name: 'info', component: ProfileInfo },

      { path: 'info', name: 'info', component: ProfileInfo },

      {
        path: 'orders/detail/:uuid',
        name: 'order-detail',
        component: OrderDetail,
        props: true,
      },
      {
        path: 'addresses/map',
        name: 'map-add',
        component: AddressMap,
      },
      {
        path: 'addresses/map/:uuid',
        name: 'map-edit',
        component: AddressMap,
      },
      {
        path: 'product-list',
        name: 'seller-products',
        component: SellerProducts,
      },
      {
        path: 'product-add/:uuid?',
        name: 'product-add',
        component: ProductAddV2,
        props: true,
      },
      {
        path: 'wishlist',
        name: 'wishlist',
        component: Wishlist,
      },
    ],
  },

  {
    path: '/:lang(ar|ku)?/article/:slug',
    name: 'article',
    component: Article,
  },
  {
    path: '404',
    name: '404',
    component: NotFound,
  },
];
